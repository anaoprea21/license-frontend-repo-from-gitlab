import { Component } from '@angular/core';
import { StorageHelper } from './core/helpers/storage.helper';
import { ColorThemeService } from './core/helpers/color.theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';
  constructor(private colorThemeService: ColorThemeService) {}

  ngOnInit(): void {
    if (StorageHelper.getTheme())
      this.setTheme('default', StorageHelper.getTheme());
    else this.setTheme('default', 'default');

    this.colorThemeService.$theme.subscribe({
      next: (res) => {
        this.setTheme(this.colorThemeService.getTheme(), res);
      },
    });
  }

  private setTheme(oldTheme: string, newTheme: string) {
    const body = document.getElementsByTagName('body')[0];

    body.classList.remove(oldTheme);
    body.classList.add(newTheme);
    this.colorThemeService.setTheme(newTheme);

    StorageHelper.setTheme(newTheme);
  }
}
