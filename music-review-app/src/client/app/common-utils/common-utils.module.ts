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
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';



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
    Ng2SearchPipeModule,
    SplitterModule,
    MatAutocompleteModule,
    MatTableModule,
    MatDialogModule

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
    StarRatingComponent,
    SplitterModule,
    MatAutocompleteModule,
    MatTableModule,
    MatDialogModule
  ]
})
export class CommonUtilsModule { }
