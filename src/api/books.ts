import { gql } from 'apollo-boost'
import graphql from './graphql'
import { Book } from '@/types'

export const getBooks = async (): Promise<Book[]> => {
  const { data: { books } } = await graphql.query({
    query: gql`
      query {
        books {
          id
          title
          createdAt
          updatedAt
        }
      }
    `,
    fetchPolicy: 'no-cache'
  })

  return books
}

export const getBookById = async (id: string): Promise<Book> => {
  const { data: { book } } = await graphql.query({
    query: gql`
      query($id: ID!) {
        book(id: $id) {
          id
          title
          synopsis
          chapters {
            id
            number
            title
            content
          }
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      id
    },
    fetchPolicy: 'no-cache'
  })

  return book
}

export const createBook = async ({ title }: Book): Promise<Book> => {
  const { data } = await graphql.mutate({
    mutation: gql`
      mutation($bookPayload: BookPayload!) {
        createBook(bookPayload: $bookPayload) {
          id
          title
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      bookPayload: {
        title
      }
    }
  })

  return data?.createBook
}

export const updateBook = async (book: Book): Promise<boolean> => {
  const { id, title, synopsis } = book

  const { data } = await graphql.mutate({
    mutation: gql`
      mutation($id: ID!, $bookPayload: BookPayload!) {
        updateBook(id: $id, bookPayload: $bookPayload)
      }
    `,
    variables: {
      id,
      bookPayload: {
        title,
        synopsis
      }
    }
  })

  return data?.updateBook
}

export const deleteBook = async (id: string): Promise<boolean> => {
  const { data } = await graphql.mutate({
    mutation: gql`
      mutation($id: ID!) {
        deleteBook(id: $id)
      }
    `,
    variables: { id }
  })

  return data.deleteBook
}
