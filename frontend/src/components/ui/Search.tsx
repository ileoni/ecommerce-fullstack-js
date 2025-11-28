import { SearchIcon } from "lucide-react";
import { useController, type FieldValues, type UseControllerProps } from "react-hook-form";

import Label from "./Label";
import IconButtonStyle from "./HOC/IconButtonStyle";
import { useEffect, useState } from "react";

type Props<T extends FieldValues> = { label?: string, message?: string } & UseControllerProps<T>;

function Search<T extends FieldValues>(props: Props<T>) {
    const { name, control } = props;

    const [filled, setFilled] = useState(false);
    
    const { field, fieldState: { isDirty } } = useController({
        name,
        control
    })

    const SearchButton = IconButtonStyle(SearchIcon);
    
    useEffect(() => {
        const notEmpty = field.value !== "" ? true : false;
        setFilled(notEmpty);
    }, [field])
    
    return (
        <Label
            filled={filled}
            isDirty={isDirty}
            label="pesquisar"
        >
            <div className="px-5 grid grid-cols-[1fr_auto]">
                <input
                    {...field}
                    className="py-6 outline-none"
                    type="text"
                />
                <SearchButton/>
            </div>
        </Label>
    )
}

export default Search;