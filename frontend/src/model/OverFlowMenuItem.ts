export default interface OverFlowMenuItem {
    label: string;
    path?: string;
    callBack?: (bookId: string)=> void;
}