import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

/*
 Prettify objects returned from Salesforce. This is optional, but it allows us to keep the templates independent
 from the Salesforce specific naming convention. This could also be done Salesforce-side by creating a custom REST service.
 */
let prettifyProduct = (product) => {
    return {
        id: product.sfid,
        productid: product.id,
        name: product.name,
        description: product.description,
        model: product.model__c,
        detail: product.detail__c,
        price: product.price__c,
        priceFormatted: "$" + product.price__c.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        image: product.purl__c
    };
};

@Injectable()
export class ProductService {

    static get parameters() {
        return [Http];
    }

    constructor(http) {
        this.http = http;
    }

    findAll() {
        return this.http.get('/product').map(response => response.json().map(prettifyProduct));
    }

    findById(id) {
        return this.http.get('/product/' + id).map(response => prettifyProduct(response.json()));
    }

}