import { createRef, useRef, useState } from "react"

export const useRefManager = () => {
    const [refIds, setRefIds] = useState<string[]>([]);
    const refsMap = useRef(new Map<string, any>());
    
    const addRef = () => {
        const id = `component-${Date.now()}`;
        refsMap.current.set(id, createRef());
        setRefIds(prev => [...prev, id]);
    }
    
    const deleteRef = (id: string) => {
        refsMap.current.delete(id);
        setRefIds(prev => prev.filter(refId => refId !== id));
    }
    
    const getRef = (id: string) => refsMap.current.get(id);

    return {
        refIds,
        addRef,
        deleteRef,
        getRef
    }
}