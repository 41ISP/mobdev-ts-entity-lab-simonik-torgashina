export const GENRES = ["romance", "drama", "horror", "fantasy", "anime", "dorama"] as const
export type Genre = (typeof GENRES)[number]

export const GENRES_LABELS: Record<Genre, string> = {
    romance: "Романтика",
    drama: "Драма",
    horror: "Ужасы",
    fantasy: "Фантастика",
    anime: "Аниме",
    dorama: "Дорама",
}

export interface IStrapiResponse<T> {
  data: T
  meta: IMeta
}

export interface IMovie {
  id: number
  documentId: string
  title: string
  description: string
  duration: number
  rating: number
  releaseDate: string
  genre: Genre
  isWatched: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  picture: IPicture
}

export interface IPicture {
  id: number
  documentId: string
  name: string
  alternativeText: any
  caption: any
  focalPoint: any
  width: number
  height: number
  formats: IFormats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: any
  provider: string
  provider_metadata: any
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface IFormats {
  large?: IMediaFormat
  small: IMediaFormat
  medium: IMediaFormat
  thumbnail: IMediaFormat
}

export interface IMediaFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: any
  size: number
  width: number
  height: number
  sizeInBytes: number
}


export interface IMeta {
  pagination: IPagination
}

export interface IPagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export type IMovieInput = Omit<
    IMovie,
    "id" | "documentId" | "createdAt" | "updatedAt" | "publishedAt" | "picture"
>