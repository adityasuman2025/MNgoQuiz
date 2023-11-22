import { memo, Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FullScreenLoader from "mngo-project-tools/comps/FullScreenLoader";

//lazy loading split the main bundle into many chunks
const Home = lazy(() => import('./pages/Home'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

function Routes() {
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
            path: "*",
            element: <Home />,
        }
    ]);

    return (
        <Suspense fallback={<FullScreenLoader styles={{ loaderClassName: "mngo-loader" }} />}>
            <RouterProvider router={router} />;
        </Suspense>
    )
}

export default memo(Routes);