import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BakesData } from '../bakes';
import { BakesDataService } from '../bakesdata.services';
import { CartservicesService } from '../cart-services/cartservices.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="bakesData?.imagelink"
        alt="Exterior photo of {{ bakesData?.itemname }}"
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ bakesData?.itemname }}</h2>
        <p class="listing-location">
          {{ bakesData?.description }}, {{ bakesData?.category }}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this Product</h2>
        <ul>
          <li>Category: {{ bakesData?.category }}</li>
          <li>Price: {{ bakesData?.price }}</li>
        </ul>
      </section>
      <button class="addCart" (click)="addToCart()">Add to Cart</button>
    </article>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  bakesDataService: BakesDataService = inject(BakesDataService);
  bakesData: BakesData | undefined;
  cartServicesService: CartservicesService = inject(CartservicesService);

  constructor( private router: Router) {
    const bakesDataNumber = Number(this.route.snapshot.params['id']);

    this.bakesDataService
      .getBakesDataServiceById(bakesDataNumber)
      .then((bakesData) => {
        this.bakesData = bakesData;
      });
  }

  addToCart() {
    const bakesDataNumber = Number(this.route.snapshot.params['id']);
    console.log('product added', this.bakesData);
    console.log(
      'postmethod',
      this.cartServicesService.postSomeData(this.bakesData)
    );
    this.router.navigate(['/cart']);
      }
}
