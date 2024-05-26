import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookCarouselComponent } from './components/book-carousel/book-carousel.component';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { BookManagerModalComponent } from '../features/admin-dashboard/book-manager-modal/book-manager-modal.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { BookCardComponent } from './components/book-card/book-card.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzSliderModule } from 'ng-zorro-antd/slider';

@NgModule({
  declarations: [
    BookCarouselComponent,
    BookManagerModalComponent,
    BookCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzNotificationModule,
    NzCardModule,
    NzDropDownModule,
    NzCarouselModule,
    NzCalendarModule,
    NzPopoverModule,
    NzDrawerModule,
    NzRateModule,
    NzTableModule,
    NzModalModule,
    NzSelectModule,
    NzCollapseModule,
    NzToolTipModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzBadgeModule,
    NzAutocompleteModule,
    NzPaginationModule,
    NzCheckboxModule,
    NzBackTopModule,
    NzSliderModule,
  ],
  exports: [
    BookManagerModalComponent,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzNotificationModule,
    NzCardModule,
    NzDropDownModule,
    BookCarouselComponent,
    NzCarouselModule,
    NzCalendarModule,
    NzPopoverModule,
    NzDrawerModule,
    NzRateModule,
    NzTableModule,
    NzModalModule,
    NzSelectModule,
    NzCollapseModule,
    NzToolTipModule,
    NzDatePickerModule,
    NzTimePickerModule,
    BookCardComponent,
    NzBadgeModule,
    NzAutocompleteModule,
    NzPaginationModule,
    NzCheckboxModule,
    NzBackTopModule,
    NzSliderModule,
  ],
})
export class SharedModule {}
