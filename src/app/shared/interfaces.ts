export interface UserLog {
  UserName: string
  UserEmail: string
  UserPassword: string
  UserRole: string
}

export interface User {
  UserId?: number
  UserName: string
  UserEmail: string
  UserPassword: string
  UserRole: string
}

export interface UserName {
  UserName: string
}

export interface UserId {
  UserId: number
}

export interface Topic {
  TopicId: number
  TopicName: string
  TopicImage: string
}

export interface TopicPost {
  TopicId?: number
  TopicName: string
  TopicImage: string
}

export interface TopicImg {
  TopicImage: string
}

export interface TopicName {
  TopicName: string
}

export interface TopicId {
  TopicId: number
}

export interface DServer {
  DServerId?: number
  DServerName: string
  DServerGame: string
  DServerText: string
  DServerURL: string
  DServerAuthor: string
  DServerDate: string
  DServerUI: string
  DServerStatus: string
}

export interface DServerGet {
  DServerId: number
  DServerName: string
  DServerGame: string
  DServerText: string
  DServerURL: string
  DServerAuthor: string
  DServerDate: string
  DServerUI: string
}

export interface DServerGetToForm {
  DServerId: number
  DServerName: string
  DServerGame: string
  DServerText: string
  DServerURL: string
  DServerAuthor: string
  DServerDate: string
  DServerUI: string
  DServerOnline: string
  DServerUPD: string
  DServerStatus: string
}

export interface DServerGetToFormFull {
  DServerId: number
  DServerName: string
  DServerGame: string
  DServerText: string
  DServerURL: string
  DServerAuthor: string
  DServerDate: string
  DServerUI: string
  DServerOnline: string
  DServerUPD: string
  DServerStatus: string
  DServerGenres: string[]
}

export interface DServerOnline {
  id: string
  instant_invite: string
  name: string
  presence_count: number
}

export interface DServerUpdOnline {
  DServerUI: string
  DServerUPD: string
  DServerOnline: string
}

export interface DServerUpdStatus {
  DServerId: number
  DServerStatus: string
}

export interface DServerAuthor {
  DServerAuthor: string
}

export interface Genre {
  GenreId: number
  GenreName: string
}

export interface GenrePost {
  GenreName: string
}

export interface CommentPost {
  CommentText: string
  CommentLike: number
  CommentDate: string
  CommentUserName: string
  CommentServerId: number
  CommentStatus: string
}

export interface CommentGet {
  CommentId: number
  CommentText: string
  CommentLike: number
  CommentDate: string
  CommentUserName: string
  CommentServerId: number
  CommentStatus: string
}

export interface CommentToSearch {
  CommentServerId: number
  CommentStatus: string
}

export interface CommentStatus {
  CommentStatus: string
}

export interface CommentToRes {
  CommentId: number
  CommentStatus: string
}

export interface FavoritePost {
  FavoriteUserName: string
  FavoriteServerId: number
}

export interface FavoriteGet {
  FavoriteId: number
  FavoriteUserName: string
  FavoriteServerId: number
}

export interface FavoriteUserName {
  FavoriteUserName: string
}

export interface TopicGenrePost {
  TopicId: number
  GenreId: number
}

export interface TopicGenre {
  TopicGenreId: number
  TopicId: number
  GenreId: number
}

export interface NamedGenre {
  tgId: number
  genreName: string
}

export interface NamedGenreServer {
  dserverId: number
  tgId: number
  genreName: string
}

export interface Preference {
  PreferenceId: number
  UserId: number
  GenreId: number
}

export interface PreferencePost {
  UserId: number
  GenreId: number
}

export interface PreferenceUserId {
  UserId: number
}
