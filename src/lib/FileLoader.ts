
interface Options {
    accept: string;
}

export const loadFile = async (options: Partial<Options> = {}): Promise<string> => {

    return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.style.display = 'none';
        if (options.accept) input.accept = options.accept;
        input.addEventListener(
            "change",
            // @ts-ignore
            (event: Event) => readFile((event.target as HTMLInputElement).files[0], resolve, reject),
            false
        );
        document.body.appendChild(input);
        input.click();
        input.remove();
    });
};

const readFile = (file: Blob, resolve: (text: string) => void, reject: () => void) => {

    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result as string));
    reader.addEventListener('error', () => reject());
    reader.readAsText(file);
}

