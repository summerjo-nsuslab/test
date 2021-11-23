import { SummerConfig } from "../models/interface";
import ServiceContainer from "./service-container";
import ComponentFactory from "./component-factory";
import StateService from "./state.service";
import StorageService from "./storage.service";

export default class SummerCore {
    private config: SummerConfig;

    public constructor() {
        ServiceContainer.provider([
            StateService,
            StorageService
        ]);
    }

    private async start() {
        await ComponentFactory.get(this.config.component);
    }

    public async bootstrap(config: SummerConfig) {
        this.config = config;
        ServiceContainer.provider(this.config.provider);
        await this.start();
    }
}