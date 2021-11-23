import ServiceContainer from "./service-container";

export default function Injectable(args?: Array<any>) {
    return function<T extends { new (...args: any[]): {} }>(typeClass: T) {
        const argInstances = [];

        if (args) {
            args.forEach(arg => argInstances.push(ServiceContainer.getInstance(arg)));
        }
        ServiceContainer.getInstance(typeClass, ...argInstances);
    }
}