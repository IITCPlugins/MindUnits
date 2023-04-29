import * as Plugin from "iitcpluginkit";
import * as localForage from "localforage";

const MINIMUM_MUS = 100;

type Position = [number, number];
interface StoredField {
    time: number;
    mus: number;
};

class LogFields implements Plugin.Class {

    private store: LocalForage;
    private layer: L.LayerGroup<any>;
    private mustrings: Map<string, L.Marker> = new Map();

    async init() {
        window.addHook("publicChatDataAvailable", this.onChatData);
        window.addHook("fieldAdded", this.onFieldAdd);
        window.addHook("fieldRemove", this.onFieldRemove);

        this.layer = new L.LayerGroup();
        window.addLayerGroup("MUs", this.layer, true);

        this.store = localForage.createInstance({
            name: "FieldDB",
            driver: [localForage.WEBSQL, localForage.INDEXEDDB],
        });

        const length = await this.store.length();
        console.log("LogField: stored fields:", length);

        this.setupCss();
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

    onChatData = (chatEvent: EventPublicChatDataAvailable): void => {
        const fullChat = chatEvent.result;
        fullChat.forEach(chatLine => {
            if (chatLine[2].plext.plextType !== "SYSTEM_BROADCAST") return;

            const markup = chatLine[2].plext.markup;

            if (markup[0][0] === "PLAYER" && markup[1][1].plain === " created a Control Field @" && markup[2][0] === "PORTAL") {

                const guid = chatLine[0];
                const time = chatLine[1];
                const portal_raw = markup[2][1] as Intel.MarkUpPortalType;
                const atPosition: Position = [portal_raw.latE6, portal_raw.lngE6];
                const mindunits = markup[4][0] === "TEXT" ? parseInt(markup[4][1].plain) : 0;

                const relatedChats = fullChat.filter(chat => {
                    return chat[1] === time &&
                        chat[0] !== guid &&
                        chat[2].plext.markup[0][0] === "PLAYER" &&
                        chat[2].plext.markup[0][1].plain === markup[0][1].plain &&
                        chat[2].plext.plextType === "SYSTEM_BROADCAST";
                });

                this.onCreatedFieldMsg(relatedChats, guid, time, mindunits, atPosition);
            }
        });
    }


    async onCreatedFieldMsg(relatedChats: Intel.ChatLine[], guid: string, time: number, mindunits: number, pos1: Position) {

        if (mindunits < MINIMUM_MUS) {
            return;
        }

        if (this.isDoubleField(relatedChats)) {
            return;
        }

        const pos2 = this.findSecondPortal(relatedChats, pos1);
        if (!pos2) {
            // console.error("LogField: no link msg found");
            return;
        }

        const pos3 = this.findThirdPortal(pos1, pos2);
        if (!pos3) {
            // console.debug("LogField: third portal not found");
            return;
        }

        console.info(`-FIELD- ${mindunits}`);
        const myguid = this.pos2guid([pos1, pos2, pos3]);

        const old = await this.store.getItem(myguid) as StoredField;
        if (old) {
            console.assert(old.mus === mindunits, "MUS different");
            if (old.time >= time) return;
        }

        const iitcField = this.findField([pos1, pos2, pos3]);
        if (iitcField) {
            this.showFieldMus(iitcField, mindunits);
        }

        this.store.setItem(myguid, {
            time,
            mus: mindunits
        });
    }

    private pos2guid(pos_in: Position[]): string {
        const pos = this.posOrder(pos_in);
        const all = [...pos[0], ...pos[1], ...pos[2]];
        return all.map(v => (v < 0 ? "" : "+") + v.toString()).join();
    }

    private posOrder(pos: Position[]): Position[] {
        return pos.sort((a, b) => {
            const d = b[0] - a[0];
            if (d == 0) return b[1] - a[1];
            return d;
        });
    }

    private findField(p: Position[]): IITC.Field | undefined {

        for (const guid in window.fields) {
            const field = window.fields[guid];
            const fp = field.options.data.points

            if (this.compField(fp, p)) return field;
        }

        return;
    }

    private compField(fp: { latE6: number, lngE6: number }[], p: Position[]): boolean {
        return (
            (this.equal(fp[0], p[0]) &&
                ((this.equal(fp[1], p[1]) && this.equal(fp[2], p[2]))
                    ||
                    (this.equal(fp[1], p[2]) && this.equal(fp[2], p[1])))
            ) ||
            (this.equal(fp[0], p[1]) &&
                ((this.equal(fp[1], p[0]) && this.equal(fp[2], p[2]))
                    ||
                    (this.equal(fp[1], p[2]) && this.equal(fp[2], p[0])))
            ) ||
            (this.equal(fp[0], p[2]) &&
                ((this.equal(fp[1], p[1]) && this.equal(fp[2], p[0]))
                    ||
                    (this.equal(fp[1], p[0]) && this.equal(fp[2], p[1])))
            )
        );
    }

    private equal(a: { latE6: number, lngE6: number }, b: Position): boolean {
        return a.latE6 === b[0] && a.lngE6 === b[1];
    }




    isDoubleField(relatedChats: Intel.ChatLine[]): boolean {
        return relatedChats.some(chatline => {
            const markup = chatline[2].plext.markup;
            return markup[1][1].plain === " created a Control Field @"
        });
    }

    findSecondPortal(relatedChats: Intel.ChatLine[], pos1: Position): Position | undefined {
        let result: Position | undefined;

        relatedChats.some(chatLine => {
            const markup = chatLine[2].plext.markup;

            // "linked"
            if (markup[0][0] === "PLAYER" && markup[1][1].plain === " linked " && markup[2][0] === "PORTAL" && markup[4][0] === "PORTAL") {
                const portal1 = markup[2][1];
                const portal2 = markup[4][1];
                if (portal1.latE6 === pos1[0] && portal1.lngE6 === pos1[1]) {
                    result = [portal2.latE6, portal2.lngE6];
                    return true;
                }
                if (portal2.latE6 === pos1[0] && portal2.lngE6 === pos1[1]) {
                    result = [portal1.latE6, portal1.lngE6];
                    return true;
                }
            }

            return false;
        });

        return result;
    }

    findThirdPortal(pos1: Position, pos2: Position): Position | undefined {
        const portal1 = this.findPortalGuidByPositionE6(pos1[0], pos1[1]);
        const portal2 = this.findPortalGuidByPositionE6(pos2[0], pos2[1]);
        if (!portal1 || !portal2) {
            console.debug("LogField: cannot find guid of portal 1 or 2");
            return;
        }

        const canidates1 = this.getLinkedPortalguids(portal1);
        const canidates2 = this.getLinkedPortalguids(portal2);
        const canidates = canidates1.filter(l => canidates2.includes(l));

        if (canidates.length === 0) {
            console.log("LogField: matching portal3 loaded");
            return;
        }
        if (canidates.length === 1) {
            const portal3 = window.portals[canidates[0]];
            if (!portal3) {
                console.log("LogField: portal3 not loaded");
                return;
            }
            return [portal3.options.data.latE6, portal3.options.data.lngE6];
        }

        console.log("LogField: TODO check multilayer");
        return;
    }

    private findPortalGuidByPositionE6(latE6: number, lngE6: number): string | undefined {

        for (const guid in window.portals) {
            const data = window.portals[guid].options.data;
            if (data.latE6 == latE6 && data.lngE6 == lngE6) return guid;
        }

        // now try searching through fields
        for (const fguid in window.fields) {
            const points = window.fields[fguid].options.data.points;

            for (var i in points) {
                var point = points[i];
                if (point.latE6 == latE6 && point.lngE6 == lngE6) return point.guid;
            }
        }

        // and finally search through links
        for (const lguid in window.links) {
            const l = window.links[lguid].options.data;
            if (l.oLatE6 == latE6 && l.oLngE6 == lngE6) return l.oGuid;
            if (l.dLatE6 == latE6 && l.dLngE6 == lngE6) return l.dGuid;
        }

        return;
    }

    private getLinkedPortalguids(guid: string): string[] {
        const guids: string[] = [];
        $.each(window.links, function (g, l) {
            var d = l.options.data;

            if (d.oGuid == guid) {
                guids.push(d.dGuid);
            } else if (d.dGuid == guid) {
                guids.push(d.oGuid);
            }
        });

        return guids;
    }


    onFieldAdd = async (fieldEvent: EventFieldAdded): Promise<void> => {
        const p = fieldEvent.field.options.data.points.map(p => <Position>[p.latE6, p.lngE6]);
        const myguid = this.pos2guid(p);

        const old = await this.store.getItem(myguid) as StoredField;
        if (old) {
            this.showFieldMus(fieldEvent.field, old.mus);
        }
    }

    onFieldRemove = (fieldEvent: EventFieldRemoved): void => {
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

}


Plugin.Register(new LogFields(), "LogFields");
