import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './product.component.html',
  providers: [ProductService]
})

export class DeleteProductComponent implements OnInit {

  id!: bigint;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(rute => {
      this.id = rute.id;
      console.log("Mencoba id " + this.id);
      if (this.id) {
        this.productService.deleteProductById(this.id);
        alert('Delete Data ProductID ' + this.id + ' Berhasil!');
      }
    });
  }

}
