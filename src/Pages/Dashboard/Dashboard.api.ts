import { baseUrl } from "../../Constants/Constants";
import { IBglScore } from "./Dashboard.interface";

export const getAllSubjectsForUser = async (token: string): Promise<string[]> => {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    const response = await fetch(`${baseUrl}/api/v1/vsgt-data-service/getAllSubjectsForUser`, requestOptions)
    if (!response.ok) {
        throw new Error((await response.json()).message);
    }
    const resData = await response.json()
    return resData.payload
}

export const getScorsForSubject = async (token: string, timestamp: string, subjectId: string): Promise<IBglScore | null> => {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    const response = await fetch(`${baseUrl}/api/v1/vsgt-data-service/getMetabolicRiskScore?subjectId=${subjectId}&timestamp=${timestamp}`, requestOptions)
    if (!response.ok) {
        throw new Error((await response.json()).message);
    }
    const resData = await response.json()
    if (resData.payload.value)
        return resData.payload
    else
        return null
}
