import { createContext, useContext, useEffect, useState, type Dispatch, type JSX, type PropsWithChildren, type SetStateAction } from "react";

type Props = {} & PropsWithChildren;
type Overlay = {
    closeModal: () => void,
    open: boolean,
    setComponent: Dispatch<SetStateAction<JSX.Element | null>>,
    state: unknown,
    setState: Dispatch<SetStateAction<null | unknown>>,
    toggleModal: () => void
};

const OverlayContext = createContext({} as Overlay);

export const useOverlay = (props?: { Component?: JSX.Element }) => {
    const { setComponent, ...rest } = useContext(OverlayContext);

    if(props) {
        const { Component } = props;

        useEffect(() => {
            if(!Component) return;
            setComponent(Component);
        }, [])
    }

    return rest;
};

function Overlay({ children }: Props) {
    const [state, setState] = useState<null | unknown>(null);
    const [open, setOpenModal] = useState(false);
    const [Component, setComponent] = useState<JSX.Element | null>(null);

    const toggleModal = () => {
        setOpenModal(!open);
    }
    const closeModal = () => {
        setOpenModal(false);
    }

    const value = {
        open,
        state,
        closeModal,
        setComponent,
        setState,
        toggleModal
    }

    return (
        <OverlayContext.Provider value={value}>
            { children }
            { open && (
                <div className="fixed inset-0 bg-zinc-200/50 dark:bg-zinc-700/50">
                    { Component }
                </div>
            )}
        </OverlayContext.Provider>
    )
}

const Toggle = ({ children }: PropsWithChildren) => {
    const { toggleModal } = useOverlay();
    return (
        <button onClick={toggleModal}>{ children }</button>
    );
}

Overlay.Toggle = Toggle;

export default Overlay;