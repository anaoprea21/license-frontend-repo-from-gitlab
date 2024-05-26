import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRatingsComponent } from './user-ratings/user-ratings.component';

const routes: Routes = [{ path: '', component: UserRatingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRatingsRoutingModule {}
