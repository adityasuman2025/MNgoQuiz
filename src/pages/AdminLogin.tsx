import { useState } from "react";
import WithoutAuth from "mngo-project-tools/hocs/WithoutAuth";
import LoginForm from "mngo-project-tools/comps/LoginForm";
import SnackBar from "mngo-project-tools/comps/SnackBar";
import { makeCookie } from "mngo-project-tools/utils";
import { verifyAdmin } from "../apis";
import { PROJECT_NAME, LOGGED_USER_TOKEN_COOKIE_NAME, COOKIE_EXPIRATION_TIME } from "../constants";

function AdminLogin() {
    const [showLoader, setShowLoader] = useState(false);
    const [snackBarData, setSnackBarData] = useState<{ [key: string]: any }>({ visisible: false, msg: "", type: "" });

    async function handleLoginClick(username: string, password: string) {
        setShowLoader(true);
        try {
            const { data: { userToken = "" } = {} } = await verifyAdmin(username, password) || {};

            if (userToken) {
                makeCookie(LOGGED_USER_TOKEN_COOKIE_NAME, userToken, COOKIE_EXPIRATION_TIME)
                return redirectToAdminDashboard();
            } else {
                makeSnackBar("Something went wrong");
            }
        } catch (e: any) {
            makeSnackBar(e.message);
        }
        setShowLoader(false);
    }

    function makeSnackBar(msg: string, type: string = "error") {
        setSnackBarData({ visisible: true, msg, type });
    }

    return (
        <div className='mngo-h-screen mngo-flex mngo-items-center mngo-justify-center'>
            <LoginForm
                styles={{ inputClassName: "mngo-light-input" }}
                projectTitle={PROJECT_NAME}
                isLoggingUser={showLoader}
                showError={(error: string) => { makeSnackBar(error) }}
                onLoginClick={handleLoginClick}
            />

            <SnackBar
                open={snackBarData.visisible}
                msg={snackBarData.msg}
                type={snackBarData.type}
                onClose={() => setSnackBarData({ visisible: false })}
            />
        </div>
    )
}

function redirectToAdminDashboard() {
    window.location.href = "/admin-dashboard";
}

export default WithoutAuth(AdminLogin, LOGGED_USER_TOKEN_COOKIE_NAME, redirectToAdminDashboard);