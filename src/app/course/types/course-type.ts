import { SimpleStudent } from "src/app/student/types/simple-student-type"
import { ModuleType } from "./module-type"
import { ReallySimpleStudent } from "src/app/student/types/really-simple-student"

export type CourseType = {
  id?: number
  title: string
  createdAt?: Date
  updatedAt?: Date
  objective: string
  modules?: Array<ModuleType>
  student?: ReallySimpleStudent
  publish: boolean
}
