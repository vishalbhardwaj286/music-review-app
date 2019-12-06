import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-playlist-dialog',
  templateUrl: './edit-playlist-dialog.component.html',
  styleUrls: ['./edit-playlist-dialog.component.css']
})
export class EditPlaylistDialogComponent implements OnInit {

  editPlaylistForm: FormGroup;
  description:string;
  selectedOptionToEdit:string;
  playlistDescription:string;
  optionSelected = new FormControl();

  constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<EditPlaylistDialogComponent>,
        @Inject(MAT_DIALOG_DATA) data) {

        this.description = data.description;
    }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.editPlaylistForm.value);
  }

}
