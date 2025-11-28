import { useController, type FieldValues, type UseControllerProps } from "react-hook-form"

import Label from "./Label"
import { useEffect, useState } from "react";

type Props<T extends FieldValues> = { label?: string, message?: string } & UseControllerProps<T>;

function Number<T extends FieldValues>(props: Props<T>) {
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
                type="number"
                className="px-5 py-6 outline-none"
            />
        </Label>
    )
}

export default Number
