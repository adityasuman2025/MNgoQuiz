import { sendRequestToAPI } from "mngo-project-tools/utils";
import { API_BASE_URL, API_USERS_REF } from "./constants";

export async function verifyAdmin(username: string, password: string) {
    return await sendRequestToAPI(API_BASE_URL, `${API_USERS_REF}/verify-admin?username=${username}&password=${password}`);
}
