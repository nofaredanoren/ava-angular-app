import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements AfterViewInit {
  title = "ava-angular-app";

  @ViewChild("avaPlayer", { static: false }) private avaPlayer;
  @ViewChild("avaPlayerDrawer", { static: false }) private avaPlayerDrawer;
  @ViewChild("zoneDrawer", { static: false }) private zoneDrawer;

  public videoWidth = "700px";
  public videoHeight = "";

  public zoneDrawWidth = "700px";

  public apiBase = "";
  public accessToken = "";

  public theme = 'dark';

  public selectAllControllers = true;

  public allowedControllers = {
    rewind : true,
    play_pause : true,
    fast_forward : true,
    live : true,
    mute : true,
    volume : true,
    meta_data_layer : true,
    overflow_menu : true,
    fullscreen : true,
    next_day : true,
    previous_day: true,
    hours_label : true,
    next_segment : true,
    prev_segment : true,
    date_picker : true,
    camera_name : true,
    timestamp : true,
    timeline_zoom : true
  }

  public widgetConfig = {
    token: "",
    clientApiEndpointUrl: "",
    videoName: "",
    locale: 'en',
    playerControllers : undefined
  };

  public widgetConfigZoneDrawerPlayer = {
    token: "",
    clientApiEndpointUrl: "",
    videoName: "",
    locale: 'en'
  };

  constructor() {}

  ngAfterViewInit(): void {
    // this.zoneDrawer.nativeElement.width = this.videoWidth;
    this.avaPlayer.nativeElement.width = this.videoWidth;
    this.avaPlayer.nativeElement.addEventListener("TOKEN_EXPIRED", () => {
      console.log("token expired");
    });

  }

  public setAPIBase() {
    const rvx = this.avaPlayer.nativeElement;
    rvx.apiBase = this.apiBase;
  }

  public selectAllOfControllers() {
    for (const iterator of Object.keys(this.allowedControllers)) {
      this.allowedControllers[iterator] = this.selectAllControllers;
    }
  }

  public controllerChange() {
    this.selectAllControllers  = true;
    for (const iterator of Object.keys(this.allowedControllers)) {
      this.selectAllControllers = this.selectAllControllers && this.allowedControllers[iterator];
    }
  }

  public setAccessToken() {
    const player = this.avaPlayer.nativeElement;
    this.widgetConfig.token = this.accessToken;
    player.setAccessToken(this.accessToken);
  }

  public load() {
    // Configure allowed controllers
    if (!this.selectAllControllers) {
      this.widgetConfig.playerControllers = [];
      for (const iterator of Object.keys(this.allowedControllers)) {
        if (this.allowedControllers[iterator]) {
          this.widgetConfig.playerControllers.push(iterator);
        }
      }
    } else {
      this.widgetConfig.playerControllers = undefined;
    }
    this.avaPlayer.nativeElement.configure(this.widgetConfig);
    this.avaPlayer.nativeElement.load();
  }

  public loadZoneDrawer() {
    // Configure zone draw
    this.zoneDrawer.nativeElement.configure({
      debug: true,
      locale: this.widgetConfigZoneDrawerPlayer.locale
    });

    this.avaPlayerDrawer.nativeElement.configure({
      ...this.widgetConfigZoneDrawerPlayer,
      debug: true,
      playerControllers: [
        'rewind',
        'play_pause',
        'fast_forward',
        'live',
        'mute',
        'volume',
        'next_day',
        'previous_day',
        'hours_label',
        'overflow_menu',
        'date_picker',
        'camera_name',
        'timestamp',
        'timeline_zoom'
      ],
    });
    this.avaPlayerDrawer.nativeElement.load();

    this.zoneDrawer.nativeElement.load();
  }
}
