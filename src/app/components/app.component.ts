import Component from "../core/component";
import InputComponent from "./input.component";
import ListComponent from "./list.component";
import ComponentFactory from "../core/component-factory";

export default class AppComponent extends Component {
    public constructor() {
        super('todoWrap');
    }

    public setTemplate() {
        this.setElement(`<div><h1>TO DO LIST</h1><section id="todoHead"></section><section id="todoBody"></section></div>`);
    }

    public async setChildren() {
        await ComponentFactory.get(InputComponent);
        await ComponentFactory.get(ListComponent);
    }
}