import { AfterViewInit, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'ava-angular-app';

  @ViewChild('rvxWidget', { static: false }) private RVXWidget;

  public videoWidth = '';
  public videoHeight = '';

  public apiBase = '';
  public accessToken = '';

  public widgetConfig  = {
    token: '',
    accountId: 'fe1bfcde-2787-4621-b20c-a70fc4b53464',
    longRegionCode: 'mint1',
    videoName: 'rodrigb-camera006'
  };
  constructor() {

  }

  ngAfterViewInit(): void {
    this.RVXWidget.nativeElement.addEventListener('TOKEN_EXPIRED', () => {
      console.log('token expired');
    });
    this.RVXWidget.nativeElement.configure(this.widgetConfig);
  }

  public setAPIBase() {
    const rvx  = this.RVXWidget.nativeElement;
    rvx.apiBase = this.apiBase;
  }

  public setAccessToken() {
    const rvx  = this.RVXWidget.nativeElement;
    this.widgetConfig.token = this.accessToken;
    rvx.setAccessToken(this.accessToken);
  }

  public render() {
    this.RVXWidget.nativeElement.configure(this.widgetConfig);
    this.RVXWidget.nativeElement.render();
  }
}
