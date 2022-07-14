import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {
  CommentGet,
  CommentPost, CommentStatus, CommentToRes, CommentToSearch,
  DServer, DServerAuthor,
  DServerGet, DServerGetToForm, DServerGetToFormFull,
  DServerOnline, DServerUpdOnline, DServerUpdStatus, FavoriteGet, FavoritePost, FavoriteUserName,
  Genre,
  GenrePost, Preference, PreferencePost, PreferenceUserId,
  Topic, TopicGenre, TopicGenrePost, TopicId,
  TopicImg, TopicName,
  TopicPost,
  User, UserId,
  UserLog, UserName
} from "./interfaces";

@Injectable()
export class ApiService {

  readonly APIUrl = "http://localhost:5000/api"
  readonly ImageUrl = "http://localhost:5000/Images/"

  constructor(private http: HttpClient) {}

  getUserList() {
    return this.http.get<User[]>(this.APIUrl+'/user')
  }

  postUser (data: User) {
    return this.http.post<any>(this.APIUrl+'/user', data)
  }

  getUserByEmail (data: User) {
    return this.http.post<UserLog[]>(this.APIUrl + '/user/GetUserByEmail', data)
  }

  getUserId (data: UserName) {
    return this.http.post<UserId[]>(this.APIUrl + '/user/GetUserId', data)
  }

  updateUser(data: User) {
    return this.http.put<any>(this.APIUrl+'/user', data)
  }

  getTopicList() {
    return this.http.get<Topic[]>(this.APIUrl+'/topic')
  }

  postDServer(data: DServer) {
    return this.http.post<any>(this.APIUrl+'/dserver', data)
  }

  getDServersList() {
    return this.http.get<DServerGetToForm[]>(this.APIUrl+'/dserver')
  }

  getDServerById(id: number) {
    return this.http.get<DServerGet[]>(this.APIUrl+'/dserver/' + id)
  }

  getDServerByIdToForm(id: number) {
    return this.http.get<DServerGetToForm[]>(this.APIUrl+'/dserver/' + id)
  }

  updateDServer(data: DServerGet) {
    return this.http.put<any>(this.APIUrl+'/dserver', data)
  }

  getDServerOnline(id: string) {
    return this.http.get<DServerOnline>('https://discord.com/api/guilds/'+ id + '/widget.json')
  }

  updateDServerOnlineData(ds: DServerUpdOnline) {
    return this.http.put<any>(this.APIUrl + '/dserver/UpdateDServerOnlineData', ds)
  }

  updateDServerStatusData(ds: DServerUpdStatus) {
    return this.http.put<any>(this.APIUrl + '/dserver/UpdateDServerStatusData', ds)
  }

  UploadImage(data:any) {
    return this.http.post(this.APIUrl+'/topic/savefile', data);
  }

  deleteTopic(id: number) {
    return this.http.delete<any>(this.APIUrl+'/topic/' + id)
  }

  getTopicById(id: number) {
    return this.http.get<Topic[]>(this.APIUrl+'/topic/' + id)
  }

  updateTopic(data: Topic) {
    return this.http.put<any>(this.APIUrl+'/topic', data)
  }

  postTopic(data: TopicPost) {
    return this.http.post<any>(this.APIUrl+'/topic', data)
  }

  getTopicIdByName (data: TopicName) {
    return this.http.post<TopicId[]>(this.APIUrl + '/topic/GetTopicIdByName', data)
  }

  getServerImage(id: number) {
    return this.http.get<TopicImg[]>(this.APIUrl+'/user/' + id)
  }

  getGenreList() {
    return this.http.get<Genre[]>(this.APIUrl+'/genre')
  }

  deleteGenre(id: number) {
    return this.http.delete<any>(this.APIUrl+'/genre/' + id)
  }

  postGenre(data: GenrePost) {
    return this.http.post<any>(this.APIUrl+'/genre', data)
  }

  getGenreById(id: number) {
    return this.http.get<Genre[]>(this.APIUrl+'/genre/' + id)
  }

  postComment(data: CommentPost) {
    return this.http.post<any>(this.APIUrl+'/comment', data)
  }

  getCommentsByDServer(data: CommentToSearch) {
    return this.http.post<CommentGet[]>(this.APIUrl + '/comment/GetCommentsByDServer', data)
  }

  getReportedComments(data: CommentStatus) {
    return this.http.post<CommentGet[]>(this.APIUrl + '/comment/GetReportedComments', data)
  }

  updateCommentStatus(data: CommentGet) {
    return this.http.put<any>(this.APIUrl+'/comment', data)
  }

  updateCommentStatusRes(data: CommentToRes) {
    return this.http.put<any>(this.APIUrl+'/comment', data)
  }

  deleteComment(id: number) {
    return this.http.delete<any>(this.APIUrl+'/comment/' + id)
  }

  postFavorite(data: FavoritePost) {
    return this.http.post<any>(this.APIUrl+'/favorite', data)
  }

  getFavoriteByUserServer(data: FavoritePost) {
    return this.http.post<FavoriteGet[]>(this.APIUrl + '/favorite/GetFavoriteByUserServer', data)
  }

  getFavoriteByUser(data: FavoriteUserName) {
    return this.http.post<FavoriteGet[]>(this.APIUrl + '/favorite/GetFavoriteByUser', data)
  }

  deleteFavorite(id: number) {
    return this.http.delete<any>(this.APIUrl+'/favorite/' + id)
  }

  getFavoriteCount(data: FavoritePost) {
    return this.http.post<any>(this.APIUrl + '/favorite/GetFavoriteCount', data)
  }

  postTopicGenre(data: TopicGenrePost) {
    return this.http.post<any>(this.APIUrl+'/topicgenre', data)
  }

  getTopicGenreByTopic (data: TopicGenrePost) {
    return this.http.post<TopicGenre[]>(this.APIUrl + '/topicgenre/GetTopicGenreByTopic', data)
  }

  deleteTopicGenre(id: number) {
    return this.http.delete<any>(this.APIUrl+'/topicgenre/' + id)
  }

  postPreference(data: PreferencePost) {
    return this.http.post<any>(this.APIUrl+'/preference', data)
  }

  getPreferenceByUser (data: PreferenceUserId) {
    return this.http.post<Preference[]>(this.APIUrl + '/preference/GetPreferenceByUser', data)
  }

  deletePreference(id: number) {
    return this.http.delete<any>(this.APIUrl+'/preference/' + id)
  }

  getDServersDataByUser (data: DServerAuthor) {
    return this.http.post<DServerGetToForm[]>(this.APIUrl + '/dserver/GetDServersDataByUser', data)
  }
}
