export interface User {
  id: number,
  name: string,
  email: string,
  company: Company,
}

export interface Company {
  name: string,
  catchPhrase: string,
  bs: string
}

export interface SortType {
  class: string,
  func: (a: User, b: User) => number;
}

export interface PageParm {
  page: number,
  perPage: number,
}