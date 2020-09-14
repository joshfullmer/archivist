import { Chapter } from '@/types'
import graphql from './graphql'
import { gql } from 'apollo-boost'

export const getChapterById = async (id: string): Promise<Chapter> => {
  const { data } = await graphql.query({
    query: gql`
      query($id: ID!) {
        chapter(id: $id) {
          id
          bookId
          number
          title
          epigraph
          content
          created
          updated
        }
      }
    `,
    variables: { id }
  })

  return data.chapter
}

export const createChapter = async ({ bookId, chapter }: { bookId: string, chapter: Chapter }): Promise<Chapter> => {
  const { data } = await graphql.mutate({
    mutation: gql`
      mutation($bookId: ID!, $chapterPayload: ChapterPayload!) {
        createChapter(bookId: $bookId, chapterPayload: $chapterPayload) {
          id
          number
          title
          epigraph
          content
          created
          updated
        }
      }
    `,
    variables: {
      bookId,
      chapterPayload: chapter
    }
  })

  console.log(data)

  return data.createChapter
}

export const updateChapter = async (chapter: Chapter): Promise<boolean> => {
  const { id, number, title, epigraph, content } = chapter
  const { data } = await graphql.mutate({
    mutation: gql`
      mutation($id: ID!, $chapterPayload: ChapterPayload!) {
        updateChapter(id: $id, chapterPayload: $chapterPayload)
      }
    `,
    variables: {
      id,
      chapterPayload: {
        number: +number,
        title,
        epigraph,
        content
      }
    }
  })

  return data.updateChapter
}

export const deleteChapter = async (id: string): Promise<boolean> => {
  const { data } = await graphql.mutate({
    mutation: gql`
      mutation($id: ID!) {
        deleteChapter(id: $id)
      }
    `,
    variables: { id }
  })

  return data.deleteChapter
}
