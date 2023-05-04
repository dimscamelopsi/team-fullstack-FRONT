import { TypeMediaType } from "./type-media-type"

export type MediaType = {
    id: number
    title: string
    summary: string
    duration: number
    totalTime: string
    createdAt: Date
    url: string,
    typeMedia: TypeMediaType
    file:Blob
}
