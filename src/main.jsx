import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './Layouts/RootLayout.jsx';
import Home from './Components/Home/Home.jsx';
import AllProducts from './Components/AllProducts/AllProducts';
import AuthProvider from './Context/AuthProvider.jsx';
import Register from './Components/Register/Register.jsx';
import MyProducts from './Components/MyProducts/MyProducts.jsx';
import MyBids from './Components/MyBids/MyBids.jsx';
import PrivateRoute from './Layouts/PrivateRoute.jsx';
import ProductDetailse from './Components/ProductDetailse/ProductDetailse.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
   children:[
   {
     index: true,
     Component:Home,
   },
   {
    path: 'allproducts',
    Component: AllProducts,
   },
   {
    path:'register',
    Component: Register,
   },
   {
    path: 'myProducts',
   element: (
          <PrivateRoute>
            <MyProducts />
          </PrivateRoute>
        ),
   },
   {
    path: 'myBids',
     element: (
          <PrivateRoute>
            <MyBids />
          </PrivateRoute>
        ),
   },
   {
    path: 'productDetailse/:id',
    loader: ({params}) => fetch(`http://localhost:5000/products/${params.id}`),
    element: <ProductDetailse/>,
   },

   ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
      <RouterProvider router={router} />
   </AuthProvider>
  </StrictMode>,
)
