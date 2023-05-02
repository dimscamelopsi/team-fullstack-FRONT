import { CourseManageType } from "./course-manage-type"
import { SelectedType } from "./selected-type"

export type ModuleManageType = {
  id?: number
  name: string
  objective: string
  orderModule: number
  course: CourseManageType
}& SelectedType
