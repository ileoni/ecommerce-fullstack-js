import type { InputHTMLAttributes } from "react";

type Props = { label?: string } & InputHTMLAttributes<HTMLInputElement>;

function FileUpload(props: Props) {
    const { label, onChange } = props;
    return (
        <label>
            <input type="file" onChange={onChange} hidden/>
            <span className="px-5 py-1.5 bg-blue-500/80 hover:bg-blue-500 text-xs text-white rounded">
                { label }
            </span>
        </label>
    )
}

export default FileUpload;