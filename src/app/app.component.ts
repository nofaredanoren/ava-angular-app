import { AfterViewInit, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'ava-angular-app';

  @ViewChild('avaPlayer', { static: false }) private avaPlayer;
  @ViewChild('avaPlayerDrawer', { static: false }) private avaPlayerDrawer;
  @ViewChild('zoneDrawer', { static: false }) private zoneDrawer;

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
    // this.zoneDrawer.nativeElement.width = this.videoWidth;
    this.avaPlayer.nativeElement.width=this.videoWidth;
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

    this.avaPlayerDrawer.nativeElement.configure({
      ...this.widgetConfig,
      debug: true,
      playerControllers: [
        'rewind',
        'play_pause',
        'fast_forward',
        'mute',
        'volume',
        'spacer',
        'next_day',
        'previous_day',
        'hours_label'
      ]
    });
    this.avaPlayerDrawer.nativeElement.load();

    // Configure zone draw
    this.zoneDrawer.nativeElement.configure({
      debug: true
    });



    this.zoneDrawer.nativeElement.load();
  }
}
