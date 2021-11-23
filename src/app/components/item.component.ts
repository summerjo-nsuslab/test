import Component from "../core/component";
import { TodoItem } from "../models/interface";

export default class ItemComponent extends Component {
    private _item: TodoItem;

    public set item(item: TodoItem) {
        this._item = item;
    }

    public constructor() {
        super('todoList');
        this.resetInnerHtml = false;
    }

    public setTemplate() {
        if (!this._item) return;

        this.setElement(`<li><input type="checkbox" data-element="checkbox" ${this._item.status}><input type="text" value="${this._item.title}" data-element="itemTitle" ${this._item.modify ? '' : 'disabled'}><button data-element="btnModify" data-element-status="false">${this._item.modify ? '확인' : '수정'}</button><button data-element="btnDelete">삭제</button></li>`);
    }

    public setEventHandler() {
        if (!this._item || !this._item.modify) return;

        const itemTitle = this.element.querySelector('[data-element=itemTitle]') as HTMLInputElement;
        itemTitle.focus();
    }
}