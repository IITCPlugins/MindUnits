import { render } from "solid-js/web";
import { main } from "../Main";
import { createSignal, Show } from "solid-js";

const [count, setCount] = createSignal<number>(0);
const [MUerror, setMUError] = createSignal<number>(0);


const DBStatus = () => {
    void main.getStatLogFieldCount().then(c => setCount(c));
    void main.getMUError().then(c => setMUError(c));
    return <div style="border: solid 1px yellow">
        Known Fields: {count()}<br />
        Trained Cells: {main.getCellCount()}<br />
        Error: {MUerror()}
    </div> as any;
}


const DebugDialogContent = () => {
    return (<>
        <DBStatus />
        <Show
            when={!main.areTrainCellsVisible()}
            fallback={<button onClick={() => main.hideMUDBCells()}>Hide trained cells</button>}
        >
            <button onClick={() => main.showMUDBCells()}>Show trained cells</button>;
        </Show >
        <button onClick={() => main.train()}>Train</button>;
    </>)
}

export class DebugDialog {

    show(): void {

        const dialog = window.dialog({
            title: "LogField Dialog",
            html: "."
        })

        render(() => <DebugDialogContent />, dialog[0]);
    }
}
