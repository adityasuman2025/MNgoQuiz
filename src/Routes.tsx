import { useEffect, memo, Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FullScreenLoader from "mngo-project-tools/comps/FullScreenLoader";
import { sendRequestToAPI } from "mngo-project-tools/utils";
import { API_BASE_URL, API_COUNTER_REF, PROJECT_NAME } from "./constants";

//lazy loading split the main bundle into many chunks
const Home = lazy(() => import('./pages/Home'));
const Quiz = lazy(() => import('./pages/Quiz'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

function Routes() {
    useEffect(() => {
        sendRequestToAPI(API_BASE_URL, `${API_COUNTER_REF}?appName=${PROJECT_NAME.split(" ").join("")}&location=${encodeURI(window.location.href)}`)
    }, []);

    const router = createBrowserRouter([
        {
            path: "/admin",
            element: <AdminLogin />,
        },
        {
            path: "/admin-dashboard",
            element: <AdminDashboard />,
        },
        {
            path: "/quiz/:quizName",
            element: <Quiz />,
        },
        {
            path: "*",
            element: <Home />,
        }
    ]);

    return (
        <Suspense fallback={<FullScreenLoader styles={{ loaderClassName: "mngo-loader", className: "mngo-quiz-background" }} />}>
            <RouterProvider router={router} />
        </Suspense>
    )
}

export default memo(Routes);