import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BakesData } from '../bakes';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  template: `
    <section class="listing">
      <img
        class="listing-photo"
        [src]="bakesData.imagelink"
        alt="Exterior photo of {{ bakesData.itemname }}"
      />
      <h2 class="listing-heading">{{ bakesData.itemname }}</h2>
      <p class="listing-price">
        Price: {{ bakesData.price | currency : 'CAD' }}
      </p>

      <a [routerLink]="['/details', bakesData.number]">Buy Now</a>
    </section>
  `,
  styleUrls: ['./items-render.component.css'],
})
export class HousingLocationComponent {
  @Input() bakesData!: BakesData;
}
