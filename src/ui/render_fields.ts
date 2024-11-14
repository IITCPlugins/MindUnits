import { main } from "../Main";


export class RenderFields {

    private layer: L.LayerGroup<any> | undefined;


    show(): void {
        this.hide();

        this.layer = new L.LayerGroup();

        void main.fieldLog.forEach((latlngs, mindunits, time) => {

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
    }

    areVisible(): boolean {
        return !!this.layer;
    }


    hide(): void {
        if (this.layer) {
            window.map.removeLayer(this.layer);
            this.layer = undefined;
        }
    }
}

export const renderFields = new RenderFields();