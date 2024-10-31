import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Signin from './Pages/Signin'
import Signup from './Pages/Signup'
import './App.css'
import Blog from './Pages/Blog'
import CreateBlog from './components/CreateBlog'
import FullBlog from './components/FullBlog'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  
  const routes = createBrowserRouter([
    {
      path: "/",
      element: localStorage.getItem('token') ? 
               <Navigate to="/blog" replace /> : 
               <Navigate to="/signin" replace />
    },
    {path: "/signin", element : <Signin/>},
    {path: "/signup", element : <Signup/>},
    {path: "/blog", element : <ProtectedRoute><Blog/></ProtectedRoute>},
    {path: "/createblog", element : <ProtectedRoute><CreateBlog/></ProtectedRoute>},
    {path: "/blog/:id", element : <ProtectedRoute><FullBlog/></ProtectedRoute>}
  ])
  return (
      <>
        <RouterProvider router={routes}></RouterProvider>
      </>
  )
}

export default App
