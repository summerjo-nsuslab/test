// 의존성 주입이 될 객체들을 생성자 함수로 만들어서 배열에 저장
import { Service } from "../models/interface";

export default class ServiceContainer {
    private static instances = new Map<string, any>();
    private static _: Service = {};

    public static provider(services: Array<any>) {
        services.forEach(service => {
            ServiceContainer.getInstance(service);
        })
    }
    public static getInstance<T>(service: new(args?: any) => T, ...args) {
        const instance = new service(...args);
        const serviceName = instance.constructor.name;

        if (ServiceContainer.instances.has(serviceName)) {
            return ServiceContainer.instances.get(serviceName);
        }

        ServiceContainer.instances.set(serviceName, instance);
        const key = serviceName.charAt(0).toLowerCase() + serviceName.slice(1);
        ServiceContainer._[key] = instance;

        return instance;
    }

    public static getAll() {
        return this._;
    }
}