import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
// tslint:disable-next-line:import-spacing
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { User } from '../models/user';
// tslint:disable-next-line:import-spacing
import { AuthService } from  '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder ) { }

  ngOnInit() {}

  login(form) {
    console.log(form.value);
    this.authService.signIn(form.value).subscribe((res) => {
      console.log('Logged in!');
      this.router.navigateByUrl('home');
    });
  }
}
