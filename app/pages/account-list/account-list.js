import {OnInit} from '@angular/core';
import {Page, NavController} from 'ionic-angular';
import {AccountDetailsPage} from '../account-details/account-details';
import {AccountService} from '../../services/account-service';

@Page({
    templateUrl: 'build/pages/account-list/account-list.html'
})
export class AccountListPage {

    static get parameters() {
        return [[NavController], [AccountService]];
    }

    constructor(nav, accountService) {
        this.nav = nav;
        this.accountService = accountService;
    }

    ngOnInit() {
        this.accountService.findAll().subscribe(accounts => this.accounts = accounts);
    }

    itemTapped(event, account) {
        this.nav.push(AccountDetailsPage, {
            account: account
        });
    }

}