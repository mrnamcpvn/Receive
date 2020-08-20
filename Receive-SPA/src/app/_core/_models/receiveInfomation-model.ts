export interface ReceiveInfomationModel {
    id: string; 
    userID: string;
    accept_ID: string; 
    depID: number;
    productID: string;
    productName: string;
    qty: number;
    register_Date: Date; 
    accept_Date: Date; 
    status: string;
    updated_By: string;
    updated_Time: Date; 
}