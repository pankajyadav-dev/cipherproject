
import './App.css';
import {createBrowserRouter , RouterProvider} from 'react-router-dom';
import LoginScreen from './screen/login';
import SignUpScreen from './screen/signup';
import HomeScreen from './screen/homescreen';
const router = createBrowserRouter([{
  path: "/",
  element: <HomeScreen />,
},
{
  path: "/login",
  element: <LoginScreen />,
},
{path: "/signup",
  element: <SignUpScreen />,
}
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
