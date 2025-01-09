import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Viewproducts from './components/Viewproducts'
import Addproducts from './components/Addproducts'
import Productstable from './components/Productstable'
import Editproducts from './components/Editproducts'
import Userregister from './components/Userregister'
import Login from './components/Login'
import Profile from './components/Profile'


function App() {
  return (
<div>
<BrowserRouter>
  <Routes>
  
   <Route path="/" element={<Viewproducts />}>View all Product</Route>
   
   <Route path="/insert" element={<Addproducts />}>Insert Product</Route>
   
   <Route path="/productlist" element={<Productstable />}>Insert Product</Route>
   <Route path="/editproduct" element={<Editproducts />}>Insert Product</Route>
   
   <Route path="/register" element={<Userregister />}>Register</Route>
   <Route path="/login" element={<Login />}>Login</Route>
   
   <Route path="/profile" element={<Profile />}>Profile</Route>
   

  </Routes>
</BrowserRouter>

</div>
  );
}

export default App;
