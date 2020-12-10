import { gql } from 'apollo-boost'
import graphql from './graphql'
import { BookComponent, BookComponentField, FieldType, BookComponentData, Data } from '@/types'
import { BookComponentRecord } from '@/types/components'

export const getComponents = async (): Promise<BookComponent[]> => {
  const { data: { components } } = await graphql.query({
    query: gql`
      query {
        components {
          id
          name
          fields {
            id
            name
            type
            options
          }
          created
          updated
        }
      }
    `,
    fetchPolicy: 'no-cache'
  })

  return components
}

export const getComponentById = async (id: string): Promise<BookComponent> => {
  const { data: { component } } = await graphql.query({
    query: gql`
      query($id: ID!) {
        component(id: $id) {
          id
          name
          fields {
            id
            name
            type
            options
          }
          records {
            id
            name
            values {
              data
            }
          }
          created
          updated
        }
      }
    `,
    variables: { id },
    fetchPolicy: 'no-cache'
  })

  return component
}

export const createComponent = async (name: string): Promise<BookComponent> => {
  const { data } = await graphql.mutate({
    mutation: gql`
      mutation($name: String!) {
        createComponent(name: $name) {
          id
          name
          created
          updated
        }
      }
    `,
    variables: { name }
  })

  return data?.createComponent
}

export const updateComponentMutation = async (component: BookComponent): Promise<boolean> => {
  const { id, name } = component
  const { data } = await graphql.mutate({
    mutation: gql`
      mutation($id: ID!, $componentPayload: ComponentPayload) {
        updateComponent(id: $id, componentPayload: $componentPayload)
      }
    `,
    variables: {
      id,
      componentPayload: { name }
    }
  })

  return data?.updateComponent
}

export const addComponentFieldMutation = async ({
  componentId,
  name,
  options,
  type
}: {
  componentId: string
  name: string
  options?: string[]
  type: FieldType
}): Promise<BookComponentField> => {
  const { data } = await graphql.mutate({
    mutation: gql`
      mutation($componentId: ID!, $componentFieldPayload: ComponentFieldPayload!) {
        createComponentField(componentId: $componentId, componentFieldPayload: $componentFieldPayload) {
          id
          componentId
          name
          type
          options
          created
          updated
        }
      }
    `,
    variables: {
      componentId,
      componentFieldPayload: {
        name,
        type,
        options
      }
    }
  })

  return data?.createComponentField
}

export const createComponentRecordMutation = async ({
  componentId,
  name = ''
}: {
  componentId: string
  name?: string
}): Promise<BookComponentRecord> => {
  const { data } = await graphql.mutate({
    mutation: gql`
      mutation($componentId: ID!, $name: String) {
        createComponentRecord(componentId: $componentId, name: $name) {
          id
          componentId
          name
          createdAt
          updatedAt
        }
      }
    `,
    variables: {
      componentId,
      name
    }
  })

  return data?.createComponentRecord
}

export const updateComponentDataMutation = async ({
  id,
  componentData
}: {
  id: string,
  componentData: Data
}): Promise<BookComponentData> => {
  const dataJson = JSON.stringify(componentData)
  const { data } = await graphql.mutate({
    mutation: gql`
      mutation($id: ID!, $data: String!) {
        updateComponentData(id: $id, data: $data) {
          id
          componentId
          data
          created
          updated
        }
      }
    `,
    variables: {
      id,
      data: dataJson
    }
  })

  return data?.updateComponentData
}
