import Injectable from "./injectable";

@Injectable()
export default class StorageService {
    public get(key: string) {
        return window.localStorage.getItem(key);
    }

    public set(key: string, value: any) {
        let converted = value;
        if ('object' === typeof value) {
            converted = JSON.stringify(value);
        }
        return window.localStorage.setItem(key, converted);
    }

    public update(key: string, value: any) {
        this.set(key, value);
    }

    public delete(key: string, value: any) {
        this.set(key, value);
    }
}