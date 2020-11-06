import {OnInit} from '@angular/core';
import {Page, NavController} from 'ionic-angular';
import {OrderProductDetailsPage} from '../orderproduct-details/orderproduct-details';
import {OrderProductService} from '../../services/orderProduct-service';

@Page({
    templateUrl: 'build/pages/orderproduct-list/orderproduct-list.html'
})
export class OrderProductListPage {

    static get parameters() {
        return [[NavController], [OrderProductService]];
    }

    constructor(nav, orderProductService) {
        this.nav = nav;
        this.orderProductService = orderProductService;
    }

    ngOnInit() {
        this.orderProductService.findAll().subscribe(orderProducts => this.orderProducts = orderProducts);
    }

    itemTapped(event, orderProducts) {
        this.nav.push(OrderProductDetailsPage, {
            orderProducts: orderProducts
        });
    }

}