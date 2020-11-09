import {OnInit} from '@angular/core';
import {Page, NavController, NavParams, Alert, ActionSheet} from 'ionic-angular';
import {ProductService} from '../../services/product-service';


@Page({
    templateUrl: 'build/pages/product-details/product-details.html'
})
export class ProductDetailsPage {

    static get parameters() {
        return [[NavController], [NavParams], [ProductService]];
    }

    constructor(nav, navParams, productService) {
        this.nav = nav;
        this.productService = productService;
        this.product = navParams.get('product');
    }

    ngOnInit() {
        this.productService.findById(this.product.id).subscribe(product => this.product = product);
    }
}