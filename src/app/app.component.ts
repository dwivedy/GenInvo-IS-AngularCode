import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ShopService } from './services/shop.service';
import { ShopModel } from './models/shopModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demoGenInvoAngular';
  shopList: any;
  done: boolean = false;

  shopGroup = new FormGroup({
    shopName: new FormControl(''),
    category: new FormControl(''),
    address: new FormControl(''),
    ownerName: new FormControl('')
  });


  constructor(private shopService: ShopService) { }
  ngOnInit() {

    this.getShopList();
  }

  onSubmit() {
    this.done = false;
    console.log(this.shopGroup.get('address').value);

    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ "address": this.shopGroup.get('address').value }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        // do something with the geocoded result
        let lat = results[0].geometry.location.lat();
        let longt = results[0].geometry.location.lng();

        let shopModel: ShopModel = {
          shopName: this.shopGroup.get('shopName').value,
          category: this.shopGroup.get('category').value,
          lat: lat,
          longt: longt,
          ownerName: this.shopGroup.get('ownerName').value,

        };
        console.log(shopModel);
        this.shopService.createShop(shopModel).subscribe((res) => {
          // console.log(res);


          this.getShopList();

        });

      } else {

        this.shopGroup.patchValue({
          address: "Address not found"

        });

      }
    });
  }


  getShopList() {

    this.shopService.getShopsList().subscribe((results) => {
      this.shopList = results;
      this.done = true;
    });

  }



}
