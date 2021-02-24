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

  id!: bigint;
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
    this.route.params.subscribe(rute => {
      this.id = rute.id;
      console.log(" id " + this.id);
      if (this.id) {
        this.productService.getProductById(this.id).subscribe(hasil => {
          if (hasil) {
            this.productForm.get('productId')?.setValue(hasil.productId)
            this.productForm.get('productName')?.setValue(hasil.productName)
            this.productForm.get('supplierId')?.setValue(hasil.supplierId)
            this.productForm.get('categoryId')?.setValue(hasil.categoryId)
            this.productForm.get('quantityperUnit')?.setValue(hasil.quantityperUnit)
            this.productForm.get('unitPrice')?.setValue(hasil.unitPrice)
            this.productForm.get('unitsInStock')?.setValue(hasil.unitsInStock)
            this.productForm.get('unitsOnOrder')?.setValue(hasil.unitsOnOrder)
            this.productForm.get('reorderLevel')?.setValue(hasil.reorderLevel)
            this.productForm.get('discontinued')?.setValue(hasil.discontinued)
          }
        });
      }
    }
    );
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
