export type BookComponent = {
  id: string;
  username: string;
  name: string;
  fields: BookComponentField[]
  records: BookComponentRecord[]
  createdAt: string;
  updatedAt: string;
}

export type BookComponentField = {
  id: string;
  componentId: string;
  name: string;
  type: FieldType;
  options: string[];
  createdAt: string;
  updatedAt: string;
}

export type BookComponentRecord = {
  id: string;
  componentId: string;
  name: string;
  values: BookComponentData[];
  createdAt: string;
  updatedAt: string;
}

export type BookComponentData = {
  id: string;
  recordId: string;
  fieldId: string;
  data: string;
  createdAt: string;
  updatedAt: string;
}

export type BookComponentDataDto = {
  id: string
  componentId: string
  data: string
  createdAt: string
  updatedAt: string
}

export type FieldType = 'text' | 'boolean' | 'select'
