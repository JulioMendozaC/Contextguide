import {createContext, useContext, useEffect, useState} from "react";
import {loginRequest, registerRequest, verifyTokenRequest} from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth most be used whithin an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [isloading, setLoading] = useState(true)


  const singin = async (user) => {
    try {
      const res = await loginRequest(user);
      setIsAuthenticated(true);
      setUser(res.data);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };
  const singup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const logout = () =>{
    Cookies.remove("token")
    setIsAuthenticated(false)
    setUser(null)
  } 
  
  useEffect(() => {
    const cookies = Cookies.get();
    async function CheckLogin() {
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false)
        return setUser(null)
      }
        try {
          const res = await verifyTokenRequest(cookies.token);
          if (!res.data) {
            setIsAuthenticated(false);
            setLoading(false)
            return
          }
          
          setIsAuthenticated(true)
          setUser(res.data);
          setLoading(false)
        } catch (error) {
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false)

        }
      
    }
    CheckLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        singup,
        singin,
        logout,
        isloading,
        user,
        isAuthenticated,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
