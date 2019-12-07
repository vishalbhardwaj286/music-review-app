import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-song-to-playlist-dialog',
  templateUrl: './add-song-to-playlist-dialog.component.html',
  styleUrls: ['./add-song-to-playlist-dialog.component.css']
})
export class AddSongToPlaylistDialogComponent implements OnInit {
  addNewSongToPlaylistForm:FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddSongToPlaylistDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    console.log('Save Caled');
  }


}
