import { main } from "../Main";
import { renderCells } from "./render_cells";
import { renderFields } from "./render_fields";



export class DebugDialog {

    private dialog: JQuery;


    show(): void {

        const html = $("<div>").append(
            $("<div>", { id: "fields", style: "border: solid 1px yellow", text: "Known Fields: ?" }),
            $("<button>", { id: "renderCells", click: () => this.toggleRenderCells(), text: renderCells.areVisible() ? "Hide trained cells" : "Show trained cells" }), $("<br>"),
            $("<button>", { id: "renderFields", click: () => this.toggleRenderFields(), text: renderFields.areVisible() ? "Hide known fields" : "Show known fields" }),
            $("<hr>"),
            $("<button>", { click: () => main.train(), text: "Train" }), $("<br>"),
            $("<button>", { click: () => main.importFields(), text: "Import FieldList" }), $("<br>"),
            $("<button>", { click: () => main.exportFields(), text: "Export FieldList" }), $("<br>"),
        );

        this.dialog = window.dialog({
            title: "Mindunits Debug Dialog",
            html,
        })

        void main.getStatLogFieldCount().then(c => $("#fields", this.dialog).text(`Known Fields: ${c}`));
    }


    toggleRenderCells() {
        if (renderCells.areVisible()) {
            $("#renderCells", this.dialog).text("Show trained cells");
            renderCells.hide();
        } else {
            $("#renderCells", this.dialog).text("Hide trained cells");
            renderCells.show();
        }
    }

    toggleRenderFields() {
        if (renderFields.areVisible()) {
            $("#renderFields", this.dialog).text("Show known fields");
            renderFields.hide();
        } else {
            $("#renderFields", this.dialog).text("Hide known fields");
            renderFields.show();
        }
    }

}
