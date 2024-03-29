// variables for setting cookie expiratiom tym
export const COOKIE_EXPIRATION_MINS = 30 * 24 * 60; // 30 days

let COOKIE_EXPIRATION_TYM = new Date();
COOKIE_EXPIRATION_TYM.setTime(COOKIE_EXPIRATION_TYM.getTime() + (COOKIE_EXPIRATION_MINS * 60 * 1000));
export const COOKIE_EXPIRATION_TIME = COOKIE_EXPIRATION_TYM;

export const API_BASE_URL = "https://apis.mngo.in"; // "http://localhost:3000" //
export const API_USERS_REF = "/api/users";
export const API_COUNTER_REF = "/api/counter";
export const API_UPLOAD_REF = "/api/upload";
export const API_FILE_REF = "/api/get-file";

export const QUIZ_JSON_FILE_LOCATION = "quiz";
export const QUIZ_JSON_FILE_NAME = "quiz.json";

export const MACHINE_CODING_FILE_LOCATION = "https://machine-coding.mngo.in";

//general variables
export const PROJECT_NAME = "MNgo Quiz";
export const LOGGED_USER_TOKEN_COOKIE_NAME = "MNgoQuizLoggedUserToken";
export const STANDARD_DATE_FORMAT = "DD-MM-YYYY";
export const DEFAULT_DATE = "1999-03-03T";
export const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg"];
export const TYPE_SOLUTION = "solution", TYPE_SCRATCHPAD = "scratchpad";
export const QUIZ_DATA_KEY = "quizData";
export const SCRATCHPAD_DATA_KEY = "scratchpadData";


// App modes
export const APP_MODE_KEY = "appMode";
export const APP_MODE_LEARN = "LEARN";
export const APP_MODE_QUIZ = "QUIZ";
export enum APP_MODES {
    LEARN = APP_MODE_LEARN,
    QUIZ = APP_MODE_QUIZ,
}