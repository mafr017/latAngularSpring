import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';
import { Products } from './products';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  providers: [ProductService]
})

export class ProductComponent implements OnInit {

  listPrd!: Products[];
  // searchProductForm!: FormGroup;
  id!: bigint;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
    // this.searchProductForm = new FormGroup({
      // productName: new FormControl()
    // });
  }

  ngOnInit(): void {
    this.productService.getProductList().subscribe( data => {
      this.listPrd = data;
    });
  }

  hapus(idd: bigint){
    console.log(idd);
    this.productService.deleteProductById(idd).subscribe( newdata => {
      console.log(newdata);
      alert('Delete Data ProductID ' + idd + ' Berhasil!');
      this.listPrd = newdata;
    });
  }

}
