import { IFormData } from "../BLE/BLE.types"

export interface IBglValues {
    range1: number,
    range2: number,
    bgl: number,
    unit: string,
    name: string,
    description: string
    percentage: number
    strokeColor: string
}

export interface IParameters {
    name: string
    value: number
    unit: string
    isGraphic: boolean
    description: string
    percentage: number
    strokeColor: string
}

export interface IXAxis {
    data: number[]
    scaleType: string
    label: string
}


export interface IYAxis {
    data: number[]
    label: string
    showMark: boolean
}

export interface IGraphData {
    label: string
    xAxis: IXAxis[]
    yAxis: IYAxis[]
}

export interface IReportProps {
    parameters: IParameters[]
    graphData: IGraphData[] | null
    bgl: IBglValues | null
    startTimestamp: string
    formData: IFormData
    title: string
}