import { Injectable, inject } from '@angular/core';
import { BakesData } from './bakes';

@Injectable({
  providedIn: 'root',
})
export class BakesDataService {
  url =
    'https://getyourbakes-irzzq65cdq-nn.a.run.app/items/getitemsfromdatabase';

  bakesServiceDataList: BakesData[] = [];

  async getBakesDataServiceById(id: number): Promise<BakesData | undefined> {
    const data = await fetch(this.url);
    console.log('kova', this.bakesServiceDataList);
    this.bakesServiceDataList = (await data.json()) ?? [];
    console.log('kova1', this.bakesServiceDataList);
    return this.bakesServiceDataList.find(
      (BakesData) => BakesData.number == id
    );
  }

  async getAllBakesDataService(): Promise<BakesData[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }
}
