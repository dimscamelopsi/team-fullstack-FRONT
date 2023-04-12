import { CourseType } from "src/app/course/types/course-type"

export type ModuleType = {
  id: number
  name: string
  objective: string
  course: CourseType
}