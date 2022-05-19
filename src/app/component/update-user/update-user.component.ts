import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { YoutubeRepository } from 'src/app/services/youtube-repository';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  //   styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit{
  userForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<UpdateUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User, private youtubeRepo: YoutubeRepository) {
    console.log(data);
  }

  ngOnInit(): void {
    const name = this.data ? this.data.name : null;
    const email = this.data ? this.data.email : null;

    this.userForm = new FormGroup({
      email: new FormControl(email, [Validators.required]),
      name: new FormControl(name, [Validators.required])
    })
  }

  addOrUpdateUser() {
    if(this.data){
      this.updateUser()
    } else {
      this.addUser();
    }
  }

  addUser() {
    this.youtubeRepo.addUser(this.userForm.value);
    this.dialogRef.close();    
  }

  updateUser() {
    const updatedUser = {...this.data, ...this.userForm.value};
    this.youtubeRepo.updateUser(updatedUser);
    this.dialogRef.close();    
  }
}
