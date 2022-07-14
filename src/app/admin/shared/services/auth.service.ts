import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserLog } from "../../../shared/interfaces";

@Injectable()
export class AuthService {

  readonly APIUrl = "http://localhost:5000/api"
  expiresIn: string = '3600'
  res: UserLog[]

  constructor(private http: HttpClient) {}

  get token(): string {
    const expDate = new Date(localStorage.getItem('token-exp')!)
    if (new Date() > expDate) {
      this.logout()
      return ''
    }
    return localStorage.getItem('token')!
  }

  async login(user: UserLog):Promise<string> {
    let isLog: string
    this.res = await this.http.post<UserLog[]>(this.APIUrl + '/user/GetUserByLogin', user).toPromise()
    if (this.res[0].UserEmail) {
      console.log('Yes')
      this.setToken(this.res[0].UserEmail, this.res[0].UserName, this.res[0].UserRole)
      isLog = this.res[0].UserRole
    }
    else {
      console.log('NO')
      isLog = ''
    }
    console.log('isLog: ', isLog)
    return isLog
  }

  logout() {
    this.setToken(null, null, null)
  }

  isAuthenticated(): boolean {
    if (!this.token) {
      this.logout()
      return false
    }
    else {
      if (localStorage.getItem('token-role') == 'admin')
        return true
      else
        return false
    }
  }

  isAuthenticatedUser(): boolean {
    if (!this.token) {
      this.logout()
      return false
    }
    else {
      if (localStorage.getItem('token-role') == 'user' || localStorage.getItem('token-role') == 'moder')
        return true
      else
        return false
    }
  }

  isAuthenticatedModer(): boolean {
    if (!this.token) {
      this.logout()
      return false
    }
    else {
      if (localStorage.getItem('token-role') == 'moder')
        return true
      else
        return false
    }
  }

  private setToken(response: string | null, name: string | null, role: string | null) {
    if (response && name && role) {
      const expDate = new Date(new Date().getTime()+ +this.expiresIn * 1000)
      localStorage.setItem('token', response)
      localStorage.setItem('token-name', name)
      localStorage.setItem('token-role', role)
      localStorage.setItem('token-exp', expDate.toString())
    } else {
      localStorage.clear()
    }
  }
}
