import {Injectable,inject} from '@angular/core';
import {BakesData} from './bakes'

@Injectable({
    providedIn:'root'
})


export class BakesDataService{
    
    // url = 'http://localhost:8080/items/getitemsfromdatabase';
    url = 'https://getyourbakes-irzzq65cdq-nn.a.run.app/items/getitemsfromdatabase';
    
    bakesServiceDataList: BakesData[] =[];
    // bakesServiceDataList: BakesData[] = 

    // [
    //     {
    //         number: 3,
    //         itemname: 'Apple-Cheese Danish',
    //         imagelink: 'https://www.bhg.com/thmb/rkQ9r8hkVFx16EZGFVs_hB_JgvI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/apple-cheese-danish-R163775-0c8d9e4b8c4545ca9e385c3ab968d7cb.jpg',
    //         price: 20,
    //         description: 'Layers of light and flaky puff pastry sheets, spiced apple slices, and cream cheese fill this Danish pastry recipe. Save yourself some prep time and skip a step by substituting canned apple pie filling for the spiced apples.',
    //         category: 'bakes'
    //     },
    //     {
    //         number: 2,
    //         itemname: 'Potato Cinnamon Rolls',
    //         imagelink: 'https://www.bhg.com/thmb/ve1U4g4RJYrLtQIalVQa790ZYmk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/RU202956-2e46d543e8da45f08886c62546ed606d.jpg',
    //         price: 16,
    //         description: 'Were letting you in on the secret ingredient to the most fluffy, delicious cinnamon rolls youll ever taste—potatoes. Thats right, this top-rated recipe from our Test Kitchen uses mashed potatoes to achieve the ultimate soft, pillowy rolls you know and love.',
    //         category: 'bakes'
    //     },
    //     {
    //         number: 4,
    //         itemname: 'Almond and Vanilla Bean Scones',
    //         imagelink: 'https://www.bhg.com/thmb/vq_yPs94b1HzMXnPYKW_ZnSvzYg=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/almond-vanilla-bean-scones-RU351021-6e79d735b6064566a36fbdef3197fc72.jpg',
    //         price: 13,
    //         description: 'These rich, moist scones get their incredible flavor from almond extract and vanilla-bean paste. To ease cutting the pastry dough, cover it with plastic wrap and freeze for 20 minutes before slicing. You can also freeze the dough up to two months for delicious homemade pastries at a moments notice.',
    //         category: 'bakes'
    //     },
    //     {
    //         number: 1,
    //         'itemname': 'Blueberry-Cream Cheese Pastries',
    //         'imagelink': 'https://www.bhg.com/thmb/jSLCoV-S2qwsFOQmFXSkRfM5bTU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/RU193823-416cfedca8f6401ea956959b7746b51c.jpg',
    //         price: 10,
    //         'description': 'These flaky breakfast pastries are full of your favorite bite-size berries. Give them a spread made with cream cheese, vanilla, and lemon juice for a sweet-tart kickoff to the day.',
    //         'category': 'bakes'
    //     },
    //     {
    //         number: 5,
    //         itemname: 'Cream Cheese Danishes',
    //         imagelink: 'https://www.bhg.com/thmb/XWObozwoMooZcNuuhOlqh-8aBd8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/RU333730-691bd5ecf5034312b855190511aa6411.jpg',
    //         price: 25,
    //         description: 'The key to creating a flaky pastry, like this classic Danish, is all about the puff pastry. Luckily, the frozen version at your grocery store is delicious, and definitely worth buying as a shortcut. Top this easy breakfast recipe with your favorite fruit preserves.',
    //         category: 'bakes'
    //     }
    // ]
    
    // getAllBakesDataService(): BakesData[]{
    //     return this.bakesServiceDataList;
    // }

    // getBakesDataServiceById(id: number): BakesData | undefined{
    //     return this.bakesServiceDataList.find(BakesData => BakesData.number === id)
    // }



    async getBakesDataServiceById(id: number): Promise<BakesData | undefined> {
        const data = await fetch(this.url);
        console.log('kova',this.bakesServiceDataList);
        this.bakesServiceDataList = await data.json() ?? [];
        console.log('kova1',this.bakesServiceDataList);
        return this.bakesServiceDataList.find(BakesData => BakesData.number == id) ;
      }

    async getAllBakesDataService(): Promise<BakesData[]> {
        const data = await fetch(this.url);
        return await data.json() ?? [];
      }

}