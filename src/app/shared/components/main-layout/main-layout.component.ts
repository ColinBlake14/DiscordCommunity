import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  userRole: string | null
  userName: string

  constructor() { }

  ngOnInit(): void {
    if (localStorage.getItem('token-name')) {
      this.userRole = localStorage.getItem('token-role')
      this.userName = localStorage.getItem('token-name')!
    }
    else {
      this.userRole = null
      this.userName = 'Login'
    }
  }

}
