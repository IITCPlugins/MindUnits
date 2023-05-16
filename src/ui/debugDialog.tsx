import { render } from "solid-js/web";
import { main } from "../Main";
import { createSignal, Show } from "solid-js";

const [count, setCount] = createSignal(0);

const DBStatus = () => {

    void main.getStatLogFieldCount().then(c => setCount(c));
    return <div style="border: solid 1px yellow">
        Stored Fields: {count()}<br />
        Trained Cells: {main.getCellCount()}
    </div> as any;
}

const DebugDialogContent = () => {
    return (<>
        <DBStatus />
        <Show
            when={!main.isAllCellsLayerActive()}
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
