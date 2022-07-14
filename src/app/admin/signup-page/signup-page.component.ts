import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {User, UserLog} from "../../shared/interfaces";
import {Router} from "@angular/router";
import {ApiService} from "../../shared/api.service";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {

  form: FormGroup
  res: UserLog[]

  constructor(
    private formBuilder: FormBuilder,
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
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }


  async submit() {
    if (this.form.invalid) {
      return
    }

    const userData: User = {
      UserEmail: this.form.value.email,
      UserName: this.form.value.name,
      UserPassword: this.form.value.password,
      UserRole: 'user'
    }

    this.res = await this.api.getUserByEmail(userData).toPromise()
    if (!this.res[0].UserEmail) {
      console.log('Registrable')
      this.api.postUser(userData).subscribe()
      this.alert.success('Регистрация прошла успешно')
      this.router.navigate(['/admin', 'login'])
    }
    else {
      console.log('Error: Email exist')
      this.alert.warning('Пользователь с таким Email-адресом уже зарегистрирован')
    }
  }
}
