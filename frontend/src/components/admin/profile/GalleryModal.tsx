import { useEffect, useRef, useState } from "react";

import { Pin, PinOff } from "lucide-react";
import { useAuth } from "../../../contexts/Authenticate";
import { avatars } from "../../../services/admin/avatars";
import { useOverlay } from "../../../contexts/Overlay";
import Modal from "../../ui/Modal";
import { updateAvatar } from "../../../services/admin/updateAvatar";

function GalleryModal() {
    const { closeModal } = useOverlay();
    const { auth } = useAuth();
    
    const [images, setImages] = useState([]);

    const onSubmit = (id: number) => {
        updateAvatar(auth.id, { id })
        .then(async res => {
            const { data } = await res.json();
            return data;
        })
    }

    useEffect(() => {
        if(auth) {
            avatars(auth.id)
            .then(async res => {
                const { data } = await res.json();
                setImages(data.avatares);
                return data;
            })
        }
    }, [auth])

    return (
        <Modal>
            <Modal.Header>
                <div className="grid">
                    <span className="first-letter:capitalize">avatares</span>
                </div>
            </Modal.Header>
            <Modal.Main>
                <div className="max-h-96 overflow-y-auto grid grid-cols-4 gap-5">
                    {images.map((image, index) => (
                        <div key={index} className="max-w-32 relative">
                            <button className="w-full p-1 absolute flex flex-wrap gap-2 justify-end" onClick={() => onSubmit(image.id)}>
                                {image.avatar.active ? (
                                    <span className="p-1 bg-red-400/70 hover:bg-red-400 text-white rounded-full">
                                        {<Pin/>}
                                    </span>
                                ): (
                                    <span className="p-1 bg-gray-400/70 hover:bg-gray-400 text-white rounded-full">
                                        {<PinOff/>}
                                    </span>
                                )}
                            </button>
                            <img src={image.path} alt="" draggable={false}/>
                        </div>
                    ))}
                </div>
            </Modal.Main>
        </Modal>
    )
}

export default GalleryModal;