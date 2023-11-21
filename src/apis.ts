import { sendRequestToAPI, sendRequestToAPIWithFormData } from "mngo-project-tools/utils";
import { API_BASE_URL, API_USERS_REF, QUIZ_JSON_FILE_LOCATION, QUIZ_JSON_FILE_NAME } from "./constants";

export async function verifyAdmin(username: string, password: string) {
    return await sendRequestToAPI(API_BASE_URL, `${API_USERS_REF}/verify-admin?username=${username}&password=${password}`);
}

export async function uploadQuizJSON(file: any) {
    const formData = new FormData();
    formData.append('file', file);

    const url = `${API_BASE_URL}/api/upload?location=${encodeURI(QUIZ_JSON_FILE_LOCATION)}&fileName=${QUIZ_JSON_FILE_NAME}`;
    return await sendRequestToAPIWithFormData(url, formData);
}
