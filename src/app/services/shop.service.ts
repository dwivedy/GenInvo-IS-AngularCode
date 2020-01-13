import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ShopModel } from '../models/shopModel';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  apiURL: string = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }


  getShopsList(){

    return this.http.get(`${this.apiURL}/shops`);

  }


  createShop(shopModel: ShopModel){
    return this.http.post(`${this.apiURL}/shop`, shopModel);
}
}
