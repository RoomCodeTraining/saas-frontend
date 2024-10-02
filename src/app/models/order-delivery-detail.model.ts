export class OrderDeliveryDetail {
    id?:number;
    orderdeliverymain_id!:number;
    reference!:string;
    reference_key!:string;
    status_value!:number;
    active_value!:number;
    entry_by!:number;
    entry_on!:Date;
    canceled_by!:number;
    canceled_on!:Date;
    attforbroker_ordermakingmainid!:number;
    attforbroker_entityfirmid!:number;
    attforbroker_userpeopleid!:number;
    attforbroker_entryby!:number;
    attforbroker_entryon!:number;
}