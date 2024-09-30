export interface IForgotPassword {
    email: string
    otp: string
    password: string
    confirmPassword: string
}

export interface IForgotPasswordResponse {
    message: string
    payload: []
    status: number
}

