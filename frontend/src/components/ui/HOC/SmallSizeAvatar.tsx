import type { ComponentType, ImgHTMLAttributes } from "react";

function SmallSizeAvatar(Component: ComponentType<ImgHTMLAttributes<HTMLImageElement>>) {
    return (props: ImgHTMLAttributes<HTMLImageElement>) => {
        const { src, alt, ...rest } = props;

        const isValidSrc = src && src.trim() !== '';

        const avatarProps = {
            src: isValidSrc ? src : "/default-avatar.png",
            alt: alt || "avatar",
            ...rest
        }

        return <Component {...avatarProps} className="size-10"/>;
    }
}

export default SmallSizeAvatar;