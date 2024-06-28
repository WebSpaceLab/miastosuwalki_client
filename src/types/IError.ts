export interface NuxtError{
    statusCode: number
    fatal: boolean
    unhandled: boolean
    statusMessage?: string
    data?: unknown
    cause?: unknown
}