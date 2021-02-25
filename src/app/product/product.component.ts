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
  searchProductForm!: FormGroup;
  id!: number;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
    this.searchProductForm = new FormGroup({
      productId: new FormControl()
    });
  }

  ngOnInit(): void {
    this.id = 0;
    this.productService.getProductList(0).subscribe( data => {
      this.listPrd = data;
    });
  }

  hapus(idd: bigint) {
    console.log(idd);
    this.productService.deleteProductById(idd).subscribe( newData => {
      console.log(newData);
      alert('Delete Data ProductID ' + idd + ' Berhasil!');
      this.listPrd = newData;
    });
  }

  cari() {
    this.id = this.searchProductForm?.controls.productId.value;
    console.log("Cari data producId:" + this.id);
    if (this.id != null) {
      this.productService.getProductList(this.id).subscribe( dataCari => {
        this.listPrd = dataCari;
      });
    } else {
      this.ngOnInit();
    }
  }

}
