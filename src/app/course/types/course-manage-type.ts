import { ModuleType } from "./module-type"
import { SelectedType } from "./selected-type"

export type CourseManageType = {
    id?: number
    title: string
    createdAt?: Date
    updatedAt?: Date
    objective: string
    publish: boolean
    modules?: Array<ModuleType>
  } & SelectedType