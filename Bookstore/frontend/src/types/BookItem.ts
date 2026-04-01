// this type represents a single book record that we use across the app
export type Book = {
  bookID: number
  title: string
  author: string
  publisher: string
  isbn: string
  classification: string
  category: string
  pageCount: number
  price: number
  quantity: number
}
