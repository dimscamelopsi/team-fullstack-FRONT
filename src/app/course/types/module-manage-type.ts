import { CourseManageType } from "./course-manage-type"

export type ModuleManageType = {
  id?: number
  name: string
  objective: string
  selected: boolean
  totalTime?: string
  orderModule: number
  course: CourseManageType
}
