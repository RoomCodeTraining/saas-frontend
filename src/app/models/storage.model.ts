import { S3 } from "./s3.model";
import { Ftp } from "./ftp.model";
import { Sftp } from "./sftp.model";
import { Webhook } from "./webhook.model";

export class Storage {
    driver!:string;
    s3! : S3;
    ftp! : Ftp;
    sftp! : Sftp;
    webhook! : Webhook;
}