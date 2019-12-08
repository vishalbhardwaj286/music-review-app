import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingDialogComponent } from './rating-dialog/rating-dialog.component';
import { CommonUtilsModule } from './../common-utils/common-utils.module';


@NgModule({
  declarations: [RatingDialogComponent],
  imports: [
  CommonModule,
  CommonUtilsModule
  ],
  exports: [
    CommonUtilsModule
  ],
  entryComponents:[]
})
export class RatingsModule { }
