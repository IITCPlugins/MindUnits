import * as Plugin from "iitcpluginkit";
import * as S2 from "./lib/s2";
import { FieldLogger } from "./fieldLogger";
import { MindunitsDB, S2MUDetailLevel, S2MULevel } from "./mindunitsDB";
import myicon from "./ui/images/icon.svg";


const TOOLTIP_DELAY = 100;


class LogFields implements Plugin.Class {

    private fieldLog: FieldLogger;
    private muDB: MindunitsDB;

    private layer: L.LayerGroup<any>;
    private mustrings: Map<string, L.Marker> = new Map();
    private s2Cells: L.LayerGroup<any> | undefined;

    private trackingActive: boolean;
    private mouseDelayTimer: number | undefined;
    private tooltip: JQuery | undefined;


    async init() {

        require("./ui/styles.pcss");

        this.fieldLog = new FieldLogger();
        this.fieldLog.init();
        this.fieldLog.onNewField = (iitcField, mindunits) => this.showFieldMus(iitcField, mindunits);


        window.addHook("fieldAdded", this.onFieldAdd);
        window.addHook("fieldRemoved", this.onFieldRemoved);

        this.layer = new L.LayerGroup();
        window.addLayerGroup("MUs", this.layer, true);

        this.muDB = new MindunitsDB();
        this.muDB.train(this.fieldLog);


        const toolbarGroup = $("<div>", { class: "leaflet-bar leaflet-control plugin-logfields-icon", id: "logfieldbutton"})
            .append(
                $("<a>", { class: "leaflet-bar-part" })
                    .css("background-image", myicon)
                    .on("click", (() => this.toggleTracking())
                ));

        const parent = $(".leaflet-top.leaflet-left", window.map.getContainer()).first();
        parent.append(toolbarGroup);
    }



    onFieldAdd = async (fieldEvent: EventFieldAdded): Promise<void> => {
        const mindunits = await this.fieldLog.getFieldMUS(fieldEvent.field);
        if (mindunits) {
            this.showFieldMus(fieldEvent.field, mindunits);
        }
    }

    onFieldRemoved = (fieldEvent: EventFieldRemoved): void => {
        const guid = fieldEvent.field.options.guid;

        const text = this.mustrings.get(guid);
        if (text) {
            this.layer.removeLayer(text);
            this.mustrings.delete(guid);
        }
    }


    showFieldMus(field: IITC.Field, mindunits: number): void {
        const guid = field.options.guid;
        const text = this.mustrings.get(guid);
        if (text) return;


        const marker = L.marker(this.fieldCenter(field), {
            icon: L.divIcon({
                className: "plugin-logfields-numbers",
                iconSize: [48, 12],
                html: mindunits.toString()
            }),
            interactive: false
        });

        this.mustrings.set(guid, marker);
        this.layer.addLayer(marker);
    }

    private fieldCenter(field: IITC.Field): L.LatLng {
        const p = field.options.data.points;
        return L.latLng(
            (p[0].latE6 + p[1].latE6 + p[2].latE6) / 3 * 1e-6,
            (p[0].lngE6 + p[1].lngE6 + p[2].lngE6) / 3 * 1e-6,
        )
    }


    checkForTooltip(ev: L.LeafletMouseEvent): void {
        const point = ev.layerPoint;
        const fields = [];
        const drawTools: L.Polygon[] = [];

        for (var guid in window.fields) {
            const field = window.fields[guid];

            const positions: L.Point[][] = (<any>field)._rings;

            if (positions && this.pnpoly(positions[0], point)) {
                fields.push(field);
            }
        }

        const dt = window.plugin.drawTools && window.plugin.drawTools.drawnItems;
        if (dt) {
            dt.eachLayer((layer: L.ILayer) => {
                if (layer instanceof L.GeodesicPolygon || layer instanceof L.Polygon) {
                    const positions: L.Point[][] = (<any>layer)._rings;

                    if (positions && this.pnpoly(positions[0], point)) {
                        drawTools.push(layer);
                    }

                }
            })
        }

        if (fields.length > 0 || drawTools.length > 0) {
            this.createTooltip(ev.latlng, fields, drawTools);
        } else {
            this.hideTooltip();
        }
    }

