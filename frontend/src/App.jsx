import { Home } from "./pages/home"
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Layout } from "./layout/layout"
import { CodeForces } from "./pages/codeforces"
import { CodeChef } from "./pages/codechef"
import { LeetCode } from "./pages/LeetCode"
import './App.css'
import { ErrorPage } from "./pages/error"
import { NotFound } from "./pages/NotFound"

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      children: [
        {
          path: '/',
          element: <Home/>
        },
        {
          path: '/codechef',
          element: <CodeChef/>
        },
        {
          path: '/codeforces',
          element: <CodeForces/>
        },
        {
          path: '/leetcode',
          element: <LeetCode/>
        },
        {
          path: '/notfound',
          element: <ErrorPage/>
        },
        {
          path: '/nodataavailable',
          element: <NotFound/>
        }
      ]
    }
  ])
  const query = new QueryClient()
  return (
    <>
    <QueryClientProvider client={query}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
    </>
  )
}

export default App