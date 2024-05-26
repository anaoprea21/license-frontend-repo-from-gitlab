import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListMainComponent } from './book-list-main/book-list-main.component';

const routes: Routes = [{ path: '', component: BookListMainComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookListRoutingModule {}
