import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import React from "react";
import api from "../api/interceptor";

const ProtectedRoute = ({children}) => {
  const [user, setUser] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("auth/admin/profile/me");
        console.log("PROTECTED_ROUTE",res.data.data);
        if (res.data.data.role === 'user') {
          setUser(null);
          return;
        }

        setUser(res.data.data);
        localStorage.clear();
        localStorage.setItem("uname", res.data.data.name);
        localStorage.setItem("role", res.data.data.role);

        window.dispatchEvent(new Event("userUpdated"));

      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(()=>{
    console.log(user)
  },[user])

  if(loading) return <Loading/>

  if (user === undefined) return <Loading/>;

  if (user == null) return <Navigate to="/login" replace />;

  return React.cloneElement(children, { user });
};

export default ProtectedRoute;