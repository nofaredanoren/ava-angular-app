import { AfterViewInit, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'ava-angular-app';

  @ViewChild('avaPlayer', { static: false }) private avaPlayer;

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
