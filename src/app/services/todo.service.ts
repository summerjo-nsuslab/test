import TodoRepositoryService from "./todo-repository.service";
import { TodoItem } from "../models/interface";
import Injectable from "../core/injectable";

@Injectable([TodoRepositoryService])
export default class TodoService {
    public constructor(
        private todoRepository: TodoRepositoryService
    ) {
    }

    public async getList() {
        const list = await this.todoRepository.getList();

        if(!list) return [];

        list.map(item => {item.modify = false;});
        return list;
    }

    public async update(item: Array<TodoItem>) {
        await this.todoRepository.update(item);
    }

    public async delete(item: Array<TodoItem>) {
        await this.todoRepository.delete(item);
    }
}