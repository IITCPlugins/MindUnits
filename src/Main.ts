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
        chatEvent.result.forEach(chatLine => {
            if (chatLine[2].plext.plextType !== "SYSTEM_BROADCAST") return;

            const markup = chatLine[2].plext.markup;

            // "Field"
            if (markup[0][0] === "PLAYER" && markup[1][1].plain === " created a Control Field @" && markup[2][0] === "PORTAL") {

                if (this.isDoubleField(chatEvent.result, chatLine)) {
                    // console.debug("LofField: double field (skipped)")
                    return;
                }
                const mus = markup[4][0] === "TEXT" ? parseInt(markup[4][1].plain) : 0;
                if (mus < MINIMUM_MUS) {
                    // console.debug("LogField: skipped because MUs to low");
                    return;
                }
                const portal_raw = markup[2][1] as Intel.MarkUpPortalType;
                const pos1: Position = [portal_raw.latE6, portal_raw.lngE6];

                const pos2 = this.findSecondPortal(chatEvent.result, chatLine[1], pos1);
                if (!pos2) {
                    console.error("LogField: no link msg found");
                    return;
                }

                const pos3 = this.findThirdPortal(pos1, pos2);
                if (!pos3) {
                    console.debug("LogField: third portal not found");
                    return;
                }

                // console.log("Store: ", mus + " MUs", pos1, pos2, pos3);
                this.store.setItem(chatLine[0], {
                    time: chatLine[1],
                    mus: mus,
                    positions: [pos1, pos2, pos3]
                });
            }
        });
    }



    isDoubleField(chat: Intel.ChatLine[], current: Intel.ChatLine): boolean {
        return chat.some(chatline => {
            if (chatline[1] !== current[1] || chatline == current) return false;
            const markup = chatline[2].plext.markup;

            return markup[1][1].plain === " created a Control Field @" &&
                markup[0][0] === "PLAYER" &&
                markup[2][0] === "PORTAL";
            // compare portal?
        });
    }

    findSecondPortal(chat: Intel.ChatLine[], time: number, pos1: Position): Position | undefined {
        let result: Position | undefined;
        chat.some(chatLine => {
            if (chatLine[2].plext.plextType !== "SYSTEM_BROADCAST") return false;
            if (chatLine[1] !== time) return false;

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
        const portal1 = window.findPortalGuidByPositionE6(pos1[0], pos1[1]);
        const portal2 = window.findPortalGuidByPositionE6(pos2[0], pos2[1]);
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
