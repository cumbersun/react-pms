import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';

import './App.css'
import Layout from './components/Layout'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />
  }
])

function App() {

  return (
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  )
}

export default App
