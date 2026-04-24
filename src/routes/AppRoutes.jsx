import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { routeConfig } from '@/routes/route-config'

const router = createBrowserRouter(routeConfig)

function AppRoutes() {
  return <RouterProvider router={router} />
}

export { AppRoutes }
