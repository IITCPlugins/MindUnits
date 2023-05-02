import * as Plugin from "iitcpluginkit";
import { LatLngToXYZ, S2RegionCover, S2Triangle, XYZToLatLng } from "./s2";
import { FieldLogger } from "./fieldLogger";
import { MindunitsDB, S2MUDetailLevel, S2MULevel } from "./mindunitsDB";

const TOOLTIP_DELAY = 1000;


class LogFields implements Plugin.Class {

    private fieldLog: FieldLogger;
    private muDB: MindunitsDB;

    private layer: L.LayerGroup<any>;
    private mustrings: Map<string, L.Marker> = new Map();
    private s2Cells: L.LayerGroup<any> | undefined;

    private mouseDelayTimer: number | undefined;
    private popupActive: boolean;

    async init() {

        this.fieldLog = new FieldLogger();
        this.fieldLog.init();
        this.fieldLog.onNewField = (iitcField, mindunits) => this.showFieldMus(iitcField, mindunits);


        window.addHook("fieldAdded", this.onFieldAdd);
        window.addHook("fieldRemoved", this.onFieldRemoved);
        window.map.on("mousemove", this.onMouseMove);

        this.layer = new L.LayerGroup();
        window.addLayerGroup("MUs", this.layer, true);

        this.setupCss();

        this.muDB = new MindunitsDB();
        this.muDB.train(this.fieldLog);
    }


    private setupCss(): void {
        $("<style>")
            .prop("type", "text/css")
            .html(".plugin-logfields-numbers {\
                font-size: 12px;\
                color: #121230;\
                font-family: monospace;\
                text-align: center;\
                pointer-events: none; \
              }")
            .appendTo("head");
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


    onMouseMove = (ev: L.LeafletMouseEvent) => {
        window.clearTimeout(this.mouseDelayTimer);
        this.mouseDelayTimer = window.setTimeout(() => this.checkForTooltip(ev), TOOLTIP_DELAY);

        if (this.popupActive) {
            window.map.closePopup();
            this.popupActive = false;
            this.clearS2Cells();
        }
    }


    checkForTooltip(ev: L.LeafletMouseEvent): void {
        const point = ev.layerPoint;
        const fields = [];

        for (var guid in window.fields) {
            const field = window.fields[guid];

            const positions: L.Point[][] = (<any>field)._rings;

            if (positions && this.pnpoly(positions[0], point)) {
                fields.push(field);
            }
        }

        if (fields.length > 0) {
            // this.showS2Cells(fields[0]);
            this.showTooltip(ev.latlng, fields);
        } else {
            window.map.closePopup();
            this.clearS2Cells();
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

    async showTooltip(pos: L.LatLng, fields: IITC.Field[]): Promise<void> {

        fields = fields.sort((a, b) => this.triangleArea(b.getLatLngs()) - this.triangleArea(a.getLatLngs()));


        let total = 0;
        const text: string[] = await Promise.all(fields.map(async f => {

            const calcMU = this.muDB.calcMU(f.getLatLngs());
            const calcMUStr = calcMU.missing ? ` >${calcMU.mindunits}` : calcMU.mindunits;

            const mindunits = await this.fieldLog.getFieldMUS(f);
            if (mindunits) {
                total += mindunits;
                return `${mindunits} Mus (~${calcMUStr})`;

            } else {
                total += calcMU.mindunits;
                return `~${calcMUStr} Mus`;
            }
        }))

        if (total > 0) text.push(`<hr><br>Total: ${total}`);

        window.map.openPopup(text.join("<br>"), pos);
        this.popupActive = true;
    }


    private triangleArea(p: L.LatLng[]): number {
        return Math.abs(0.5 * (
            (p[1].lat - p[0].lat) * (p[2].lng - p[0].lng)
            - (p[2].lat - p[0].lat) * (p[1].lng - p[0].lng)));
    }


    showS2Cells(field: IITC.Field): void {
        this.clearS2Cells();

        const ll = field.getLatLngs();

        const cover = new S2RegionCover();
        const region = new S2Triangle(LatLngToXYZ(ll[0]), LatLngToXYZ(ll[1]), LatLngToXYZ(ll[2]));
        const cells = cover.getCovering(region, S2MULevel, S2MUDetailLevel);

        if (cells.length === 0) {
            console.error("no S2 Cells for field?!?")
            return;
        }

        const theCells = cells.map(s2 => {
            const corners = s2.getCornerXYZ();
            const cornersLL = corners.map(c => XYZToLatLng(c));
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
}






Plugin.Register(new LogFields(), "LogFields");
