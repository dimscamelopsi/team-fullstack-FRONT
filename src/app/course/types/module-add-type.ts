import { CourseType } from "./course-type"
import { MediaType } from "./media-type"

export type ModuleAddType = {
  id?: number
  name: string
  objective: string
  course: CourseType
  media: MediaType[]
}