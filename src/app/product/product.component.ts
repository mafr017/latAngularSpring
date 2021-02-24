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

    this.route.params.subscribe(rute => {
      this.id = rute.id;
      console.log(" id " + this.id);
      if (this.id) {
        this.productService.deleteProductById(this.id);
        alert('Delete Data ProductID ' + this.id + ' Berhasil!');
        this.router.navigateByUrl('/listproduct');
      }
    });
  }

}
