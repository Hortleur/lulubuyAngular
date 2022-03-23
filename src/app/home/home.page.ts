import { ProductService } from './product.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  Component, OnInit, ViewChild
} from '@angular/core';
import { Product } from './product.model';





@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  products: any = [];
  pics: any = [];
  baseUrl = 'http://localhost:8000/api';

  constructor(private productServices: ProductService) {}
  ngOnInit(): any {
   this.getProd();
   this.getPic();
  }

  getProd(){
    this.productServices.getProducts()
      .subscribe(res => {
        this.products = res;
      });
  }
  getPic(){
    this.productServices.getPics()
    .subscribe(res => {
      this.pics = res;
    });
  }
}



