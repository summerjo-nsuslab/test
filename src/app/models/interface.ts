interface Service {
    [name: string]: any;
}

interface TodoItem {
    title: string;
    status: string;
    modify: boolean;
}

interface SummerConfig {
    component: any;
    provider: Array<any>;
}

export { Service, TodoItem, SummerConfig };