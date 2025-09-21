export interface CategoriesType {
  results: number
  metadata: CategoriesProductType
  data: CategoriesProductType[]
}

export interface CategoriesProductType {
  currentPage: number
  numberOfPages: number
  limit: number
  prevPage: number
  _id:string
  image: string
  name:string
  slug:string
}
