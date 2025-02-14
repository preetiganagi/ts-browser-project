// import { useState } from 'react'
// import './App.css'
import UserCard from "./UserCard";
import UserList from './User/userListClass';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TutorialsList from "./components/tutorialsList-component";
import AddTutorial from "./components/add-tutorial-component";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>        
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div> */}
      {/* <UserCard name="Alice" age={25} />
      <UserList /> */}
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="navbar-nav mr-auto">
            <li className="nav-item"> 
              <a className="navbar-brand nav-link active" aria-current="page" href="/">Tutorials</a>
            </li>
            <li className="nav-item">
              <a className="navbar-brand nav-link active" aria-current="page" href="/add" >Add</a>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
         
        </div>
      </div>
      <div className="container mt-3">
          <Routes>
            <Route path="/" element={<TutorialsList />} />
            <Route path="/add" element={<AddTutorial />} />
            </Routes>
        </div>
    </>
  )
}

export default App;
