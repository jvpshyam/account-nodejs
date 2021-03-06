import {ViewChild} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {App, Platform} from 'ionic-angular';

import {WelcomePage} from './pages/welcome/welcome';
import {PropertyListPage} from './pages/property-list/property-list';
import {BrokerListPage} from './pages/broker-list/broker-list';
import {FavoriteListPage} from './pages/favorite-list/favorite-list';
import {PropertyService} from './services/property-service';
import {BrokerService} from './services/broker-service';

import {ProductService} from './services/product-service';
import {ProductListPage} from './pages/product-list/product-list';

import {AccountService} from './services/account-service';
import {AccountListPage} from './pages/account-list/account-list';

import {OrderService} from './services/order-service';
import {OrderListPage} from './pages/order-list/order-list';

@App({
    templateUrl: 'build/app.html',
    config: {
        mode: "ios"
    },
    queries: {
        nav: new ViewChild('content')
    },
    providers: [HTTP_PROVIDERS, PropertyService, BrokerService, ProductService, AccountService, OrderService]
})
class MyApp {

    static get parameters() {
        return [[Platform]];
    }

    constructor(platform) {

        this.platform = platform;

        this.pages = [
            {title: 'Welcome', component: WelcomePage, icon: "bookmark"},
            //{title: 'Properties', component: PropertyListPage, icon: "home"},
            //{title: 'Brokers', component: BrokerListPage, icon: "people"},
            //{title: 'Favorites', component: FavoriteListPage, icon: "star"},
            {title: 'Account', component: AccountListPage, icon: "star"},
            {title: 'Product', component: ProductListPage, icon: "star"},
            {title: 'Order', component: OrderListPage, icon: "star"}
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
