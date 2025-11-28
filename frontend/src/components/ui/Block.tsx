import { createContext, useContext, useState } from "react";
import { useConfigs } from "../../hooks/useConfigs";
import { useRefManager } from "../../hooks/useRefManager";
import PlusButton from "./PlusButton";
import Row from "./Row";
import Select from "./Select";
import Gallery from "./Gallery";
import DraggingAndDropping from "./DraggingAndDropping";


type Component = {
    key: string
    value: string
}

type ComponentConfigs = {
    id: string
    type: string
}

type Block = { configs: ComponentConfigs[] }

const BlockContext = createContext({} as Block);

const useBlock = () => {
    return useContext(BlockContext);
}

function Block() {
    const [configs, setConfigs] = useState<ComponentConfigs[]>([]);
    
    const components: Component[] = Object.values(useConfigs("components"));
    
    const { addRef, deleteRef, refIds } = useRefManager();

    const state = {
        configs
    }

    const handleChange = (e: any) => {
        const id = e.target.id;
        const type = e.target.value;

        setConfigs(prev => {
            const existingConfig = prev.find(config => config.id === id);
            
            if(existingConfig) {
                return prev.map(config => {
                    return config.id === id ? { ...config, type }: config
                })
            }

            return [...prev, { id,  type }];
        });
    }

    const handleClick = (id: string) => {
        setConfigs(prev => prev.filter(config => config.id !== id));
        deleteRef(id);
    }

    return (
        <BlockContext.Provider value={state}>
            <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {refIds.map((id, index) => (
                        <div key={index} className="py-5 grid gap-5">
                            <Row
                                title="Componentes"
                                subtitle="componentes genericos"
                                onClick={() => handleClick(id)}
                            >
                                <Select
                                    id={id}
                                    defaultValue="Componentes"
                                    onChange={handleChange}
                                >
                                    {components.map((component: Component, index) => (
                                        <option key={index} value={component.key}>
                                            { component.value }
                                        </option>
                                    ))}
                                </Select>
                            </Row>
                            <ChooseComponents id={id}/>
                        </div>
                ))}
                <div className="pt-5 grid place-items-center">
                    <PlusButton
                        onClick={addRef}
                    />
                </div>
            </div>
        </BlockContext.Provider>
    );
}

const ChooseComponents = (props: any) => {
    const { id } = props;
    const { configs } = useBlock();

    const componentConfig = configs.find(config => config.id === id);

    const renderComponent = () => {
        if(componentConfig?.type.includes("banners")) {
            return <DraggingAndDropping />
        } else if(componentConfig?.type.includes("gallery")) {
            return <Gallery />
        }
    }

    return renderComponent();
}

export default Block;