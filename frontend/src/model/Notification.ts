export default interface Notification{
    notificationId?:string;
    message:string;
    status?:string;
    stateStatus?:string;
    senderUserId:string;
    receiverUserId:string;
    createdDate?: string;
    createdBy?: string;
    updatedDate?: string;
    updatedBy?: string;
}