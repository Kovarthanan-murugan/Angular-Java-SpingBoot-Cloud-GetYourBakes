import { Injectable } from '@angular/core';

import { CartItems } from '../interfaces/cart-items';

import { BakesData } from '../bakes';

import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CartservicesService {
  constructor(private http: HttpClient) {}

  bakesData: BakesData | undefined;
  url = 'http://localhost:8080/cart';
  cartItemsList: CartItems[] = [];
  grandTotal: number = 0;


  async getAllCartDataService(): Promise<CartItems[]> {
    // const data = await fetch('http://localhost:8080/cart/getcartitem');
    // const constructredJson ={
    //   "email":"kovarthan4"
    // }
    // await this.http
    // .post<any>('http://localhost:8080/cart/getcartitem', constructredJson)
    // .subscribe({
    //   next: (data) => {
    // this.cartItemsList = data.items;
    // this.grandTotal = data.totalPrice;
    //     console.log('post successful',data);
    //   },
    //   error: (error) => {
    //     console.error('There was an error!', error);
    //   },
    // });

    // return this.cartItemsList ?? [];
    // // return this.cartItemsList;


    ////


    const constructredJson = {
      "email": localStorage.getItem("currentUser")
    }
  
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      const response = await this.http
        .post<any>('https://getyourbakes-irzzq65cdq-nn.a.run.app/cart/getcartitem', constructredJson,{headers})
        .toPromise();
  
      this.cartItemsList = response.items;
      this.grandTotal = response.totalPrice;
  
      console.log('post successful', response);
  
      return this.cartItemsList ?? [];
    } catch (error) {
      console.error('There was an error!', error);
      throw error;
    }
  }

  async getAllCartDataServiceForCart(): Promise<any> {

    const constructredJson = {
      "email": localStorage.getItem("currentUser")
    }
  
    try {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      const response = await this.http
        .post<any>('https://getyourbakes-irzzq65cdq-nn.a.run.app/cart/getcartitem', constructredJson,{headers})
        .toPromise();
   
      console.log('post successfulsssss', response);
  
      return response;
    } catch (error) {
      console.error('There was an error!', error);
      throw error;
    }
    
    // const data = await fetch('http://localhost:8080/cart/getcartitem');
    // const jsonData = await data.json();
    // return jsonData;
  }

  async getTotalAmount(): Promise<number> {
    return this.grandTotal;
  }

  async postSomeData(cartData: BakesData | undefined) {
    let addCartJson = {};
    this.getAllCartDataServiceForCart().then((jsonData: any) => {
      if (cartData != undefined) {
        addCartJson = {
          category: cartData.category,
          imageLink: cartData.imagelink,
          itemName: cartData.itemname,
          quantity: 1,
          price: Number(cartData.price),
          itemTotal: Number(cartData.price),
        };
      }

      const constructredJson = {
        email: jsonData.email,
        items: [...jsonData.items, addCartJson],
        totalPrice: jsonData.totalPrice,
      };

      console.log("json",jsonData);

      console.log('constructed', constructredJson);
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      this.http
        .post<any>('https://getyourbakes-irzzq65cdq-nn.a.run.app/cart/addcartitem', constructredJson,{headers})
        .subscribe({
          next: (data) => {
            console.log('post successful');
          },
          error: (error) => {
            console.error('There was an error!', error);
          },
        });
    });
  }
}
