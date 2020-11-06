import {OnInit} from '@angular/core';
import {Page, NavController, NavParams, Alert, ActionSheet} from 'ionic-angular';
import {OrderProductDetailsPage} from '../orderproduct-details/orderproduct-details';
import {OrderProductService} from '../../services/orderProduct-service';


@Page({
    templateUrl: 'build/pages/orderproduct-details/orderproduct-details.html'
})
export class OrderProductDetailsPage {

    static get parameters() {
        return [[NavController], [NavParams], [OrderProductService]];
    }

    constructor(nav, navParams, orderProductService) {
        this.nav = nav;
        this.orderProductService = orderProductService;
        this.orderProduct = navParams.get('orderProduct');
    }

    ngOnInit() {
        this.orderProductService.findById(this.orderProduct.id).subscribe(orderProduct => this.orderProduct = orderProduct);
    }

}