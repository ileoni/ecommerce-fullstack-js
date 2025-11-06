import { useEffect, useState } from "react";
import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";

import Label from "./Label";

type Props<T extends FieldValues> = { label?: string, message?: string } & UseControllerProps<T>;

function Text<T extends FieldValues>(props: Props<T>) {
    const { control, name, label } = props;
    const [filled, setFilled] = useState(false);

    const { field, fieldState: { error, isDirty } } = useController({
        name,
        control
    })

    useEffect(() => {
        const notEmpty = field.value !== "" ? true : false;
        setFilled(notEmpty);
    }, [field])

    return (
        <Label label={label} isDirty={isDirty} message={error?.message} filled={filled}>
            <input
                {...field}
                className="px-5 py-6 outline-none"
                type="text"
            />
        </Label>
    )
}


export default Text;