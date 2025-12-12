import './App.css';
import UserTable from './getuser/UserTable';
import UserForm from './addUser/UserForm';
import Update from './updateUser/Update';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { Toaster } from 'react-hot-toast';



function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserTable />,
    },
    {
      path: "/add",
      element: <UserForm />,
    },
    {
      path: "/update/:id",
      element: <Update />,
    },
  ]);

  return (
    <div className="App">
       <Toaster />
      <RouterProvider router={router} > </RouterProvider>
    </div>
  );
}

export default App;

// video no 15
// https://youtu.be/kGBcONgVC3Q
