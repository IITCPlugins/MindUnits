import * as Plugin from "iitcpluginkit";
import * as localForage from "localforage";

const MINIMUM_MUS = 100;

type Position = [number, number];

class LogFields implements Plugin.Class {

    private store: LocalForage;

    async init() {
        window.addHook("publicChatDataAvailable", this.onChatData);
        this.store = localForage.createInstance({
            name: "FieldDB",
            driver: [localForage.WEBSQL, localForage.INDEXEDDB],
        });

        const length = await this.store.length();
        console.log("LogField: stored fields:", length);
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


    onCreatedFieldMsg(relatedChats: Intel.ChatLine[], guid: string, time: number, mindunits: number, pos1: Position) {

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
        this.store.setItem(guid, {
            time,
            mus: mindunits,
            pos: [pos1, pos2, pos3]
        });
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
}


Plugin.Register(new LogFields(), "LogFields");
