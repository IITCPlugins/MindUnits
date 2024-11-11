/* eslint-disable unicorn/filename-case */
import { saveAs } from "file-saver";

export interface CSVOptions {
    name: string;
    filename: string;
    fields: string[];
    optionalFields?: string[];
}

/**
 * Export data to CSV table
 */
export class CSVExport<DataClass> {

    public FIELD_SEPARATOR = ",";

    private filename: string;
    private fields: string[];
    private lines: DataClass[];

    constructor(lines: DataClass[], options: Partial<CSVOptions>) {

        this.filename = options.filename ?? "export.csv";
        if (options.name && !options.filename) this.setFileNameWithDate(options.name);

        this.lines = lines;
        this.fields = options.fields ?? [];
        if (this.fields.length === 0 && this.lines.length > 0) {
            this.fields = Object.keys(lines[0] as object);
        };

        if (options.optionalFields) {
            this.removeFieldsIfUnused(options.optionalFields);
        }
    }


    setFileNameWithDate(name: string): void {
        const time = window.unixTimeToDateTimeString(new Date()).replace(/-/g, "_").replace(/:/g, "");
        this.filename = `${name}_${time}.csv`;
    }


    save(): void {
        const content = this.createContent();
        if (typeof android !== "undefined" && android && (android as any).saveFile) {
            android.saveFile(this.filename, "text/comma-separated-values", content);
        } else {
            const blob = new Blob([content], { type: "text/comma-separated-values;charset=UTF-8" });
            saveAs(blob, this.filename);
        }
    }


    private createContent(): string {
        const head = this.fields.map(name => this.toCSVField(name)).join(this.FIELD_SEPARATOR);
        const body = this.lines.map(data => this.line(data));

        body.splice(0, 0, head)

        return body.join("\n");
    }


    private line(data: DataClass): string {
        const fields = this.fields.map(field => this.toCSVField((<any>data)[field]));
        return fields.join(this.FIELD_SEPARATOR);
    }


    private toCSVField(text: any): string {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        if (typeof (text) === "function") text = text();
        // eslint-disable-next-line unicorn/no-typeof-undefined
        if (typeof (text) === "undefined") return "";
        if (typeof (text) === "number") return text.toString();
        if (typeof (text) !== "string") return "";

        let asStr = (text || "").replace(/"/g, '""');
        if (asStr.includes(",") || asStr.includes("\n") || asStr.includes("\r") || asStr.includes("\"")) {
            asStr = '"' + asStr + '"';
        }

        return asStr;
    }


    removeFieldsIfUnused(fields?: string[]): void {
        if (!fields) fields = [...this.fields];

        fields.forEach(field => {
            if (this.lines.some(line => (line as any)[field])) return;

            const index = this.fields.indexOf(field);
            if (index !== -1) {
                this.fields.splice(index, 1);
            }
        })

    }
}
