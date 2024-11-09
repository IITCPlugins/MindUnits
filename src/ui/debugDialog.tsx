import { Show, render } from "solid-js/web";
import { createSignal } from "solid-js";
import { main } from "../Main";
import { renderCells } from "./render_cells";
import { renderFields } from "./render_fields";

const [count, setCount] = createSignal<number>();


const DBStatus = () => {
    void main.getStatLogFieldCount().then(c => setCount(c));
    return <div style="border: solid 1px yellow">
        Known Fields: {count() ?? "?"}<br />
    </div>;
}


const DebugDialogContent = () => {
    return (<>
        <DBStatus />
        <Show
            when={!renderCells.areVisible()}
            fallback={<button onClick={() => renderCells.hide()}>Hide trained cells</button>}
        >
            <button onClick={() => renderCells.show()}>Show trained cells</button>
        </Show ><br />
        <Show
            when={!renderFields.areVisible()}
            fallback={<button onClick={() => renderFields.hide()}>Hide known fields</button>}
        >
            <button onClick={() => renderFields.show()}>Show known fields</button>
        </Show ><br />
        <button onClick={() => main.train()}>Train</button><br />
        <hr></hr>
        <button onClick={() => main.exportFields_CSV()}>Export FieldList - CSV</button><br />
        <button onClick={() => main.importFields()}>Import FieldList - JSON</button><br />
        <button onClick={() => main.exportFields()}>Export FieldList - JSON</button><br />
    </>)
}


export class DebugDialog {

    show(): void {

        const dialog = window.dialog({
            title: "Mindunits Debug Dialog",
            html: "."
        })

        render(() => <DebugDialogContent />, dialog[0]);
    }
}
