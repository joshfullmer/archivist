import { BookComponentDataDto, BookComponentData } from '@/types'

export const transformBookComponentDtoToBookComponentData = (
  { data, ...rest }: BookComponentDataDto
): BookComponentData => {
  let parsedData

  try {
    parsedData = JSON.parse(data)
  } catch {}

  return {
    data: parsedData || data,
    ...rest
  }
}
