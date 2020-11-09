import {OnInit} from '@angular/core';
import {Page, NavController} from 'ionic-angular';
import {ProductDetailsPage} from '../product-details/product-details';
import {ProductService} from '../../services/product-service';

@Page({
    templateUrl: 'build/pages/product-list/product-list.html'
})
export class ProductListPage {

    static get parameters() {
        return [[NavController], [ProductService]];
    }

    constructor(nav, productService) {
        this.nav = nav;
        this.productService = productService;
    }

    ngOnInit() {
        this.productService.findAll().subscribe(products => this.products = products);
    }

    itemTapped(event, product) {
        this.nav.push(ProductDetailsPage, {
            product: product
        });
    }

}