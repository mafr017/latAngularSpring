import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Products } from './products';


@Injectable()
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  addProduct(products: Products, isEdit: boolean):  Observable<any> {
    let url = 'saveproductjson';
    if (isEdit) {
      url = 'saveproductjson';
    }
    return this.httpClient.post(environment.baseUrl + url, products);
  }

  getProductList(): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'listproductjson/')
    .pipe(map( data => data as Products[] ));
  }

  getProductById(id: bigint): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'dataproductjson/' + id)
    .pipe(map( data => data ));
  }

  deleteProductById(id: bigint): Observable<any> {
    return this.httpClient.get(environment.baseUrl + 'deleteproductjson/' + id)
    .pipe(map( data => data ));
  }
}
