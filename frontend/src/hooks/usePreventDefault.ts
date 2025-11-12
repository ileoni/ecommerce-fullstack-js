import type { ChangeEvent, DragEvent } from "react";

export const usePreventDefault = () => {
    const preventDefault = <T extends unknown>(event: DragEvent<T>) => event.preventDefault();

    const preventDefaultWithCallback = <T extends unknown>(callback: (event: DragEvent<T> | ChangeEvent<T>) => void) => {
        return (event: DragEvent<T>) => {
            event.preventDefault()
            if(callback) callback(event);
        }
    }

    return {
        preventDefault,
        preventDefaultWithCallback
    }
}