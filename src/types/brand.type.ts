export interface BrandType {
  results: number
  metadata: Metadata
  data: BrandProductType[]
}

export interface Metadata {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
}

export interface BrandProductType {
  _id: string
  name: string
  slug: string 
  image: string
  createdAt: string
  updatedAt: string
}
