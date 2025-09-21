export interface SubcategoryType {
  results: number
  metadata: Metadata
  data: SubcategoryProductType[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}

export interface SubcategoryProductType {
  _id: string
  name: string
  slug: string
  category: string
  createdAt: string
  updatedAt: string
}
