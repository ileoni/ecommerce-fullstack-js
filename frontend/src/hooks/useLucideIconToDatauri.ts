import { createElement } from "react";
import type { LucideIcon, LucideProps } from "lucide-react";

import { useTheme } from "../contexts/Theme";
import { renderToStaticMarkup } from "react-dom/server";

export const useLucideIconToDataUri = (IconComponent: LucideIcon, props?: {}) => {
    const { isLight } = useTheme();

    const defautlProps: LucideProps = {
        size: 24,
        color: isLight ? "#18181b": "#ffffff",
        strokeWidth: 1,
        ...props
    }

    const svgString = renderToStaticMarkup(createElement(IconComponent, defautlProps));
    return `url(data:image/svg+xml;base64,${btoa(svgString)})`;
}
