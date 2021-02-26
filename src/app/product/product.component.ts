import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  id!: string;
  searchStr = "";

  constructor(private productService: ProductService, private route: ActivatedRoute,
    private router: Router) {
    this.searchProductForm = new FormGroup({
      productName: new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.productService.getProductList('').subscribe( data => {
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
    this.id = this.searchProductForm?.controls.productName.value;
    console.log("Cari data productName:" + this.id);
    if (this.id) {
      this.productService.getProductList(this.id).subscribe( dataCari => {
        this.listPrd = dataCari;
        console.log("Cari data productName:" + this.id);
      });
    } else {
      this.ngOnInit();
    }
  }

}
