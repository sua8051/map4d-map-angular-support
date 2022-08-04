import { Component } from '@angular/core';

import { products } from '../products';

//bypass for typescript
declare var map4d: any

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products = products;

  options1 = {
    zoom: 18,
    center: {lat: 16.069201, lng: 108.218110}
  }
  
  options2 = {
    zoom: 15,
    center: {lat: 16.068046, lng: 108.192189}
  }

  id = "map1"

  ngOnInit(){
    console.log('product list ngOnChanges')
    setTimeout(() => {
      console.log('Change map id will re-create map')
      this.id = "map11111"
      this.options1 =  {
        zoom: 10,
        center: {lat: 16.072163491469226, lng: 108.22690536081757}
      }      
    }, 5000)
  }

  onMapReady(data: {map: any, id: string}){
    console.log(`map with id = (${data.id}) is ready`)
    console.log(data)
    //https://docs.map4d.vn/map4d-map/web/v2.4/#/guides/marker
    // Tạo đối tượng marker từ MarkerOption
    let awindow: any = window
    let marker = new map4d.Marker({
      position: {lat: 16.068046, lng: 108.192189},
      label: 'Demo marker'
    })
  
    // Thêm marker vào bản đồ
    marker.setMap(data.map)
    console.log(marker)
  }

  share() {
    window.alert('The product has been shared!');
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/