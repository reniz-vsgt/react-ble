export interface IOptions {
    value: string
    label: string
}

export interface IScoreData {
    name: string
    value: number
    outOf: number
}

export interface IBglScore {
    name: string
    value: number
    outOf: number
    description: string
}

export interface IFetchSoreApiResponse {
    scoresData: IScoreData[]
    bglScore: IBglScore
}