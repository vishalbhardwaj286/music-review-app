import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule,FormsModule  } from '@angular/forms';
import {MatInputModule} from '@angular/material';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { StarRatingComponent } from 'ng-starrating';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [StarRatingComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatRadioModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatListModule,
    MatExpansionModule,
    NgxMatSelectSearchModule ,
    Ng2SearchPipeModule   

  ],
  exports: [
    MatCheckboxModule,
    MatFormFieldModule,
    MatRadioModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatListModule,
    MatExpansionModule,
    NgxMatSelectSearchModule,
    Ng2SearchPipeModule,
    StarRatingComponent
  ]
})
export class CommonUtilsModule { }
