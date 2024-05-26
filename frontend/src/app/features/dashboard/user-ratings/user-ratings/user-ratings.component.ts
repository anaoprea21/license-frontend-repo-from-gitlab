import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from 'src/app/core/api/user.service';
import { NotifText } from 'src/app/shared/enums/notif.text';
import { UserRatingsDTO } from 'src/app/shared/interfaces/DTOs/UserRatingsDTO';

@Component({
  selector: 'app-user-ratings',
  templateUrl: './user-ratings.component.html',
  styleUrls: ['./user-ratings.component.scss'],
})
export class UserRatingsComponent implements OnInit {
  userRatings!: UserRatingsDTO[];

  userName!: string | null;

  libraryBooks: { uuid: string; title: string }[] = [];
  isVisible = false;

  constructor(
    private userService: UserService,
    private notification: NzNotificationService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userName = params.get('userName');
      this.getUserRatings();
    });
  }

  getUserRatings() {
    this.userService.getUserRatings(this.userName ? this.userName : 'ana').subscribe({
      next: (res) => {
        this.userRatings = res.response;
      },
      error: (err) => {
        console.error(err);
        const message =
        Object.entries(NotifText).find(([key, val]) => {
          key === err.error.messsage;
          return val;
        })?.[1] ?? err.error.message;
      this.notification.create('error', 'Error', message);
      },
    });
  }

  openAddRatingModal() {
    this.userService.getLibraryBooksNames().subscribe({
      next: (res) => {
        this.libraryBooks = res.response;
        this.isVisible = true;
      },
      error: (err) => {
        this.isVisible = true;
      },
    });
  }
}
