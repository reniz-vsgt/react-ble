import { IBglValues, IFormData } from "../BLE/BLE.types"

export interface IGluocoseData{
    BGL : number
    EE_cal_per_min : number
    Glucose_utilise_mg_per_min : number
    percentage_calories_from_glucose : number
    range1 : number
    range2 : number
    hr : number
    hrv : number
    br : number

}
export interface IPayload{
    co2_percentage : number[]
    gluocose_data : IGluocoseData
    humidity : number[]
    temp : number[]
    ticks : number[]
    graphData : []

}
export interface IGraphData{
    message : string
    payload : IPayload
    status : number
}

export interface IReportProps{
    graphData : IGraphData,
    bglData : IBglValues
    startTimestamp : string
    finalData : Uint8Array
    formData : IFormData
}