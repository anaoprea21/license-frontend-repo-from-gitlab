import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRatingsRoutingModule } from './user-ratings-routing.module';
import { UserRatingsComponent } from './user-ratings/user-ratings.component';
import { RatingsListComponent } from './ratings-list/ratings-list.component';
import { AddRatingModalComponent } from './add-rating-modal/add-rating-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    UserRatingsComponent,
    RatingsListComponent,
    AddRatingModalComponent,
  ],
  imports: [CommonModule, UserRatingsRoutingModule, SharedModule],
})
export class UserRatingsModule {}
