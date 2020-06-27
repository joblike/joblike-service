import { MetadaModel } from "./metada.model";

export interface ResponseModel {

    meta: MetadaModel;
    data?: any;
    error?: any;

}
