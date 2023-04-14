import { CourseType } from "src/app/course/types/course-type"
import { MediaType } from "src/app/course/types/media-type"

export type ModuleType = {
  id?: number
  name: string
  objective: string
  course: CourseType
  medias: Array<MediaType>
}