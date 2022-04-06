import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Keyboard, KeyboardResize } from '@capacitor/keyboard';
import { IonModal, Platform } from '@ionic/angular';

const API_KEY = '';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {

  @ViewChild(IonModal) modal: IonModal;

  mapSrc = this.sanitizer.bypassSecurityTrustResourceUrl(
    `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=Space+Needle,Seattle+WA`
  );

  constructor(private platform: Platform, private sanitizer: DomSanitizer) { }

  get hasApiKey() {
    return API_KEY !== '';
  }

  ngOnInit(): void {
    if (this.platform.is('capacitor')) {
      Keyboard.setResizeMode({
        mode: KeyboardResize.None
      });
      Keyboard.setAccessoryBarVisible({ isVisible: true });
    }
  }

  ngOnDestroy(): void {
    if (this.platform.is('capacitor')) {
      Keyboard.setResizeMode({
        mode: KeyboardResize.Ionic
      });
    }
  }

  onSearchbarFocused() {
    // When the search bar is focused, set the modal breakpoint to 1
    this.modal.setCurrentBreakpoint(1);
  }

}
