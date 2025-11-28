import type { ButtonHTMLAttributes, ImgHTMLAttributes } from "react";

function CardImage(props: ImgHTMLAttributes<HTMLImageElement>) {
    const { alt, children, className, src, ...rest } = props;
    return (
        <div className={`group relative ${className}`}>
            { children ?? children }
            <img {...rest} src={ src ?? "default"} alt={ alt ?? "default" }  className="rounded-xl"/>
        </div>
    )
}

const WithActions = (props: ImgHTMLAttributes<HTMLImageElement>) => {
    const { children } = props;
    return (
        <CardImage {...props}>
            <div className="w-full p-2.5 flex flex-wrap flex-row-reverse absolute opacity-45 group-hover:opacity-100 bg-white/50 dark:bg-zinc-900/50">
                { children }
            </div>
        </CardImage>
    )
}

const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { className, children } = props;
    return (
        <div className={`w-2/6 sm:w-2/6 flex justify-center ${className}`}>
            <button className="p-2 hover:bg-white hover:dark:bg-zinc-900 cursor-pointer rounded-full">
                { children }                
            </button>
        </div>
    )
}

CardImage.WithActions = WithActions;
CardImage.Button = Button;

export default CardImage;