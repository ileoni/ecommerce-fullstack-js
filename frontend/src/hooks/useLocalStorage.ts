export const useLocalStorage = (key: string) => {
    const appName = import.meta.env.VITE_APP_NAME;
    const _key = `${appName}-${key}`;

    const get = () => {
        return localStorage.getItem(_key);
    }
    
    const add = (value: string) => {
        localStorage.setItem(_key, value);
    }
    
    return {
        get, add
    }
}