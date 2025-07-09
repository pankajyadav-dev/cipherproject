
import './App.css';
import {createBrowserRouter , RouterProvider} from 'react-router-dom';
import LoginScreen from './screen/login';
import SignUpScreen from './screen/signup';

const router = createBrowserRouter([{
  path: "/",
  element: <LoginScreen />,
},
{
  path: "/login",
  element: <LoginScreen />,
},
{path: "/signup",
  element: <SignUpScreen />,
},
{
  path: "/admin",
  element: <h1>Admin Dashboard</h1>,
},
{
  path: "/user",
  element: <h1>User Dashboard</h1>, 
}
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
