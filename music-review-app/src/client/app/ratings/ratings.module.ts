import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingDialogComponent } from './rating-dialog/rating-dialog.component';
import { CommonUtilsModule } from './../common-utils/common-utils.module';

/*
  Ratings module contains all the declarations of the components and the modules 
  neccessary for rendering rating compoent.
*/

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
