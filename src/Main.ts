import * as Plugin from "iitcpluginkit";
import * as S2 from "./lib/S2";
import { FieldLogger } from "./FieldLogger";
import { Mindunits, Result as MUResult } from "./Mindunits";
import { DebugDialog } from "./ui/DebugDialog";
import myicon from "./ui/images/icon.svg";
import { loadFile } from "./lib/FileLoader";


const TOOLTIP_DELAY = 100;

// Level 17 => 70x70m - 4900m²
// Level 19 => 20x20m - 300m²
const S2MUDetailLevel = 19; // cell level used to check what is indide/outside of a field
const S2MULevel = 11; // cell level used to store values

interface JSONExport {
    time: number;
    latlngs: { lat: number, lng: number }[];
    mindunits: number;
};


class LogFields implements Plugin.Class {

    public fieldLog: FieldLogger;
    public muDB: Mindunits;

    private layer: L.LayerGroup<any>;
    private mustrings = new Map<string, L.Marker>();
    private s2Cells: L.LayerGroup<any> | undefined;

    private trackingActive: boolean;
    private mouseDelayTimer: number | undefined;
    private tooltip: JQuery | undefined;

    private isTraining: boolean;
    private showFieldCells: boolean = true;


    init() {

        // eslint-disable-next-line @typescript-eslint/no-require-imports, unicorn/prefer-module
        require("./ui/styles.pcss");

        this.fieldLog = new FieldLogger();
        this.fieldLog.init();
        this.fieldLog.onNewField = (iitcField, mindunits) => this.showFieldMus(iitcField, mindunits);


        window.addHook("fieldAdded", this.onFieldAdd);
        window.addHook("fieldRemoved", this.onFieldRemoved);

        this.layer = new L.LayerGroup();
        window.addLayerGroup("Field MUs", this.layer, false);

        this.muDB = new Mindunits(S2MULevel, S2MUDetailLevel);

        $("#toolbox").append($("<a>", {
            text: "Mindunits", click: () => {
                void this.train();
                new DebugDialog().show()
            }
        }));

        const toolbarGroup = $("<div>", { class: "leaflet-bar leaflet-control plugin-logfields-icon", id: "logfieldbutton" })
            .append(
                $("<a>", { class: "leaflet-bar-part" })
                    .css("background-image", myicon)
                    .on("click", (event) => this.toggleTracking(event))
            );

        const parent = $(".leaflet-top.leaflet-left", window.map.getContainer()).first();
        parent.append(toolbarGroup);
    }

    async getStatLogFieldCount(): Promise<number> {
        return await this.fieldLog.getFieldCount();
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


    checkForTooltip(event: L.LeafletMouseEvent): void {
        const point = event.layerPoint;
        const fields = [];
        const drawTools: L.Polygon[] = [];

        for (const guid in window.fields) {
            const field = window.fields[guid];

            const positions: L.Point[][] = (<any>field)._rings;

            if (positions && this.pnpoly(positions[0], point)) {
                fields.push(field);
            }
        }

        const dt = window.plugin.drawTools?.drawnItems;
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
            void this.createTooltip(event.latlng, fields, drawTools);
        } else {
            this.hideTooltip();
        }
    }

    pnpoly(polygon: L.Point[], point: L.Point) {
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            if ((polygon[i].y > point.y) !== (polygon[j].y > point.y) &&
                point.x < (polygon[j].x - polygon[i].x) * (point.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x) {
                inside = !inside;
            }
        }
        return !!inside;
    }


