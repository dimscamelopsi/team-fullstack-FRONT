import { CourseType } from "./course-type"
import { MediaType } from "./media-type"

export type ModuleType = {
  id?: number
  name: string
  objective: string
  selected: boolean
  totalTime?: string
  course: CourseType
  medias: MediaType[]
  order?: number
}
