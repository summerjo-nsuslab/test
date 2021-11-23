import { TodoItem } from "../models/interface";
import Injectable from "./injectable";

@Injectable()
export default class StateService {
    public state: Array<TodoItem>;
    private callbacks: Array<Function>;

    public constructor() {
        this.callbacks = [];
        this.state = [];
    }

    public setState(state: Array<TodoItem>) {
        this.state = state;
        this.callbacks.forEach(callback => {
            callback(this.state);
        });
    }

    public subscribe(callback: Function) {
        this.callbacks.push(callback);
    }
}