    // TODO: change to UPDATE Tooltip
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
            const separator = total > 0 ? "" : "<hr>";
            text.push(`${separator}DrawTools = ${window.digits(dttotal)} Mu`);
        }
        if (total > 0 && dttotal > 0) {
            text.push(`Total ${window.digits(total + dttotal)} Mu`);
        }

        if (text.length > 15) {
            text.splice(5, text.length - 15, "...")
        }

        this.showTooltip(pos, text.join("<br>"));
        if (this.showFieldCells) {
            this.showS2Cells(fields.at(-1)!);
        }
    }

    private async getFieldMUText(field: IITC.Field): Promise<{ text: string, mindunits: number }> {


        const calcMU = await this.muDB.calcMU(field.getLatLngs());
        const calcMUStr = this.resultToString(calcMU);

        const mindunits = await this.fieldLog.getFieldMUS(field);

        // eslint-disable-next-line unicorn/prefer-ternary
        if (mindunits) {
            return {
                // known field
                text: `${window.digits(mindunits)} Mus (${calcMUStr})`,
                mindunits: mindunits
            }
        } else {
            return {
                // only calculated
                text: calcMUStr,
                mindunits: calcMU.mindunits
            }
        }

    }

    private async getDTPolygonText(polygon: L.Polygon): Promise<{ text: string, mindunits: number }> {

        // TODO: add S2 Polygon Region

        const total: MUResult = {
            mindunits: 0,
            cells: 0,
            missing: 0,
            approx: 0,
        };

        const ll = polygon.getLatLngs();
        for (let i = 2; i < ll.length; i++) {
            const latLngs = [ll[0], ll[i - 1], ll[i]];

            const calcMU = await this.muDB.calcMU(latLngs);
            total.mindunits += calcMU.mindunits;
            total.cells += calcMU.cells;
            total.missing += calcMU.missing;
            total.approx += calcMU.approx;
        }

        return {
            text: this.resultToString(total),
            mindunits: total.mindunits
        }
    }

    private resultToString(result: MUResult): string {
        const mu = window.digits(result.mindunits);

        const error = (result.missing + result.approx) / result.cells;
        const errorStr = ((1 - error) * 100).toFixed(0);

        // some cell data was missing but we were able to use approx by neighbour cells       
        if (result.missing === 0 && result.approx > 0) return `~ ~${mu} Mu`;
        // some cell data was missing
        if (result.missing > 0 && result.approx === 0) return `~ >${mu} Mu`;
        // there was no data. result is just a guess
        if (result.missing + result.approx === result.cells) return `~ ? (${mu} Mu)`;
        // there was some data. but some data were missing
        if (result.missing !== 0 && result.approx !== 0) return `~ ?${mu} Mu (e=${errorStr}%)`;

        return `~${mu} Mu`;
    }


    private triangleArea(p: L.LatLng[]): number {
        return Math.abs(0.5 * (
            (p[1].lat - p[0].lat) * (p[2].lng - p[0].lng)
            - (p[2].lat - p[0].lat) * (p[1].lng - p[0].lng)));
    }


    showS2Cells(field: IITC.Field): void {
        this.clearS2Cells();

        const ll = field.getLatLngs();

        const cover = new S2.RegionCover();
        const region = new S2.Triangle(S2.LatLngToXYZ(ll[0]), S2.LatLngToXYZ(ll[1]), S2.LatLngToXYZ(ll[2]));
        const cells = cover.getCovering(region, S2MULevel, S2MUDetailLevel);

        if (cells.length === 0) {
            console.error("no S2 Cells for field?!?")
            return;
        }

        const theCells = cells.map(s2 => {
            const corners = s2.getCornerXYZ();
            const cornersLL = corners.map(c => S2.XYZToLatLng(c));
            cornersLL.push(cornersLL[0]);

            return new L.GeodesicPolyline(cornersLL, { color: "#CCCC00" });
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


    async train(): Promise<void> {
        if (this.isTraining) return;
        this.isTraining = true;
        await this.muDB.train(this.fieldLog);
        this.isTraining = false;
    }

    toggleTracking(event: JQuery.ClickEvent): void {
        event.preventDefault();

        if (this.trackingActive) this.disableTracking();
        else this.enableTracking();
    }

    disableTracking() {
        this.trackingActive = false;
        this.hideTooltip();
        window.clearTimeout(this.mouseDelayTimer);
        window.map.off("mousemove", this.onMouseMove)
        $("#logfieldbutton").removeClass("active");

        this.muDB.cleanUp();
    }

    enableTracking() {
        void this.train();

        this.trackingActive = true;
        window.map.on("mousemove", this.onMouseMove);
        $("#logfieldbutton").addClass("active");
    }

    onMouseMove = (event: L.LeafletMouseEvent) => {
        window.clearTimeout(this.mouseDelayTimer);
        this.mouseDelayTimer = window.setTimeout(() => this.checkForTooltip(event), TOOLTIP_DELAY);

        this.hideTooltip();
    }

    showTooltip(latlng: L.LatLng, text: string): void {
        if (!this.tooltip) {
            this.tooltip = $("<div>", { class: "logfield-tooltip" });
            const pane = window.map.getPanes().popupPane;
            this.tooltip.appendTo(pane);
        }

        this.tooltip.html(text);

        const point = window.map.latLngToLayerPoint(latlng);
        // this.tooltip.css( { left: point.x+12, top: point.y } )
        // this.tooltip.offset({left: point.x+12, top: point.y});
        L.DomUtil.setPosition(this.tooltip[0], point.add(L.point(12, 0)));
    }

    hideTooltip(): void {
        if (this.tooltip) {
            this.tooltip.remove();
            this.tooltip = undefined;
            this.clearS2Cells();
        }
    }

    async exportFields() {
        const data: any[] = [];

        await this.fieldLog.forEach((latlngs, mindunits, time) => {
            data.push(<JSONExport>{ latlngs, mindunits, time });
        })

        this.saveJson("fields.json", data);
    }


    async importFields() {
        const dataStr = await loadFile({ accept: ".json" });

        let data;
        try {
            data = JSON.parse(dataStr);
        } catch {
            alert("not a valid json file");
            return;
        }

        if (!Array.isArray(data)) {
            alert("not a valid field export");
            return;
        }

        (data as JSONExport[]).forEach(d => {
            if (d.mindunits > 0 && d.latlngs.length === 3 && d.time > 0) {
                const position = d.latlngs.map<[number, number]>(l => [l.lat * 1e6, l.lng * 1e6]);
                void this.fieldLog.storeField(d.time, position, d.mindunits);
            } else {
                console.error("wrong data in json (expcet latlng, mindunits, time) ->", d);
            }

        });
    }


    private saveJson(filename: string, json_object: object) {
        const content = JSON.stringify(json_object);
        if (typeof android !== "undefined" && android && (android as any).saveFile) {
            android.saveFile(filename, "application/json", content);
        } else {
            const blob = new Blob([content], { type: "application/json" });
            saveAs(blob, filename);
        }

    }

}


export const main = new LogFields();
Plugin.Register(main, "LogFields");
