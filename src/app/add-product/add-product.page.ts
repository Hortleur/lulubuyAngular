/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../home/product.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {

  public product: FormGroup;

  constructor(private productServices: ProductService, private router: Router) { }

  ngOnInit() {
    this.product = new FormGroup({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      BarCode: new FormControl(),
      product_stock: new FormControl(),
      product_price: new FormControl(),
      product_model: new FormControl(),
      product_brand: new FormControl()
    });
  }

  onSubmit(){
    this.productServices.addProduct(this.product.value).subscribe(product => {
      console.log(product);
    });
  }
}
