import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  userName: string | null

  constructor(
    private router: Router,
    public auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    if (localStorage.getItem('token-name')) {
      this.userName = localStorage.getItem('token-name')
    }
    else {
      this.userName = null
    }
  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/admin', 'login'])
  }
}
