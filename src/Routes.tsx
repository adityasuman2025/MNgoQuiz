import { memo, Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FullScreenLoader } from "./comps";

//lazy loading split the main bundle into many chunks
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
            element: <AdminLogin />,
        }
    ]);

    return (
        <Suspense fallback={<FullScreenLoader />}>
            <RouterProvider router={router} />;
        </Suspense>
    )
}

export default memo(Routes);