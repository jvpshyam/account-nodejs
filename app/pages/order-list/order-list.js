import {OnInit} from '@angular/core';
import {Page, NavController} from 'ionic-angular';
import {OrderDetailsPage} from '../order-details/order-details';
import {OrderService} from '../../services/order-service';

@Page({
    templateUrl: 'build/pages/order-list/order-list.html'
})
export class OrderListPage {

    static get parameters() {
        return [[NavController], [OrderService]];
    }

    constructor(nav, orderService) {
        this.nav = nav;
        this.orderService = orderService;
    }

    ngOnInit() {
        this.orderService.findAll().subscribe(orders => this.orders = orders);
    }

    itemTapped(event, order) {
        this.nav.push(OrderDetailsPage, {
            order: order
        });
    }

}