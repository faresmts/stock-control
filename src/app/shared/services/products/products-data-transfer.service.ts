import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransferService {

  public productsDataEmmiter$ = new BehaviorSubject<Array<GetAllProductsResponse | null>>([]);

  public productsData: Array<GetAllProductsResponse | null> = [];

  setProductsData(products: Array<GetAllProductsResponse>): void {
    if (products) {
      this.productsDataEmmiter$.next(products);
      this.getProductsData();
    }
  }

  getProductsData() {
    this.productsDataEmmiter$
      .pipe(
        take(1),
        map((data) => data.filter((product) => product ? product?.amount > 0 : null))
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.productsData = response;
          }
        }
      })

      return this.productsData;
  }



}
