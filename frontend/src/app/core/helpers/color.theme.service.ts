import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorThemeService {
  private currentTheme: string = 'default';
  private theme = new Subject<string>();

  $theme = this.theme.asObservable();

  constructor() {}

  switchTheme(theme: string) {
    this.theme.next(theme);
  }

  getTheme(): string {
    return this.currentTheme;
  }

  setTheme(theme: string) {
    this.currentTheme = theme;
  }
}