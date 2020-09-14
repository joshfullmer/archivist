export type BookComponent = {
  id: string;
  name: string;
  fields: BookComponentField[]
  data: BookComponentData[]
  created: string;
  updated: string;
}

export type BookComponentField = {
  id: string;
  componentId: string;
  name: string;
  type: FieldType;
  options: string[];
  created: string;
  updated: string;
}

export type BookComponentData = {
  id: string
  componentId: string
  data: Data
  created: string
  updated: string
}

export type BookComponentDataDto = {
  id: string
  componentId: string
  data: string
  created: string
  updated: string
}

export type Data = Record<string, string>

export type FieldType = 'text' | 'boolean' | 'select'
