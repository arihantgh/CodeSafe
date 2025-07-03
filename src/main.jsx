import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TextEditor from './components/TextEditor.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from './components/Home.jsx'
import Notes from './components/Notes.jsx'
import { IdContextProvider } from './context/IdContext.jsx'

const router = createBrowserRouter([
  {
    path:'/editor',
    element:<TextEditor/>
  },
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/notes',
    element:<Notes/>
  }
]);

createRoot(document.getElementById('root')).render(
  <IdContextProvider>
  < RouterProvider router = { router } />
  </IdContextProvider>
);
