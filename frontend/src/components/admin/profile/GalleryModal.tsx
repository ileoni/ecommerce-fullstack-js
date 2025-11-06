import { useEffect, useState } from "react";

import { Pin, PinOff } from "lucide-react";
import { useAuth } from "../../../contexts/Authenticate";
import { avatars } from "../../../services/admin/avatars";
import { useOverlay } from "../../../contexts/Overlay";
import Modal from "../../ui/Modal";
import { updateAvatar } from "../../../services/admin/updateAvatar";
import CardImage from "../../ui/CardImage";

function GalleryModal() {
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
                <div className="max-h-96 overflow-auto grid grid-cols-2 sm:grid-cols-4 gap-5">
                    {images.map((image, index) => (
                        <CardImage.WithActions
                            key={index}
                            src={image.path}
                            className="w-32"
                        >
                            <CardImage.Button>
                                {image.avatar.active ? (
                                    <Pin className="size-full text-yellow-600 dark:text-yellow-400"/>
                                ): (
                                    <PinOff className="size-full"/>
                                )}
                            </CardImage.Button>
                        </CardImage.WithActions>
                    ))}
                </div>
            </Modal.Main>
        </Modal>
    )
}

export default GalleryModal;