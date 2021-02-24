import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './product/add-product/add-product.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: 'listproduct', component: ProductComponent },
  { path: 'addproduct', component: AddProductComponent },
  { path: 'addproduct/:id', component: AddProductComponent },
  { path: 'deleteproduct/:id', component: ProductComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