    pnpoly(polygon: L.Point[], point: L.Point) {
        var inside = 0;
        for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            // @ts-ignore
            inside ^= polygon[i].y > point.y !== polygon[j].y > point.y &&
                point.x - polygon[i].x < (polygon[j].x - polygon[i].x) * (point.y - polygon[i].y) / (polygon[j].y - polygon[i].y);
        }
        return !!inside;
    }


    async createTooltip(pos: L.LatLng, fields: IITC.Field[], drawTools: L.Polygon[]): Promise<void> {

        // real Fields
        fields = fields.sort((a, b) => this.triangleArea(b.getLatLngs()) - this.triangleArea(a.getLatLngs()));
        let total = 0;
        let text: string[] = await Promise.all(fields.map(async f => {
            const { text, mindunits } = await this.getFieldMUText(f);
            total += mindunits;
            return text;
        }))

        // drawtools
        let dttotal = 0;
        const text2: string[] = await Promise.all(drawTools.map(async p => {
            const { text, mindunits } = await this.getDTPolygonText(p);
            dttotal += mindunits;
            return text;
        }))

        if (text2.length > 0) {
            text = [...text, "DrawTools:", ...text2]
        }

        // Summary
        if (total > 0) {
            text.push(`<hr>${fields.length} Fields = ${window.digits(total)} Mu`);
        }
        if (dttotal > 0) {
            const sep = total > 0 ? "" : "<hr>";
            text.push(`${sep}DrawTools = ${window.digits(dttotal)} Mu`);
        }
        if (total > 0 && dttotal > 0) {
            text.push(`Total ${window.digits(total+dttotal)} Mu`);
        }

        this.showTooltip(pos, text.join("<br>"));
    }


    private async getFieldMUText(field: IITC.Field): Promise<{ text: string, mindunits: number }> {


        const calcMU = this.muDB.calcMU(field.getLatLngs());
        const calcMUStr = (calcMU.missing ? " >" : "") + window.digits(calcMU.mindunits);

        const mindunits = await this.fieldLog.getFieldMUS(field);
        if (mindunits) {
            return {
                // known field
                text: `${window.digits(mindunits)} Mus (~${calcMUStr})`,
                mindunits: mindunits
            }
        } else {
            return {
                // only calculated
                text: `~${calcMUStr} Mus`,
                mindunits: calcMU.mindunits
            }
        }

    }

    private async getDTPolygonText(polygon: L.Polygon): Promise<{ text: string, mindunits: number }> {

        // TODO: add S2 Polygon Region

        let total = 0;
        let missing = false;

        const ll = polygon.getLatLngs();
        for (let i = 2; i < ll.length; i++) {
            const latLngs = [ll[0], ll[i - 1], ll[i]];

            const calcMU = this.muDB.calcMU(latLngs);
            total += calcMU.mindunits;
            missing ||= calcMU.missing;
        }

        const calcMUStr = (missing ? " >" : "") + window.digits(total);

        return {
            // only calculated
            text: `~${calcMUStr} Mus`,
            mindunits: total
        }

    }


    private triangleArea(p: L.LatLng[]): number {
        return Math.abs(0.5 * (
            (p[1].lat - p[0].lat) * (p[2].lng - p[0].lng)
            - (p[2].lat - p[0].lat) * (p[1].lng - p[0].lng)));
    }


    showS2Cells(field: IITC.Field): void {
        this.clearS2Cells();

        const ll = field.getLatLngs();

        const cover = new S2.S2RegionCover();
        const region = new S2.S2Triangle(S2.LatLngToXYZ(ll[0]), S2.LatLngToXYZ(ll[1]), S2.LatLngToXYZ(ll[2]));
        const cells = cover.getCovering(region, S2MULevel, S2MUDetailLevel);

        if (cells.length === 0) {
            console.error("no S2 Cells for field?!?")
            return;
        }

        const theCells = cells.map(s2 => {
            const corners = s2.getCornerXYZ();
            const cornersLL = corners.map(c => S2.XYZToLatLng(c));
            cornersLL.push(cornersLL[0]);

            return new L.GeodesicPolyline(cornersLL, {});
        })

        this.s2Cells = new L.LayerGroup(theCells);
        window.map.addLayer(this.s2Cells);
    }

    clearS2Cells(): void {
        if (this.s2Cells) {
            window.map.removeLayer(this.s2Cells);
            this.s2Cells = undefined;
        }
    }


    showMUDBCells(): void {
        const base = new L.LayerGroup();
        this.muDB.forEach((cell, mindunits) => {
            const corners = cell.getCornerXYZ();
            const cornersLL = corners.map(c => S2.XYZToLatLng(c));
            cornersLL.push(cornersLL[0]);

            base.addLayer(new L.GeodesicPolyline(cornersLL, { color: "#CCCC00" }));

            const center = L.latLng((cornersLL[0].lat + cornersLL[2].lat) / 2, (cornersLL[0].lng + cornersLL[2].lng) / 2);
            const marker = L.marker(center, {
                icon: L.divIcon({
                    iconSize: [48, 12],
                    html: Math.ceil(mindunits).toString()
                }),
                interactive: false
            });
            base.addLayer(marker);

        })

        window.map.addLayer(base);
    }
}





    toggleTracking(): void {
        if (this.trackingActive) this.disableTracking();
        else this.enableTracking();
    }

    disableTracking() {
        this.trackingActive = false;
        this.hideTooltip();
        window.map.off("mousemove", this.onMouseMove)
        $("#logfieldbutton").removeClass("active");
    }

    enableTracking() {
        this.trackingActive = true;
        window.map.on("mousemove", this.onMouseMove);
        $("#logfieldbutton").addClass("active");
    }

    onMouseMove = (ev: L.LeafletMouseEvent) => {
        window.clearTimeout(this.mouseDelayTimer);
        this.mouseDelayTimer = window.setTimeout(() => this.checkForTooltip(ev), TOOLTIP_DELAY);

        this.hideTooltip();
    }

    showTooltip(latlng: L.LatLng, text: string): void {
        if (!this.tooltip) {
            this.tooltip = $("<div>", {class: "logfield-tooltip"});
            const pane = window.map.getPanes()["popupPane"]; // FIXME <- does this work in leaflet 0.77???
            this.tooltip.appendTo(pane);
        }

        this.tooltip.html(text);

        const point = window.map.latLngToLayerPoint(latlng);
        // this.tooltip.css( { left: point.x+12, top: point.y } )
        // this.tooltip.offset({left: point.x+12, top: point.y});
        L.DomUtil.setPosition(this.tooltip[0], point.add(L.point(12,0)));
    }

    hideTooltip(): void {
        if (this.tooltip) {
            this.tooltip.remove();
            this.tooltip = undefined;
            this.clearS2Cells();
        }
    }





Plugin.Register(new LogFields(), "LogFields");
