export default abstract class Component {
    protected hostElement: HTMLElement;
    protected element: Element;
    protected resetInnerHtml: boolean;
    public abstract setTemplate();
    public onInit() {};
    public setEventHandler() {};
    public setChildren() {};

    protected constructor(hostElementId: string) {
        this.hostElement = document.getElementById(hostElementId);
        this.resetInnerHtml = true;
    }

    public render() {
        this.setTemplate();

        if (!this.hostElement || !this.element) {
            return;
        }

        if (this.resetInnerHtml) this.hostElement.innerHTML = '';

        this.hostElement.append(this.element);
        this.setEventHandler();
    }

    protected setElement(html: string) {
        const template = document.createElement('template');
        html = html.trim();
        template.innerHTML = html;
        this.element = template.content.firstElementChild;
    }
}