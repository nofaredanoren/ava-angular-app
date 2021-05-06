import { AfterViewInit, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'ava-angular-app';

  @ViewChild('avaPlayer', { static: false }) private avaPlayer;

  public videoWidth = '700px';
  public videoHeight = '';

  public apiBase = '';
  public accessToken = '';

  public widgetConfig  = {
    token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFzemVmSnlHSWlTSGNWcWQ4Q041WVNGaGptOCIsIng1dCI6IjFzemVmSnlHSWlTSGNWcWQ4Q041WVNGaGptOCIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE2MTk2MzgyNzIsImV4cCI6MTY1MTE3NDI2OSwiaWF0IjoxNjE5NjM4MjcyLCJpc3MiOiJTYW1wbGVUb2tlblByb3ZpZGVyIiwiYXVkIjoidGVzdCJ9.gznXMKIqxoxH_I9Nf-JWwiwJ926joeJfysbVcUvEveJWDhSNCuods0ELUvjReQgKr150Pe1dTZYXYU6NKDM6A1UK3KWQW1vf7iUTmf8FfKgMyUvQq_BzlCfV79WRy4XK2vY49wIIw3XdxiXbJhoMiHaezt678-Fn7mzoG6aR1d_P8rIqGDinAY1-9ryvB4Aoq8mC7MP9ZHnDZ4Q_8dLEYmnuOK4R21kOHFkLa6D8wxAdrKPrRt7CtktlKiE-8WVhJKjIFW92PHIaYEx4I14L5D0AiCLfH4DFEsVVlST7vOLuNxcgRx_t0aw10EGmntHqW-UHOlCa8xuB4t25c_imvg',
    accountId: 'b43e0a4333ff49599b5f6c213b8626f2',
    longRegionCode: 'mint1',
    videoName: 'live-yolov3-tracker'
  };

  constructor() {

  }

  ngAfterViewInit(): void {
    this.avaPlayer.nativeElement.addEventListener('TOKEN_EXPIRED', () => {
      console.log('token expired');
    });
  }

  public setAPIBase() {
    const rvx  = this.avaPlayer.nativeElement;
    rvx.apiBase = this.apiBase;
  }

  public setAccessToken() {
    const player = this.avaPlayer.nativeElement;
    this.widgetConfig.token = this.accessToken;
    player.setAccessToken(this.accessToken);
  }

  public load() {
    this.avaPlayer.nativeElement.configure(this.widgetConfig);
    this.avaPlayer.nativeElement.load();
  }
}
