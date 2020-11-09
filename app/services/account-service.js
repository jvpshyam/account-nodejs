import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/Rx';

/*
 Prettify objects returned from Salesforce. This is optional, but it allows us to keep the templates independent
 from the Salesforce specific naming convention. This could also be done Salesforce-side by creating a custom REST service.
 */
let prettifyAccount = (account) => {
    return {
        id: account.sfid,
        name: account.name,
        accountNumber: account.accountnumber,
        firstName: account.firstname
    };
};

@Injectable()
export class AccountService {

    static get parameters() {
        return [Http];
    }

    constructor(http) {
        this.http = http;
    }

    findAll() {
        return this.http.get('/account').map(response => response.json().map(prettifyAccount));
    }

    findById(id) {
        return this.http.get('/account/' + id).map(response => prettifyAccount(response.json()));
    }

}