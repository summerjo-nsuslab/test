import StorageService from "../core/storage.service";
import { TodoItem } from "../models/interface";
import Injectable from "../core/injectable";

@Injectable([StorageService])
export default class TodoRepositoryService {
    public constructor(
        private storageService: StorageService
    ) {
    }

    public getList() {
        return new Promise<Array<TodoItem>>(resolve => {
            window.setTimeout(() => {
                const list = JSON.parse(this.storageService.get('localList')) as Array<TodoItem>;
                resolve(list);
            }, 500);
        });
    }

    public update(item: Array<TodoItem>) {
        return new Promise<void>(resolve => {
            window.setTimeout(() => {
                this.storageService.update('localList', item);
                resolve();
            });
        });
    }

    public delete(item: Array<TodoItem>) {
        return new Promise<void>(resolve => {
            window.setTimeout(() => {
                this.storageService.delete('localList', item);
                resolve();
            });
        });
    }
}