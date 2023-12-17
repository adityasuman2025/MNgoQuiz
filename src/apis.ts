import { sendRequestToAPI, sendRequestToAPIWithFormData } from "mngo-project-tools/apiUtils";
import { getDeviceDetails } from "mngo-project-tools/deviceUtils";
import { API_BASE_URL, API_COUNTER_REF, PROJECT_NAME, API_USERS_REF, API_UPLOAD_REF, QUIZ_JSON_FILE_LOCATION, QUIZ_JSON_FILE_NAME } from "./constants";

export async function verifyAdmin(username: string, password: string) {
    return await sendRequestToAPI(API_BASE_URL, `${API_USERS_REF}/verify-admin?username=${username}&password=${password}`);
}

export async function uploadQuizJSON(file: any) {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${API_BASE_URL}${API_UPLOAD_REF}?location=${encodeURI(QUIZ_JSON_FILE_LOCATION)}&fileName=${QUIZ_JSON_FILE_NAME}`;
    return await sendRequestToAPIWithFormData(url, formData);
}

export async function appCounter() {
    const deviceDetails = getDeviceDetails();
    sendRequestToAPI(API_BASE_URL, `${API_COUNTER_REF}`, "POST", {
        appName: PROJECT_NAME.split(" ").join(""),
        location: window.location.href,
        date: new Date().toLocaleString(),
        device: `${deviceDetails.device} - ${deviceDetails.os} - ${deviceDetails.browser}`,
    });
}