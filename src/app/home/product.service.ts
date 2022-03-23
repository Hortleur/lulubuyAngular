/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
  HttpClient, HttpParams, HttpHeaders, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Product } from './product.model';

const httpOptions = {
  headers: new HttpHeaders({
    'x-api-key': '4b42ba01-7f28-4184-9fb6-0b888dc2a83f'
  })
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = 'http://localhost:8000/api';
  picUrl= 'https://api.thecatapi.com/v1/images/search';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl+'/product')
      .pipe(
        catchError(this.handleError)
      );
  };

  getOneProd(id: number): Observable<Product[]>{

    return this.http.get<Product[]>(this.baseUrl+'/product/'+id)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteProduct(id: number): Observable<Product[]>{
    return this.http.delete<Product[]>(this.baseUrl+'/product/'+id)
    .pipe(
      catchError(this.handleError)
    );
  }

  addProduct(product: Product): Observable<Product[]>{
    return this.http.post<Product[]>(this.baseUrl+'/product', product).pipe(
      catchError(
        this.handleError
      )
    );
  }

  updateProduct(product: Product, id: number): Observable<Product[]>{
    return this.http.put<Product[]>(this.baseUrl+`/product/${id}`, product)
    .pipe(
      catchError(
        this.handleError
      )
    );
  }

  getPics(){
    return this.http.get(this.picUrl, httpOptions)
    .pipe(
      catchError(
        this.handleError
      )
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
