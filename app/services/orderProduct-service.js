import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';

/*
    Prettify objects returned from Salesforce. This is optional, but it allows us to keep the templates independent
    from the Salesforce specific naming convention. This could also be done Salesforce-side by creating a custom REST service.
 */
let prettifyOrderProduct = (orderProduct) => {
    let prettyOrderProduct = {
        id: orderProduct.sfid,
        name: orderProduct.name,
        unitPrice: orderProduct.unit_price__c,
        quantity: orderProduct.quantity__c,
        listPrice: orderProuct.list_price__c
    };
    prettyOrderProduct.order = orderAccount.order__c_sfid ?
        {
            id: orderAccount.order__c_sfid,
            name: orderAccount.order__c_name,
            amount: orderAccount.order__c_order_amount__c,
            currency: orderAccount.order__c_currency_code__c
        }
    prettyOrderProduct.product = orderAccount.product__c_sfid ?
        {
            id: orderAccount.product__c_sfid,
            name: orderAccount.product__c_name,
            description: orderAccount.product__c_description,
            model: orderAccount.product__c_model__c,
            productcode: orderAccount.product__c_productcode
        } : {};
    return prettifyOrderProduct;
};


@Injectable()
export class OrderProductService {

    static get parameters() {
        return [Http];
    }

    constructor(http) {
        this.http = http;
    }

    findAll() {
        return this.http.get('/orderproduct').map(response => response.json().map(prettifyOrderProduct));
    }

    findById(id) {
        return this.http.get('/orderproduct/' + id).map(response => prettifyOrderProduct(response.json()));
    }

}