export interface ISignupForm {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ISignupResponse {
    status: number;
    message: string;
    payload: []
}

