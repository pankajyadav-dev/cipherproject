
import './App.css';
import {createBrowserRouter , RouterProvider} from 'react-router-dom';
import LoginScreen from './screen/login';
import SignUpScreen from './screen/signup';
import HomeScreen from './screen/homescreen';
import AddBookScreen from './screen/addbookscreen';
import ProtectedRoute from './components/ProtectedRoute';
import TotalBookScreen from './screen/totalbookscreen';
import AdminPanel from './screen/adminpanel';

const router = createBrowserRouter([{
  path: "/",
  element: <ProtectedRoute><HomeScreen /></ProtectedRoute>,
},
{
  path: "/login",
  element: <LoginScreen />,
},
{path: "/signup",
  element: <SignUpScreen />,
},
{
  path: "/add-book",
  element: <ProtectedRoute requireAdmin={true}><AddBookScreen /></ProtectedRoute>,
},
{
  path: "/all-books",
  element: <ProtectedRoute><TotalBookScreen /></ProtectedRoute>,
},
{
  path: "/admin-panel",
  element: <ProtectedRoute requireAdmin={true}><AdminPanel /></ProtectedRoute>,
}
]);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
