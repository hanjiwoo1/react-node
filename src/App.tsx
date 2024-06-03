import {useEffect} from 'react'
import './App.css'

function App() {

  const apiUrl = "http://localhost:8080/api";

  useEffect(() => {``
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => console.log(data));
  },[]);

  return (
    <>
      <div className="">node db 연동중</div>
    </>
  )
}

export default App
