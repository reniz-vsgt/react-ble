export interface IResetPasswordForm {
    password: string;
    confirmPassword: string;
}

export interface IResetPasswordResponse {
    message: string;
    payload : []
    status: number;
}

export interface IResetPasswordPayload {
    email: string;
    password: string;
}

export interface IProps {
    email: string;
}
