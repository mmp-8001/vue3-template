import axios from 'axios';

function endpointUrl(endpoint: string): string {
    return new URL(endpoint, process.env.DOMAIN).href;
}

export function httpGet(
    endpoint: string,
    okCallback: (data: any) => void,
    errCallback: (code: number) => void
) {
    axios.get(endpointUrl(endpoint)).then(function (response) {
        if (response.data.ok === true) {
            okCallback(response.data.data);
        } else {
            console.log(`Get Request Failed (Invalid Input): ${endpoint}`);
            errCallback(response.data.code);
        }
    }).catch(function (error) {
        console.log(`Get Request Failed (Server Error): ${endpoint} -> ${error}`);
        errCallback(500);
    });
}

export function httpPost(
    endpoint: string,
    data: object,
    okCallback: (data: any) => void,
    errCallback: (code: number) => void,
    hasFile: boolean = false
) {
    let headers = hasFile ? {'Content-Type': 'multipart/form-data'} : {};
    let formData = new FormData();
    if (hasFile) {
        Object.keys(data).forEach(function (key) {
            formData.append(key, data[key]);
        });
    }
    axios.post(endpointUrl(endpoint), hasFile ? formData : data, {headers: headers}).then(function (response) {
        if (response.data.ok === true) {
            okCallback(response.data.data);
        } else {
            console.log(`Post Request Failed (Invalid Input): ${endpoint}`);
            errCallback(response.data.code);
        }
    }).catch(function (error) {
        console.log(`Post Request Failed (Server Error): ${endpoint} -> ${error}`);
        errCallback(500);
    });
}