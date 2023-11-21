// variables for setting cookie expiratiom tym
export const COOKIE_EXPIRATION_MINS = 30 * 24 * 60; // 30 days

let COOKIE_EXPIRATION_TYM = new Date();
COOKIE_EXPIRATION_TYM.setTime(COOKIE_EXPIRATION_TYM.getTime() + (COOKIE_EXPIRATION_MINS * 60 * 1000));
export const COOKIE_EXPIRATION_TIME = COOKIE_EXPIRATION_TYM;

export const API_BASE_URL = "https://apis.mngo.in";
export const API_USERS_REF = "/api/users";

//general variables
export const PROJECT_NAME = "MNgo Quiz";
export const LOGGED_USER_TOKEN_COOKIE_NAME = "MNgoQuizLoggedUserToken";
export const STANDARD_DATE_FORMAT = "DD-MM-YYYY";
export const DEFAULT_DATE = "1999-03-03T";
export const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg"];
