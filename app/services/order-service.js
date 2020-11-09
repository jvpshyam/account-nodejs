import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/Rx';

/*
    Prettify objects returned from Salesforce. This is optional, but it allows us to keep the templates independent
    from the Salesforce specific naming convention. This could also be done Salesforce-side by creating a custom REST service.
 */
let prettifyOrder = (order) => {
    let prettyOrder = {
        id: order.sfid,
        orderid: order.order_id__c,
        name: order.name,
        amount: order.order_amount__c,
        currency: order.currency_code__c,
        startDate: order.order_start_date__c,
        endDate: order.order_end_date__c
    };
    prettyOrder.account = order.account__c_sfid ?
        {
            id: order.account__c_sfid,
            name: order.account__c_name,
            number: order.account__c_accountnumber
        } : {};
    return prettifyOrder;
};


@Injectable()
export class OrderService {

    static get parameters() {
        return [Http];
    }

    constructor(http) {
        this.http = http;
    }

    findAll() {
        return this.http.get('/order').map(response => response.json().map(prettifyOrder));
    }

    findById(id) {
        return this.http.get('/order/' + id).map(response => prettifyOrder(response.json()));
    }

}