import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button} from "@chakra-ui/react";

export default function Logout(){
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const sessionUser:string|null = localStorage.getItem("user");
    console.log('sessionUser : ', sessionUser)
    if (sessionUser) {
      const jsonObj = JSON.parse(sessionUser);
      const user = jsonObj.name
      setUser(user);
    }

  }, []);

  const handleLogout = async () =>{
    // const logout = fetchApi<logoutResponse>(`${baseUrl}/logout`, user);
    const response = await fetch(
      baseUrl +`/logout`,
      {
        method: "POST",
        credentials: 'include', // 세션 쿠키 포함
        headers: {
          "Content-Type": "application/json",
        },
        body: ''
      }
    );
    const result = await response.json();
    console.log('result : ', result)
    navigate('/');
  }

  return(
    <div className="absolute top-4 right-4">
      <span>{user}</span>
      <Button
        onClick={()=>{ handleLogout()}}
        colorScheme='blue'
        size='sm'
      >
        Logout
      </Button>
    </div>
  )
}