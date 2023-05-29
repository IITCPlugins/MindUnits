import { Show, render } from "solid-js/web";
import { createSignal } from "solid-js";
import { main } from "../Main";
import { renderCells } from "./render_cells";
import { renderFields } from "./render_fields";

const [count, setCount] = createSignal<number>();
const [MUerror, setMUError] = createSignal<number>();


const DBStatus = () => {
    void main.getStatLogFieldCount().then(c => setCount(c));
    void main.getMUError().then(c => setMUError(c));
    return <div style="border: solid 1px yellow">
        Known Fields: {count() ? count() : "?"}<br />
        Trained Cells: {main.getCellCount()}<br />
        Avg.Error: {MUerror() ? MUerror() : "?"}
    </div> as any;
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
        <button onClick={() => main.train(true)}>Train</button><br/>
        <hr></hr>
        <button onClick={() => main.exportError()}>Export ErrorList</button><br />
        <button onClick={() => main.exportFields()}>Export FieldList</button><br />
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
