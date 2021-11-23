import "../style.scss";
import SummerCore from "./core/summer-core";
import AppComponent from "./components/app.component";
import TodoService from "./services/todo.service";
import TodoRepositoryService from "./services/todo-repository.service";

(async () => {
    const app = new SummerCore();
    await app.bootstrap({
        component: AppComponent,
        provider: [
            TodoService,
            TodoRepositoryService
        ]
    });
})();