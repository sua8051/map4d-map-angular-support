import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'map4d-map',
  template: '',
  styles: [':host {width: 100%; height: 100%; display: block;}']
})

export class Map4dMapComponent implements AfterViewInit {
  @Input('options') options: any = {}
  @Input('mapId') mapId: string = ""
  @Input('id') id: string = "default"
  @Input('version') version: string = ""
  @Input('accessKey') accessKey: string = "__YOUR_KEY__"

  @Output() onMapReady = new EventEmitter<any>();

  private scriptElement: any = null
  private mapRef: any = null
  private mapCallback: any = ""

  constructor(private _elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.loadMapScript()
  }

  ngOnInit() {
    this.createCallback()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.scriptElement == null) {
      return;
    }
    let shouldReload = false
    for (const propName in changes) {
      const change = changes[propName];      
      if (!(propName == 'mapId'
        || propName == 'id'
        || propName == 'version'
        || propName == 'accessKey')) {
        continue
      }      
      if (change.currentValue != change.previousValue) {
        shouldReload = true;
        break
      }
    }
    if (!shouldReload) {
      return
    }
    let oldScriptElement = this.scriptElement;
    let oldCallback = this.mapCallback
    let oldMapRef = this.mapRef
    this.destroy(oldCallback, oldScriptElement, oldMapRef)
    this.createCallback()
    this.loadMapScript();
  }

  private createCallback() {
    let anyWindow: any = window
    this.mapCallback = `callback_${this.id}`
    anyWindow[this.mapCallback] = () => {
      let dom = this._elementRef.nativeElement
      this.mapRef = new anyWindow.map4d.Map(dom, this.options)
      this.onMapReady.emit({map: this.mapRef, id: this.id})
    }
  }

  private loadMapScript() {
    let url = `https://api.map4d.vn/sdk/map/js?version=${this.version}&key=${this.accessKey}&callback=${this.mapCallback}`
    if (this.mapId != null && this.mapId != "") {
      url += `&mapId=${this.mapId}`
    }
    let element = this.addLibrary(url, this.id)
    if (element) {
      this.scriptElement = element
    }
  }

  ngOnDestroy() {
    this.destroy(this.mapCallback, this.scriptElement, this.mapRef)
  }

  private destroy(callback: any, scriptElement: HTMLScriptElement, mapRef: any){
    delete window[callback]
    if (scriptElement != null) {
      scriptElement.remove()
    }
    mapRef && mapRef.destroy()
  }

  addLibrary(url: string, id: string) {
    let scriptId = `script_${id}`
    let exist = document.getElementById(scriptId)
    if (exist) {
      return null
    }
    const script = document.createElement('script')
    script.src = url;
    script.defer = true;
    script.id = scriptId
    document.body.appendChild(script)
    return script
  }
}