import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { UserLog, User } from "../../shared/interfaces";
import { AuthService } from "../shared/services/auth.service";
import { Router } from "@angular/router";
import { ApiService } from "../../shared/api.service";
import { AlertService } from "../shared/services/alert.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  usersData: User[] = []

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private api: ApiService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    })
    this.getAllUsers()
  }

  getAllUsers() {
    this.api.getUserList().subscribe(data => {
      this.usersData = data
      console.log("UsersData1: ", this.usersData)
    })
  }

  submit() {
    console.log(this.form)
    if (this.form.invalid) {
      return
    }

    const user: UserLog = {
      UserEmail: this.form.value.email,
      UserPassword: this.form.value.password,
      UserName: '',
      UserRole: ''
    }

    this.auth.login(user).then((response) => {
      if (response == 'admin') {
        this.form.reset()
        this.router.navigate(['/admin', 'dashboard'])
      }
      else if (response == 'user' || response == 'moder') {
        this.form.reset()
        this.router.navigate(['/admin/user/dashboard'])
      }
      else {
        this.form.reset()
        this.alert.warning('Введены неверные данные')
      }
    })

  }

  ngOnDestroy(): void {
    location.reload()
  }
}
