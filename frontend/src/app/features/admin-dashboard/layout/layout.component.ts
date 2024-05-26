import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageHelper } from 'src/app/core/helpers/storage.helper';
import { BookType } from 'src/app/shared/enums/BookType';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isCollapsed: boolean = false;

  bookType?: BookType | null;

  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService
    ) {}

  ngOnInit(): void {}

  logOut(): void {
    if (StorageHelper.getAccessToken()) {
      this.socialAuthService.signOut(true);
      StorageHelper.clearStorage();
      this.router.navigateByUrl('/auth/login');
    }
  }
}
