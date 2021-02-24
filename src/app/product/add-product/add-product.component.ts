import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../products';
import { ProductService } from './../product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  providers: [ProductService]
})
export class AddProductComponent implements OnInit {

  productForm!: FormGroup;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
    this.productForm = new FormGroup({
      productId: new FormControl(null, [Validators.required]),
      productName: new FormControl(null, [Validators.required]),
      supplierId: new FormControl(null, [Validators.required]),
      categoryId: new FormControl(null, [Validators.required]),
      quantityperUnit: new FormControl(null, [Validators.required]),
      unitPrice: new FormControl(null, [Validators.required]),
      unitsInStock: new FormControl(null, [Validators.required]),
      unitsOnOrder: new FormControl(null, [Validators.required]),
      reorderLevel: new FormControl(null, [Validators.required]),
      discontinued: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  simpan() {
    if (this.productForm?.valid) {
      const products = new Products();
      products.productId = this.productForm?.controls.productId.value;
      products.productName = this.productForm?.controls.productName.value;
      products.supplierId = this.productForm?.controls.supplierId.value;
      products.categoryId = this.productForm?.controls.categoryId.value;
      products.quantityperUnit = this.productForm?.controls.quantityperUnit.value;
      products.unitPrice = this.productForm?.controls.unitPrice.value;
      products.unitsInStock = this.productForm?.controls.unitsInStock.value;
      products.unitsOnOrder = this.productForm?.controls.unitsOnOrder.value;
      products.reorderLevel = this.productForm?.controls.reorderLevel.value;
      products.discontinued = this.productForm?.controls.discontinued.value;
      console.log(products);
      this.productService.addProduct(products, false).subscribe(
        hasil => {
          console.log(hasil);
          alert("Simpan Berhasil!");
          this.router.navigateByUrl('/listproduct');
        }, error => {
          console.log(error);
          alert("Simpan Gagal!");
        }
      );
    } else {
      alert("Wajib diisi!");
    }
  }

}
