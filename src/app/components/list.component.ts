import Component from "../core/component";
import ItemComponent from "./item.component";
import { Service, TodoItem } from "../models/interface";
import ComponentFactory from "../core/component-factory";
import StateService from "../core/state.service";
import TodoService from "../services/todo.service";

export default class ListComponent extends Component {
    private list: Array<TodoItem>;
    private stateService: StateService;
    private todoService: TodoService;

    public constructor (private service: Service) {
        super('todoBody');
        this.stateService = this.service.stateService;
        this.todoService = this.service.todoService;
    }

    public async onInit() {
        this.list = await this.todoService.getList();
        this.stateService.setState(this.list);
        this.stateService.subscribe(this.onStateChanged);
    }

    public setTemplate() {
        this.setElement(`<ul id="todoList"></ul>`);
    }

    public setChildren() {
        this.list.forEach(async item => {
            const itemComponent = await ComponentFactory.get(ItemComponent);
            itemComponent.item = item;
            itemComponent.render();
        });
    }

    public async setEventHandler() {
        const main: HTMLElement= document.getElementById('todoWrap');
        const todoList: HTMLElement = document.getElementById('todoList');

        todoList.addEventListener('click', e => {
            const $e = e.target as HTMLElement;
            const getElementIndex = () => {
                return [].indexOf.call(document.querySelectorAll('#todoList li'), $e.parentElement);
            };

            switch ($e.dataset.element) {
                case 'btnDelete': {
                    this.deleteItem(getElementIndex());
                    break;
                }
                case 'btnModify': {
                    this.modifyItem($e, getElementIndex());
                    break;
                }
                case 'checkbox': {
                    this.checkedItem($e as HTMLInputElement, getElementIndex());
                    break;
                }
            }
        });

        main.addEventListener('focusout', e => {
            const $e = e.target as HTMLInputElement;

            if($e.dataset.element != 'itemTitle') return;

            const btnModify: HTMLInputElement = $e.parentElement.querySelector('[data-element=btnModify]');
            const getElementIndex = () => {
                return [].indexOf.call(document.querySelectorAll('#todoList li'), $e.parentElement);
            };
            const modifyAble = this.list[getElementIndex()]['modify'];

            if(modifyAble){
                this.list[getElementIndex()]['modify'] = false;
                btnModify.dataset.elementStatus = "true";
            }
        });
    }

    private async deleteItem(index: number) {
        this.list.splice(index, 1);
        await this.todoService.delete(this.list);
        this.stateService.setState(this.list);
    }

    private async modifyItem(elem: HTMLElement, index: number) {
        const modifyAble = this.list[index]['modify'];
        const itemTitle: HTMLInputElement = elem.parentElement.querySelector('[data-element=itemTitle]');

        if(!modifyAble && elem.dataset.elementStatus == "false"){
            this.list[index]['modify'] = true;
        }else{
            if(!itemTitle.value) return alert('내용을 입력해주세요!');
            this.list[index]['title'] = itemTitle.value;
            this.list[index]['modify'] = false;
            await this.todoService.update(this.list);
        }
        this.stateService.setState(this.list);
    }

    private async checkedItem(elem: HTMLInputElement, index: number) {
        this.list[index]['status'] = (elem.checked) ? 'checked' : '';
        await this.todoService.update(this.list);
        this.stateService.setState(this.list);
    }

    private onStateChanged = async (state) => {
        this.list = state;
        this.render();
        await this.setChildren();
    }
}