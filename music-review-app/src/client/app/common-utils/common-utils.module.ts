/*
  This module takes care of all the neccessary modules which are needed by the application
  to render several angular material components.
  The modules then are exported to several modules which are importing this module
*/

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
import {TextFieldModule} from '@angular/cdk/text-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



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
    MatDialogModule,
    TextFieldModule,
    NgbModule

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
    MatDialogModule,
    TextFieldModule,
    NgbModule
  ]
})
export class CommonUtilsModule { }
