# Map4d Map AngularJS Support

[Map4D Map Javascript SDKs Documents⚡️](https://docs.map4d.vn/map4d-map/web/)

## How to use
1. Copy `map4d-map.component.ts` to your projects
2. Places code below to your template of your component, where you want map to show
```html
<map4d-map 
[options]="__options__" 
id="__id__"
version="__version__"
accessKey="__your_key___"
(onMapReady)="onMapReady($event)"
></map4d-map>
```

3. Inside your component, add the method `onMapReady`

```Javascript
onMapReady(data: {map: any, id: string}){
    console.log(`map with id = (${data.id}) is ready`)
    console.log(data)
    //https://docs.map4d.vn/map4d-map/web/v2.4/#/guides/marker
    // Tạo đối tượng marker từ MarkerOption    
    let marker = new map4d.Marker({
      position: {lat: 16.068046, lng: 108.192189},
      label: 'Demo marker'
    })
  
    // Thêm marker vào bản đồ
    marker.setMap(data.map)
    console.log(marker)
  }
```

Now you can interact to map via `data.map` with `id` is `data.id` from `onMapReady`

[More docs here](https://docs.map4d.vn/map4d-map/web/)

## Notice
1. The `id` of map4d-map component must be unique
2. When use with `Typescript`, to bypass type checking just add `declare var map4d: any` to your source