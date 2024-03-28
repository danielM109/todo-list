import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { supabase } from './api/config'

import Body from "./components/pages/Body.tsx";
import SingUpForm from "./components/pages/SignUpForm.tsx";
import LoginForm from "./components/pages/LoginForm.tsx";

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        navigate("/todo-list");
      }
    });
  }, []);


  return (
    <Routes> 
      <Route path='/todo-list' element={<Body />} />
      {/* <Route path='/login' element={<Header />} /> */}
      <Route path='/signup' element={<SingUpForm />} />
      <Route path='/login' element={<LoginForm />} />
    </Routes>
  );
}