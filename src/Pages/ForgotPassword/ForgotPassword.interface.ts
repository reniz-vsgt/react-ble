export interface ISendOTP {
    email: string
}
export interface IVerifyOTP {
    email: string
    otp: string
}

export interface IForgotPasswordResponse {
    message: string
    payload: []
    status: number
}

