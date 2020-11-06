import {OnInit} from '@angular/core';
import {Page, NavController, NavParams} from 'ionic-angular';
import {AccountService} from '../../services/account-service';

@Page({
    templateUrl: 'build/pages/account-details/account-details.html'
})
export class AccountDetailsPage {

    static get parameters() {
        return [[NavController], [NavParams], [AccountService]];
    }

    constructor(nav, navParams, accountService) {
        this.accountService = accountService;
        this.account = navParams.get('account');
    }

    ngOnInit() {
        this.accountService.findById(this.account.id).subscribe(account => this.account = account);
    }

}
