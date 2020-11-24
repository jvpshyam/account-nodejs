import {OnInit} from '@angular/core';
import {Page, NavController, NavParams, Alert, ActionSheet} from 'ionic-angular';
//import {OrderDetailsPage} from '../order-details/order-details';
import {OrderService} from '../../services/order-service';


@Page({
    templateUrl: 'build/pages/order-details/order-details.html'
})
export class OrderDetailsPage {

    static get parameters() {
        return [[NavController], [NavParams], [OrderService]];
    }

    constructor(nav, navParams, orderService) {
        this.nav = nav;
        this.orderService = orderService;
        this.order = navParams.get('order');
    }

    ngOnInit() {
        this.orderService.findById(this.order.id).subscribe(order => this.order = order);
    }

    deleteOrder(event, order) {

        this.orderService.delete(order).subscribe(() => {
            let alert = Alert.create({
                title: 'Order',
                subTitle: 'Order deleting',
                buttons: ['OK']
            });
            this.nav.present(alert);
        });

    }

}