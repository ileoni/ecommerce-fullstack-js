import { useEffect, useState, type ChangeEvent } from "react";

import { imageTypes } from "../../services/admin/imageTypes";
import Row from "../../components/ui/Row";
import Select from "../../components/ui/Select";
import Preview from "../../components/ui/Preview";

type Type = {
    id: number,
    key: string,
    width: string,
    height: string,
}

function Register() {
    const [types, setTypes] = useState<Type[]>([]);
    const [configType, setConfigType] = useState<Type | null | undefined>(null);
    
    useEffect(() => {
        update();
    }, [])

    const update = () => {
        imageTypes()
            .then(async res => {
                const { data } = await res.json();
                setTypes(data.imageTypes);
                return data;
            })
    }

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const id = parseInt(e.target.value);
        const type = types.find((type) => type.id === id);
        setConfigType(type);
    }
    
    return (
        <div className="max-h-screen grid gap-5">
            <Row
                title="image"
                subtitle="selecione o tipo de imagem para salvar"
            >
                <Select
                    label="imagens"
                    onChange={handleChange}
                >
                    <option>Escolha um tipo</option>
                    {types && types.map((type, index) => (
                        <option key={index} value={type.id}>{type.key}</option>
                    ))}
                </Select>
            </Row>
            {configType && (
                <Preview
                    data={configType}
                />
            )}
        </div>
    )
}

export default Register;