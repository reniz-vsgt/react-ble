
export const getTimestamp = (now = new Date()) => {
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
    return formattedDateTime;
}


export const mergeArrays = (arrays: any) => {
    const totalLength = arrays.reduce((acc: any, arr: any) => acc + arr.length, 0);
    const merged = new Uint8Array(totalLength);
    let offset = 0;
    arrays.forEach((arr: any) => {
        merged.set(arr, offset);
        offset += arr.length;
    });
    return merged;
};

export const uint8ArrayToArray = (uint8Array: Uint8Array) => {
    var array = [getTimestamp()];
    for (var i = 0; i < uint8Array.byteLength; i++) {
        array.push((uint8Array[i]).toString());
    }
    return array;
}