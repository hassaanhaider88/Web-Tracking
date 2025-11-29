import { createContext, useEffect, useState } from "react";
import { BackEndURI } from "../utils/api";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [UserData, setUserData] = useState({});
  useEffect(() => {
    getUserData();
    console.log(UserData);
  }, [window.location.pathname]);
  const getUserData = async () => {
    var res = await fetch(`${BackEndURI}/api/user`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ wt_token: localStorage.getItem("wt_token") }),
    });
    const data = await res.json();
    if(!data){
      setUserData({})
    }else{
      setUserData(data.userData);
    }
  };
  return (
    <UserContext.Provider value={{ UserData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
