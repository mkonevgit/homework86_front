
export type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never;
export type GetActionsType<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesType<T>>;

export type AlbumType = {
   _id: string
   user: string
   name: string
   info: string
   artist: string | ArtistType
   image: string
   year: string
   published: boolean
}

export type ArtistType = {
   _id: string
   user: string
   name: string
   info: string
   image: string
   published: boolean
}

export type TrackType = {
   _id: string
   user: string
   name: string
   duration: string
   trackNumber: string
   trackLink: string
   album: string | AlbumType
   image: string
   published: boolean
}

export type TrackHistoryType = {
   _id: string
   user: string
   track: string | TrackType
   datetime: string
}

export type UserType = {
   _id: string
   role: string
   username: string
   display: string
   phone: string
   token: string
}

export type OptionsType = {
   _id: string
   title: string
}

type ParamsArtistType = {
   component: string
}

type ParamsAlbumType = {
   id: string
   name: string
   component: string
}

type ParamsTrackType = {
   albumId: string
   albumName: string
   component: string
}

type ParamsTrackHistoryType = {
   component: string
   username: string
}

export type ParamsType = ParamsArtistType | ParamsAlbumType |
   ParamsTrackType | ParamsTrackHistoryType;


export type AlertType = {
   id: string
   method: string | undefined
   url: string | undefined
   status: number
   count: number
}

export type ErrorType = {
   id: string
   method: string | undefined
   url: string | undefined
   status: number
   statusText: string
   name: string
   message: string
   error: string
   responseDataMessage: string
}

export type PersistedStateType = {
   users: {user: UserType}
}










