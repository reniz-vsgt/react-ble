export const readServiceUUID = process.env.REACT_APP_READ_SERVICE_UUID ? process.env.REACT_APP_READ_SERVICE_UUID : ""
export const onDemandCharUUID = process.env.REACT_APP_ONDEMAND_CHAR_UUID ? process.env.REACT_APP_ONDEMAND_CHAR_UUID : ""
export const readCharUUID = process.env.REACT_APP_READ_CHAR_UUID ? process.env.REACT_APP_READ_CHAR_UUID : ""
export const writeServiceUUID = process.env.REACT_APP_WRITE_SERVICE_UUID ? process.env.REACT_APP_WRITE_SERVICE_UUID : ""
export const writeCharUUID = process.env.REACT_APP_WRITE_CHAR_UUID ? process.env.REACT_APP_WRITE_CHAR_UUID : ""
export const writeValue = process.env.REACT_APP_WRITE_VALUE ? process.env.REACT_APP_WRITE_VALUE : ""

export const baseUrl = process.env.REACT_APP_DEV_BASE_URL ? process.env.REACT_APP_DEV_BASE_URL : ""
export const googleOAuth2Key = process.env.REACT_APP_SOCIAL_AUTH_GOOGLE_OAUTH2_KEY ? process.env.REACT_APP_SOCIAL_AUTH_GOOGLE_OAUTH2_KEY : ""
export const googleOAuth2Secret = process.env.REACT_APP_SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET ? process.env.REACT_APP_SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET : ""
export const googleOAuth2LoginRedirectUrl = process.env.REACT_APP_SOCIAL_AUTH_LOGIN_REDIRECT_URL ? process.env.REACT_APP_SOCIAL_AUTH_LOGIN_REDIRECT_URL : ""
export const validationUrl = process.env.REACT_APP_VALIODATION_URL ? process.env.REACT_APP_VALIODATION_URL : ""
export const googleAuthUrl = process.env.REACT_APP_GOOGLE_AUTH_URL ? process.env.REACT_APP_GOOGLE_AUTH_URL : ""

export const VERSION = process.env.REACT_APP_VERSION ? process.env.REACT_APP_VERSION : ""
export const OTP_EXPIRY_TIME:number = process.env.REACT_APP_OTP_EXPIRY_TIME ? Number(process.env.REACT_APP_OTP_EXPIRY_TIME) : 300