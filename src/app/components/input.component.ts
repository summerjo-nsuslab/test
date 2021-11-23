import Component from "../core/component";
import { Service } from "../models/interface";

export default class InputComponent extends Component {
    public constructor(private service: Service) {
        super('todoHead');
    }

    public setTemplate() {
        this.setElement(`<div><input type="text" id="inputItem"><button id="btnRegister">등록</button></div>`);
    }

    public async setEventHandler() {
        const inputItem = document.getElementById('inputItem') as HTMLInputElement;
        const btnRegister: HTMLElement = document.getElementById('btnRegister');

        btnRegister.addEventListener('click', () => {
            this.registerItem(inputItem.value);
            inputItem.value = '';
        });
    }

    private async registerItem(value) {
        if (!value) return alert('내용을 입력해주세요!');

        const item = [...this.service.stateService.state, {title: value, status: '', modify: false}];
        await this.service.todoService.update(item);
        this.service.stateService.setState(item);
    }
}