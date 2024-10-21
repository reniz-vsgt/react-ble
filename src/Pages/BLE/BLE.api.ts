import { IFormData } from "./BLE.types";


export const uploadAccFile = async (token: string, baseUrl: string, deviceId: string, startTimestamp: string, fileData: string[][]) => {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);

    const formdata = new FormData();
    formdata.append("binFile", new Blob([fileData.join("\n")]), "upload.csv");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata
    };

    const response = await fetch(`${baseUrl}/api/v2/vsgt-recording-service/uploadBinFile?deviceId=${deviceId}&startTime=${startTimestamp}&fileType=acc&fileUploadType=single`, requestOptions)
    if (!response.ok) {
        throw new Error((await response.json()).message);
    }
    const resData = await response.json()
    return resData

}

export const uploadFile = async (type:string, fileData: Uint8Array, baseUrl: string, token: string, deviceId: string, startTimestamp: string, formData: IFormData) => {
    const myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + token);
    const formdata = new FormData();
    formdata.append("binFile", new Blob([fileData]), "upload.bin");
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
    };
    
    const response = await fetch(
        `${baseUrl}/api/v2/vsgt-recording-service/upload${type}BinFile?deviceId=${deviceId}&startTime=${startTimestamp}&subjectId=${formData?.subjectId}&age=${formData?.age}&height=${formData?.height}&weight=${formData?.weight}&gender=${formData?.gender}&diabetic=${formData?.diabetic}&latestWeight=${formData?.latestWeight}&comments=${formData?.comments}&meal=${formData?.meal}`,
        requestOptions
    );
    if (!response.ok) {
        throw new Error((await response.json()).message);
    }

    const responseData = await response.json();
    return {
        parameters: responseData.payload.parameters,
        graphData: responseData.payload.graphData,
        bgl: responseData.payload.bgl
    }
}
