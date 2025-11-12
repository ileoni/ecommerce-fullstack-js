import { useEffect, useState } from "react";
import { NavLink } from "react-router";

import { allImages } from "../../services/admin/allImages";
import { useConfigs } from "../../hooks/useConfigs";
import RegisterNavLinkStyle from "../../components/ui/HOC/RegisterNavLinkStyle";
import CardImage from "../../components/ui/CardImage";
import { X } from "lucide-react";
import IconButtonStyle from "../../components/ui/HOC/IconButtonStyle";

type Image = { id: number, path: string }

function List() {
    const [images, setImages] = useState<Image[]>([]);

    const RegisterNavLink = RegisterNavLinkStyle(NavLink);
    const IconButton = IconButtonStyle(X);
    
    const { register } = useConfigs("menus.admin.authenticate.gallery.children.hidden");

    const update = () => {
        allImages()
            .then(async res => {
                const { data } = await res.json();
                setImages(data);
                return data;
            })
    }

    useEffect(() => {
        update();
    }, []);

    return (
        <div className="grid gap-5">
            <div className="flex justify-end">
                <RegisterNavLink
                    to={register.slug}
                >
                    cadastrar
                </RegisterNavLink>
            </div>
            <div className="max-h-screen overflow-auto grid grid-cols-2 sm:grid-cols-4 gap-5">
                {images && images.map((image, index) => (
                    <CardImage.WithActions
                        key={index}
                        src={image.path}
                    >
                        <IconButton
                            className="hover:bg-red-400 hover:dark:bg-red-500 text-white transition-[background]"
                        />
                    </CardImage.WithActions>
                ))}
            </div>
        </div>
    )
}

export default List;