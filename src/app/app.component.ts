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
    token: '',
    clientApiEndpointUrl: '',
    videoName: ''
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
