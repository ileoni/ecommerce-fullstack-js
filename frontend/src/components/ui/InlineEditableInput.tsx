import { Check, X } from "lucide-react";
import { useEffect, useRef, useState, type ChangeEvent } from "react";

type Props = { defaultValue?: string, handleSubmit?: (value: string | undefined) => void };

function InlineEditableInput(props: Props) {
    const { defaultValue, handleSubmit } = props;

    const wrapperInputRef = useRef<any | null>(null);
    
    const [state, setState] = useState<string | undefined>(defaultValue);
    const [isEditable, setIsEditable] = useState<boolean>(false);

    const toggleEditableInput = () => {
        setIsEditable(!isEditable);
    }

    const closeEditableInput = () => {
        setState(defaultValue);
        setIsEditable(false);
    }

    useEffect(() => {
        const wrapper = wrapperInputRef.current;

        const outside = (e: Event) => {
            if(wrapper && !wrapper.contains(e.target)) closeEditableInput();
        }

        document.addEventListener("mousedown", outside);
        return () => {
            document.removeEventListener("mousedown", outside);
        }
    }, [isEditable]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value);
    }

    const handleClick = () => {
        if(handleSubmit) handleSubmit(state);
        closeEditableInput();
    }

    return (
        <div className="grid hover:bg-zinc-200 hover:dark:bg-zinc-700 rounded">
            { isEditable ? (
                <div ref={wrapperInputRef} className="relative">
                    <input
                        autoFocus
                        className="w-full flex px-5 py-2.5 outline-none"
                        type="text"
                        value={state}
                        onChange={handleChange}
                    />
                    <div className="absolute right-0 mt-2 grid grid-flow-col gap-2">
                        <button
                            className="bg-zinc-200 dark:bg-zinc-700 rounded text-green-400"
                            onClick={handleClick}
                        >
                            <Check />
                        </button>
                        <button
                            className="bg-zinc-200 dark:bg-zinc-700 rounded text-red-400"
                            onClick={closeEditableInput}
                        >
                            <X />
                        </button>
                    </div>
                </div>
            ) : (
                <button 
                    className="flex px-5 py-2.5"
                    onClick={toggleEditableInput}
                >
                    <span>{ defaultValue }</span>
                </button>
            )}
        </div>
    )
}

export default InlineEditableInput;