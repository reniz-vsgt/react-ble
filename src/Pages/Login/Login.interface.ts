export interface ILoginCredentials {
    email: string;
    password: string;
}

export interface ILoginResponse {
    token: string;
}
export interface ILoginResponse {
    message: string;
    payload: ILoginResponse;
    status: number;
}