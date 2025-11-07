import { useEffect, useState } from "react";
import { Trash } from "lucide-react";

import { imageTypes } from "../../services/admin/imageTypes";
import Table from "../../components/ui/Table";
import IconButtonStyle from "../../components/ui/HOC/IconButtonStyle";
import InlineEditableInput from "../../components/ui/InlineEditableInput";
import { updateImageType } from "../../services/admin/updateImageType";

type ImageTypes = {
    id: number,
    key: string,
    width: string,
    height: string
}

function List() {
    const [types, setTypes] = useState<ImageTypes[] | null>(null);

    const ButtonDelete = IconButtonStyle(Trash);

    const update = () => {
        imageTypes()
            .then(async res => {
                const { data } = await res.json();
                setTypes(data.imageTypes);
                return data;
            });
    }

    useEffect(() => {
        update();
    }, [])
    
    const onSubmit = function(data: { id: string | number, col: string, value: string | undefined }) {
        const { id } = data;

        const body = Object.create(null);
        body[data.col] = data.value;
        
        updateImageType(id, body);
        update();
    }

    return (
        <Table>
            <Table.Thead>
                <Table.Trow>
                    <Table.Theader>chave</Table.Theader>
                    <Table.Theader>largura</Table.Theader>
                    <Table.Theader>altura</Table.Theader>
                    <Table.Theader className="w-16"></Table.Theader>
                </Table.Trow>
            </Table.Thead>
            <Table.Tbody>
                {types && types.map((type, index) => (
                    <Table.Trow key={index}>
                        <Table.Tdata className="text-ellipsis p-0!">
                            <InlineEditableInput
                                defaultValue={ type.key }
                                handleSubmit={data => onSubmit({ id: type.id, col: "key", value: data })}
                            />
                        </Table.Tdata>
                        <Table.Tdata className="text-ellipsis p-0!">
                            <InlineEditableInput
                                defaultValue={ type.width }
                                handleSubmit={data => onSubmit({ id: type.id, col: "width", value: data })}
                            />
                        </Table.Tdata>
                        <Table.Tdata className="text-ellipsis p-0!">
                            <InlineEditableInput
                                defaultValue={ type.height }
                                handleSubmit={data => onSubmit({ id: type.id, col: "height", value: data })}
                            />
                        </Table.Tdata>
                        <Table.Tdata className="w-16">
                            <ButtonDelete/>
                        </Table.Tdata>
                    </Table.Trow>
                ))}
            </Table.Tbody>
        </Table>   
    )
}

export default List;