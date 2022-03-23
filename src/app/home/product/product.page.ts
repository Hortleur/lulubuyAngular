/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Product} from '../product.model';
import {
  HttpClient, HttpParams, HttpHeaders
} from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as JsBarcode from 'jsbarcode';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  product: any = {};
  baseUrl = 'http://localhost:8000/api';
  id: any;
  showForm = false;
  prodMessage= '';

  public prod: FormGroup;



  // eslint-disable-next-line max-len
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router, private productServices: ProductService) {}



  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(!paramMap.has('productId')){
        //redirect
        return;
      }
      this.id = paramMap.get('productId');
    });
    this.getProduct();
    this.prod = new FormGroup({
      product_model: new FormControl(
        this.product.product_model, [
          Validators.required
        ]
      ),
      product_brand: new FormControl(
        this.product.product_brand, [
          Validators.required
        ]
      ),
      BarCode: new FormControl(
        this.product.BarCode, [
          Validators.required
        ]
      ),
      product_stock: new FormControl(
        this.product.product_stock, [
          Validators.required
        ]
      ),
      product_price: new FormControl(
        this.product.product_price, [
          Validators.required
        ]
      )
    });
}
  getProduct(){
    this.productServices.getOneProd(this.id)
    .subscribe(data => {
      this.product = data;
      JsBarcode('#barCode', `${this.product.BarCode}`, {
        width: 1,
        height: 50,
        lineColor: '#47d0a2'
      });
    });
    }

    deleteProduct(){
      this.delete();
      this.goHome();
    }

    delete(){
      this.productServices.deleteProduct(this.id)
      .subscribe();
    }

    showEdit(){
      this.showForm = !this.showForm;
      this.getProduct();
    }

    goHome(){
      this.router.navigate(['/','home']);
    }

    onSubmit(){
      this.productServices.updateProduct(this.prod.value, this.id).subscribe(prod => {
        this.showEdit();
      });
    }

    getForm(): FormGroup{
      return this.prod;
    }
}
