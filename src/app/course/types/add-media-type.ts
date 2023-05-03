import { TypeMediaType } from "./type-media-type"

export type AddMediaType = {
    id: number
    title: string
    summary: string
    duration: number
    url: string
    typeMedia: TypeMediaType
}
