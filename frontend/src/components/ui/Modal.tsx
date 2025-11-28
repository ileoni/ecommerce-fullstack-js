import { X } from "lucide-react";
import { useEffect, useRef, type PropsWithChildren } from "react";

import { useOverlay } from "../../contexts/Overlay";
import Card from "./Card";

function Modal({ children }: PropsWithChildren) {
    const { closeModal } = useOverlay();
    
    const modalRef = useRef<null | any>(null);

    useEffect(() => {
        const modal = modalRef.current;

        const outside = (e: Event) => {
            if(modal && !modal.contains(e.target)) closeModal();
        }

        document.addEventListener("mousedown", outside);
        return () => {
            document.removeEventListener("mousedown", outside);
        }
    }, [])

    return (
        <>
            <div className="size-full grid place-items-center">
                <Card.withRef ref={modalRef} className="min-w-72 flex flex-col h-auto! divide-y divide-zinc-300 dark:divide-zinc-700 shadow-2xl">
                    { children }
                </Card.withRef>
            </div>
        </>
    )
}

const Header = ({ children }: PropsWithChildren) => {
    const { closeModal } = useOverlay();
    return (
        <header className="px-5 py-2 grid grid-flow-col justify-between items-center gap-5">
            { children }
            <button onClick={closeModal}><X /></button>
        </header>
    )
}

const Main = ({ children }: PropsWithChildren) => {
    return (
        <main className="flex-1 px-5 py-2">
            { children }
        </main>
    )
}

const Footer = ({ children }: PropsWithChildren) => {
    return (
        <footer className="px-5 py-2 grid grid-flow-col justify-center gap-5">
            { children }
        </footer>
    )
}

Modal.Header = Header;
Modal.Main = Main;
Modal.Footer = Footer;

export default Modal;