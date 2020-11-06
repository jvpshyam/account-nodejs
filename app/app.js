import {ViewChild} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {App, Platform} from 'ionic-angular';

import {WelcomePage} from './pages/welcome/welcome';
import {OrderListPage} from './pages/order-list/order-list';
import {AccountListPage} from './pages/account-list/account-list';
import {OrderService} from './services/order-service';
import {AccountService} from './services/account-service';

@App({
    templateUrl: 'build/app.html',
    config: {
        mode: "ios"
    },
    queries: {
        nav: new ViewChild('content')
    },
    providers: [HTTP_PROVIDERS, OrderService, AccountService]
})
class MyApp {

    static get parameters() {
        return [[Platform]];
    }

    constructor(platform) {

        this.platform = platform;

        this.pages = [
            {title: 'Welcome', component: WelcomePage, icon: "bookmark"},
            {title: 'Orders', component: OrderListPage, icon: "home"},
            {title: 'Accounts', component: AccountListPage, icon: "people"}
        ];

        this.rootPage = WelcomePage;
        this.initializeApp();
    }

    initializeApp() {
        
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    }

}
