import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'ava-angular-app';

  public videoWidth = '';
  public videoHeight = '';

  public apiBase = '';
  public RVXWidget;

  public widgetConfig  = {
    token: '',
    accountId: 'fe1bfcde-2787-4621-b20c-a70fc4b53464',
    longRegionCode: 'mint1',
    videoName: 'rodrigb-camera006'
  };
  constructor(private el: ElementRef) {

  }

  ngAfterViewInit(): void {
    this.RVXWidget =  document.createElement('rvx-widget');
    this.RVXWidget.addEventListener('TOKEN_EXPIRED', () => {
      console.log('token expired');
    });
    this.RVXWidget.configure(this.widgetConfig);
    this.el.nativeElement.appendChild(this.RVXWidget);
  }

  public setAPIBase() {
    const rvx  = this.RVXWidget;
    rvx.apiBase = this.apiBase;
  }

  public render() {
    this.RVXWidget.configure(this.widgetConfig);
    this.RVXWidget.render();
  }
}
