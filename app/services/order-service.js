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
        startDate: order.order_start_date__c,
        endDate: order.order_end_date__c
    };
    prettyOrder.account = order.account__c_sfid ?
        {
            id: order.account__c_sfid,
            name: order.account__c_name,
            accountNumber: order.account__c_accountnumber,
            firstName: order.account__c_firstname
        } : {};
    return prettyOrder;
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

    delete(order) {
        return this.http.delete('/order/' + order.id);
    }

    updateOrder(order) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/order/' + order.id, JSON.stringify({ 'name': order.name+1 }), {headers: headers});
    }

}