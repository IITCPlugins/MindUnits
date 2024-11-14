import * as S2 from "../lib/S2";
import { main } from "../Main";


export class RenderCells {

    private layer: L.LayerGroup<any> | undefined;

    show(): void {
        this.hide();

        this.layer = new L.LayerGroup();

        void main.muDB.getDensityMap().forEach((cell, mindunits) => this.renderCell(cell, mindunits));

        window.map.addLayer(this.layer);
    }

    areVisible(): boolean {
        return !!this.layer;
    }

    private renderCell(cell: S2.Cell, mindunits: number) {
        const cornersLL = cell.getCornerLatLngs();
        cornersLL.push(cornersLL[0]);

        this.layer!.addLayer(new L.GeodesicPolyline(cornersLL, { color: "#aa11aa" }));

        const center = L.latLng((cornersLL[0].lat + cornersLL[2].lat) / 2, (cornersLL[0].lng + cornersLL[2].lng) / 2);
        const marker = L.marker(center, {
            icon: L.divIcon({
                iconSize: [48, 12],
                html: Math.ceil(mindunits).toString()
            }),
            interactive: false
        });
        this.layer!.addLayer(marker);
    }

    hide(): void {
        if (this.layer) {
            window.map.removeLayer(this.layer);
            this.layer = undefined;
        }
    }
}

export const renderCells = new RenderCells();