import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookManagerComponent } from './book-manager/book-manager.component';

const routes: Routes = [{ path: '', component: BookManagerComponent,  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookManagerRoutingModule {}
