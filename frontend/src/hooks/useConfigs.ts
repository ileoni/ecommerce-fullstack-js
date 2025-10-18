import configs from "../configs";

export const useConfigs = (path: string) => {
    const keys = path.split(".");

    const recursive = (keys: string[], current: any) => {
        if(keys === undefined) return configs;

        const [first, ...rest] = keys;
        if(keys.length === 0) return current;
        return recursive(rest, current[first])
    }

    return recursive(keys, configs);
}