import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../shared/api.service";
import {AlertService} from "../shared/services/alert.service";
import {
  Genre,
  NamedGenre, Preference,
  PreferencePost, PreferenceUserId,
  TopicGenrePost,
  User,
  UserId,
  UserLog,
  UserName
} from "../../shared/interfaces";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit, OnDestroy {

  form: FormGroup
  rSub: Subscription
  curData: UserLog[]
  res: UserLog[]
  userId: UserId[]
  userIdNum: number
  genreList: Genre[]
  namedGenreList: NamedGenre[] = []
  preferenceList: Preference[]

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private api: ApiService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    const userData: User = {
      UserEmail: localStorage.getItem('token')!,
      UserName: localStorage.getItem('token-name')!,
      UserPassword: '',
      UserRole: localStorage.getItem('token-role')!
    }

    this.getGenreList()

    this.rSub = this.api.getUserByEmail(userData)
      .subscribe( res => {
        this.curData = res

        console.log('curData: ', this.curData)

        this.form = this.formBuilder.group({
          email: new FormControl(this.curData[0].UserEmail, [
            Validators.required,
            Validators.email
          ]),
          name: new FormControl(this.curData[0].UserName, [
            Validators.required,
            Validators.minLength(4)
          ]),
          password: new FormControl(this.curData[0].UserPassword, [
            Validators.required,
            Validators.minLength(6)
          ]),
          genre: new FormControl('')
        })
      })

    this.getPreferenceList()


  }

  ngOnDestroy(): void {
    if (this.rSub) {
      this.rSub.unsubscribe()
    }
  }

  redir() {
    if (localStorage.getItem('token-role') == 'admin') {
      this.router.navigate(['/admin', 'dashboard'])
    }
    else {
      this.router.navigate(['/admin', 'user'])
    }
  }

  async getGenreList() {
    this.api.getGenreList()
      .subscribe( data => {
        this.genreList = data
        console.log('GenreList: ', this.genreList)
      })
  }

  async getUserId(): Promise<number> {
    let userName: UserName = {
      UserName: localStorage.getItem('token-name')!
    }
    this.userId = await this.api.getUserId(userName).toPromise()
    console.log('UserId: ', this.userId)
    return this.userId[0].UserId
  }

  async getPreferenceList() {
    this.userIdNum = await this.getUserId()
    const pfToGetList: PreferenceUserId = {
      UserId: this.userIdNum
    }
    console.log('UserSend: ', pfToGetList)
    this.api.getPreferenceByUser(pfToGetList)
      .subscribe(data => {
        this.preferenceList = data
        console.log('preferenceList', this.preferenceList)
        for (let list of this.preferenceList) {
          this.api.getGenreById(list.GenreId)
            .subscribe(data => {
              let item: NamedGenre = {
                tgId: list.PreferenceId,
                genreName: data[0].GenreName
              }
              this.namedGenreList.push(item)
            })
        }
        console.log('NamedGenreList: ', this.namedGenreList)
      })
  }

  back(event: Event) {
    event.preventDefault()
    this.redir()
  }

  addGenre(event: Event) {
    event.preventDefault()
    const pfPost: PreferencePost = {
      UserId: this.userId[0].UserId,
      GenreId: this.form.value.genre
    }
    console.log('pf to Post: ', pfPost)
    this.api.postPreference(pfPost).subscribe()
    this.alert.success('Жанр успешно добавлен')
    document.location.reload()
  }

  delete(tgId: number) {
    this.api.deletePreference(tgId).subscribe()
    this.alert.success('Жанр успешно удален')
  }

  async submit() {
    if (this.form.invalid) {
      return
    }

    const userDataToPut: User = {
      UserEmail: this.form.value.email,
      UserName: this.form.value.name,
      UserPassword: this.form.value.password,
      UserRole: localStorage.getItem('token-role')!
    }

    this.res = await this.api.getUserByEmail(userDataToPut).toPromise()
    if (!this.res[0].UserEmail || this.res[0].UserEmail == localStorage.getItem('token')) {
      console.log('Changeable')
      this.api.updateUser(userDataToPut).subscribe()
      this.alert.success('Изменение данных прошло успешно')
      this.redir()
    } else {
      console.log('Error: Email exist')
      this.alert.warning('Пользователь с таким Email-адресом уже зарегистрирован')
    }
  }
}
