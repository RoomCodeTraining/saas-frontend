import { Email } from "./email.model";
import { EmailVariable } from "./email-variable.model";
export class Notification {
    id?:number;
    link_id!:number;
    link_id_1!:number;
    link_id_2!:number;
    email!:string;
    password!:string;
    entity_name!:string;
    entity_email!:string;
    reason!:string;
    broker_email!:string;
    broker_name!:string;
    company_email!:string;
    company_name!:string;
    reference!:string;
    date!:Date;
    type!:string;
    quantity!:string;
    download_link!:string;
    emails! : Array<Email>;
    BNICB_emails! : Array<Email>;

    recipient!:string;
    subject!:string;
    template!:string;
    variables!:any;

}