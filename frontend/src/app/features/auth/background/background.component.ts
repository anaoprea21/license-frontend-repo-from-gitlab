import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/api/auth.service';

@Component({
  selector: 'app-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss'],
})
export class BackgroundComponent implements OnInit {
  token!: number;
  userEmail?: string;
  userPassword?: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  // googleLogin() {
  //   this.authService.googleLogin(3).subscribe({
  //     next: (res) => {
  //       this.token = res;
  //     },
  //     error: (err) => {
  //       console.error(err);
  //     },
  //   });
  // }
}
