import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';
import { Products } from './products';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  providers: [ProductService]
})

export class ProductComponent implements OnInit {

  listPrd!: Products[];
  searchProductForm!: FormGroup;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
    // this.searchProductForm = new FormGroup({
      // productName: new FormControl()
    // });
  }

  ngOnInit(): void {
    this.productService.getProductList().subscribe( data => {
      this.listPrd = data;
    })
  }

}
