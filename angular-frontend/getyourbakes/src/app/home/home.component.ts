import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { BakesData } from '../bakes';
import { BakesDataService } from '../bakesdata.services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <div>
      <div *ngIf="loading; else content">
        <div class="loading-container">
          <div class="loading">
            <img
              id="loading-gif"
              src="assets/bakes1.gif"
              alt="Exterior photo of"
            />
            <div class="loading-text">
              <h1>
                Baking
                <span class="dot-one"> .</span>
                <span class="dot-two"> .</span>
                <span class="dot-three"> .</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <ng-template #content>
        <div class="landing-page">
          <img
            id="landing-page-logo"
            src="assets/Getyourbakes.png"
            alt="Exterior photo of"
          />

          <div class=" aside aside-1 landing-section-left">
            <img
              id="landing-page-img"
              src="assets/landingpage_1.jpg"
              alt="Exterior photo of"
            />
          </div>

          <div class="aside aside-2 landing-section-right">
            <div id="right-content">
              <h1>SPECIALTY DESSERTS FOR ANY OCCASION</h1>
              We offer delectable desserts for any celebration, special
              occasion, or corporate event. Options include layer cakes,
              cheesecakes, cupcakes, and more! Please allow a minimum of 48
              hours for preparation of your order.
            </div>
          </div>
          <div class="restbody">
          <div class="scroll-container">
            <div class="scroll-content">
              BRINGING YOU THE MOST DELECTABLE DESSERTS SINCE 2017
            </div>
          </div>
          <div id="products-heading">
            <h1>SHOP WITH US</h1>
            <p>
              Planning for your upcoming party, celebration, office function or
              family event? Make it a delectable experience! We have delicacies
              for every occasion, ranging from traditional classics like
              cheesecake, to trendy treats like our build your own buttercream
              cakes.
            </p>
          </div>
          <section class="results">
            <app-housing-location
              *ngFor="let bakesData of bakesServiceDataList"
              [bakesData]="bakesData"
            >
            </app-housing-location>
          </section>
        </div>
        </div>
      </ng-template>
    </div>
  `,
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  loading = true;
  bakesServiceDataList: BakesData[] = [];
  bakesDataService: BakesDataService = inject(BakesDataService);

  // constructor() {
  //   this.bakesServiceDataList = this.bakesDataService.getAllBakesDataService();
  // }
  constructor() {
    this.bakesDataService
      .getAllBakesDataService()
      .then((bakesServiceDataList: BakesData[]) => {
        this.bakesServiceDataList = bakesServiceDataList;
        setTimeout(() => {
          this.loading = false;
        }, 2000);
      });
  }
}

// <form>
// <input type="text" placeholder="Filter by city">
// <button class="primary" type="button">Search</button>
// </form>
