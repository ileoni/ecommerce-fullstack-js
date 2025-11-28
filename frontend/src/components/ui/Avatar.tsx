import type { ImgHTMLAttributes } from "react";

type Props = {} & ImgHTMLAttributes<HTMLImageElement>;

function Avatar(props: Props) {
    return (
        <div className="rounded-full overflow-hidden">
            <img {...props} />
        </div>
    )
}

export default Avatar;