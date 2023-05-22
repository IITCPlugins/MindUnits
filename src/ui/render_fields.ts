import { createSignal } from "solid-js";
import { main } from "../Main";


export class RenderFields {

    public areVisible: () => boolean;
    private setVisible: (show: boolean) => void;

    private layer: L.LayerGroup<any> | undefined;

    constructor() {
        [this.areVisible, this.setVisible] = createSignal<boolean>(false);
    }


    show(): void {
        this.hide();

        this.layer = new L.LayerGroup();

        main.fieldLog.forEach((latlngs, mindunits) => {

            latlngs.push(latlngs[0]);
            this.layer!.addLayer(new L.GeodesicPolyline(latlngs, { color: "#f0CC00" }));

            const center = L.latLng((latlngs[0].lat + latlngs[2].lat) / 2, (latlngs[0].lng + latlngs[2].lng) / 2);
            const marker = L.marker(center, {
                icon: L.divIcon({
                    iconSize: [48, 12],
                    html: Math.ceil(mindunits).toString()
                }),
                interactive: false
            });
            this.layer!.addLayer(marker);

        })

        window.map.addLayer(this.layer);
        this.setVisible(true);
    }

    hide(): void {
        if (this.layer) {
            window.map.removeLayer(this.layer);
            this.layer = undefined;
            this.setVisible(false);
        }
    }
}

export const renderFields = new RenderFields();