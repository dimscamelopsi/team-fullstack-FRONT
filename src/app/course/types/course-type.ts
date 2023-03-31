import { ModuleType } from "./module-type"

export type CourseType = {
  id: number
  title: string
  createdAt: Date
  updatedAt: Date
  objective: string
  modules: Array<ModuleType>
}
