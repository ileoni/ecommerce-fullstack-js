import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { ImageUp } from "lucide-react";
import { usePreventDefault } from "../../hooks/usePreventDefault";
import { useGetFileDimensions } from "../../hooks/useGetFileDimensions";
import { useValidateDimensions } from "../../hooks/useValidadeDimensions";

type Props = {
    data: any
}

function Preview(props: Props) {
    const { data } = props;

    const [file, setFile] = useState<string | null>(null);
    
    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const { preventDefault, preventDefaultWithCallback } = usePreventDefault();
    const { getImageDimensions } = useGetFileDimensions();
    const { validate } = useValidateDimensions({ width: parseInt(data.width), height: parseInt(data.height) });

    const handleClick = () => {
        if(!inputRef.current) return;
        inputRef.current.click();
    }

    const getFile = (event: DragEvent<HTMLDivElement> | ChangeEvent<HTMLInputElement>) => {
        const files = ("dataTransfer" in event) ? event.dataTransfer.files: event.target.files;
        if(files === null) return;
        const file = files[0];
        return file;
    }

    const handleChange = async (event: DragEvent<HTMLDivElement> | ChangeEvent<HTMLInputElement>) => {
        const file = getFile(event);

        if(file === undefined) return;

        const dimensions = await getImageDimensions(file);

        if(validate(dimensions)) {
            const objectUrl = URL.createObjectURL(file);
            setFile(objectUrl);
        } else {
        }
    }

    return (
        <div
            className="min-h-96 border-4 not-hover:border-zinc-100 not-hover:dark:border-zinc-700 border-zinc-300 dark:border-zinc-600 border-dashed transition-colors rounded-2xl"
            onClick={handleClick}
            onDrop={preventDefaultWithCallback(handleChange)}
            onDragOver={preventDefault}
            ref={wrapperRef}
        >
            <input hidden onChange={handleChange} ref={inputRef} type="file"/>
            <div className="size-full grid place-items-center place-content-center gap-5">
                <div 
                    className="grid place-items-center bg-zinc-200 dark:bg-zinc-700 rounded-2xl"
                    style={{ width: `${data.width}px`, height: `${data.height}px` }}
                >
                    {file ? (
                        <img src={file} alt="pre-visualização da imagem"/>
                    ): (
                        <ImageUp className="size-12"/>
                    )}
                </div>
                <span className="text-xs">{ data.width } x { data.height }</span>
                <span className="text-xs">Clique ou arraste o arquivo para area de upload</span>
            </div>
        </div>
    )
}

export default Preview;