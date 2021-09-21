export interface User {
  name: string
  login: string
  email: string
  password: string
  _id?: any
}

export interface Post {
  imageSrc: string
  text: string
  _id?: any
  src?: string
}

export interface Message {
  important?: boolean
  author: string
  heading: string
  text: string
  _id?: any
}
export interface Admin {
  login: string
  password: string
  _id?: any
}
