import { Component, OnInit } from '@angular/core';
import {Genre, GenrePost} from "../../shared/interfaces";
import {ApiService} from "../../shared/api.service";
import {Router} from "@angular/router";
import {AlertService} from "../shared/services/alert.service";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-genre-dashboard-page',
  templateUrl: './genre-dashboard-page.component.html',
  styleUrls: ['./genre-dashboard-page.component.scss']
})
export class GenreDashboardPageComponent implements OnInit {

  genresData: Genre[] = []
  form: FormGroup
  gSub: Subscription
  ggSub: Subscription
  gggSub: Subscription

  constructor(
    private api: ApiService,
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])
    })
    this.getAllGenres()
  }

  getAllGenres() {
    this.gSub = this.api.getGenreList().subscribe(data => {
      this.genresData = data
      console.log("GenresData: ", this.genresData)
    })
  }

  remove(id: number) {
    this.ggSub = this.api.deleteGenre(id).subscribe(() => {
      this.genresData = this.genresData.filter( gen => gen.GenreId != id)
      this.alert.danger('Жанр был удален')
    })
  }

  submit() {
    if (this.form.invalid)
      return

    const genrePost: GenrePost = {
      GenreName: this.form.value.name
    }

    this.gggSub = this.api.postGenre(genrePost).subscribe()
    this.alert.success('Жанр был добавлен')
    this.form.reset()
  }

}
