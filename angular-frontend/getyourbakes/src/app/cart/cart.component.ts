import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItems } from '../interfaces/cart-items';
import { CartservicesService } from '../cart-services/cartservices.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="row">
        <div class="col-md-8 cart">
          <div class="title">
            <div class="row">
              <div class="col">
                <h4><b>Shopping Cart</b></h4>
              </div>
              <div class="col align-self-center text-right text-muted">
                {{ getAllCartDataList.length }} items
              </div>
            </div>
          </div>
          <div
            class="row border-top border-bottom"
            *ngFor="let cartItem of getAllCartDataList"
          >
            <div class="row main align-items-center">
              <div class="col-2">
                <img class="img-fluid" src="{{ cartItem.imageLink }}" />
              </div>
              <div class="col">
                <div class="row text-muted">{{ cartItem.category }}</div>
                <div class="row">{{ cartItem.itemName }}</div>
              </div>
              <div class="col">
                <a >-</a
                ><a  class="border">{{ cartItem.quantity }}</a
                ><a >+</a>
              </div>
              <div class="col">
                {{ cartItem.itemTotal | currency : 'CAD' }}
              </div>
            </div>
          </div>

          <div class="back-to-shop">
            <a href="#">&leftarrow;</a
            ><span class="text-muted">Back to shop</span>
          </div>
        </div>
        <div class="col-md-4 summary">
          <div>
            <h5><b>Summary</b></h5>
          </div>
          <hr />
          <div class="row">
            <div class="col" style="padding-left:0;">
              ITEMS {{ getAllCartDataList.length }}
            </div>
            <div class="col text-right"></div>
          </div>
          <form>
            <p>SHIPPING</p>
            <select>
              <option class="text-muted">Standard-Delivery- &euro;5.00</option>
            </select>
            <p>Delivery Address</p>
            <input id="code" placeholder="Enter the Address" />
          </form>
          <div
            class="row"
            style="border-top: 1px solid rgba(0,0,0,.1); padding: 2vh 0;"
          >
            <div class="col">TOTAL PRICE</div>
            <div class="col text-right">
              {{ grandCartTotal | currency : 'CAD' }}
            </div>
          </div>
          <div *ngIf="orderStatus; else content">
          <div class="loading">
          <button   (click)="checkout()" class="btn">Cancel Order</button>
          <h1 id="orderCancel" >Order Placed Successfully</h1>
          </div>

        </div>
        <ng-template #content>
        <button  (click)="checkout()" class="btn">CHECKOUT</button>
        </ng-template>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  getAllCartDataList: CartItems[] = [];
  orderStatus: boolean = false;

  grandCartTotal: number = 0;
  getAllCartDataService: CartservicesService = inject(CartservicesService);

  // constructor() {
  //   this.bakesServiceDataList = this.bakesDataService.getAllBakesDataService();
  // }
  constructor() {
    this.getAllCartDataService
      .getAllCartDataService()
      .then((getAllCartDataList: CartItems[]) => {
        this.getAllCartDataList = getAllCartDataList;
      })
      .then(() =>
        this.getAllCartDataService
          .getTotalAmount()
          .then((grandTotal: number) => {
            this.grandCartTotal = grandTotal;
          })
      );
  }

  checkout(){
    this.orderStatus = !this.orderStatus;
  }
}
