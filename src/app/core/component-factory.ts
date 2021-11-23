//ServiceContainer 에서 저장한 객체들을 의존성 주입하여 생성자 함수 생성 및 라이프사이클 정의

import Component from "./component";
import { Service } from "../models/interface";
import ServiceContainer from "./service-container";

export default class ComponentFactory {
    public static async get<T extends Component>(component: new(service?: Service) => T) {
        const services = ServiceContainer.getAll();
        const instance = new component(services);

        await instance.onInit();
        instance.render();
        instance.setChildren();

        return instance;
    }
}