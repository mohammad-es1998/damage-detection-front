import { FC, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Lazy load the components
const Home = React.lazy(() => import("@routes/home/home"));
const Car = React.lazy(() => import("@routes/car/car"));
const Damage = React.lazy(() => import("@routes/damage/damage"));
const Report = React.lazy(() => import("@routes/report/report"));
const MainLayout = React.lazy(
  () => import("@components/general/layouts/main/main-layout")
);

const AppRouter: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <MainLayout />
        </Suspense>
      ),
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "/car",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Car />
            </Suspense>
          ),
        },
        {
          path: "/damage",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Damage />
            </Suspense>
          ),
        },
        {
          path: "/report",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Report />
            </Suspense>
          ),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default AppRouter;
