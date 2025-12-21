export class SidebarSelectionEvent extends CustomEvent {
    constructor({href}){
        super('SidebarSelectionEvent', {href});
    }
}