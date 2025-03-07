import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthComponent from "./components/AuthComponent";
import {  isAuthenticated, logout } from './services/AuthService';
import { useEffect, useState } from "react";
import http from "./http-common";
import Recipe from "./types/Recipe";
import RecipeTable from "./components/RecipeTableComponent";
import AddRecipeComponent from "./components/AddRecipeComponent";
import EditRecipeComponent from "./components/EditRecipeComponent";
import ShowRecipeComponent from "./components/ShowRecipeComponent";
import { UserProvider } from './components/UserContextComponent';
import AboutComponent from "./components/AboutComponent";
import logo from "./assets/images/logo.webp";

function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  
  useEffect( () => {
    http.get(`/recipes?search=${searchTerm}`)
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => console.error("Error fetching recipes:", error));
      
    }, [searchTerm]);

  return (
    <>
          <div>
            <div>
              <header>

              
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid ">
                    <a className="navbar-brand fw-bold" href="/" title="Recipe Management System">
                    <img className="brand-img" src={logo} alt="" style={{height: "44px",margin: "5px 0px",}}/> Kitchen Friend
                    </a>
                    <div className="d-flex align-items-center">
                      <div className="search-box me-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <div className="me-3">
                          <a className="btn btn-small" href="/">Home</a>
                        </div>
                      <div className="me-3">
                          <a className="btn btn-small" href="/about">About</a>
                        </div>
                        {!isAuthenticated() ?

                        <div className="me-3">
                          <a className="btn btn-small btn-danger" href="/login">Login / Register</a>
                        </div> :
                          <>
                        
                            <div className="me-3">
                              <a className="btn btn-small" href="/addRecipe">Add Recipe</a>
                            </div>
                           
                            <div className="me-3">
                                <a className="btn btn-small btn-danger" onClick={logout}>Logout</a>
                            </div>
                          </>
                      }
                  </div>
                </div>
              </nav>
              </header>
            </div>
            <div>
            <Routes>
            
              <Route path="/" element={<UserProvider><RecipeTable recipes={recipes} /> </UserProvider>} />
              <Route path="/login" element={<AuthComponent  />} />
              <Route path="/addRecipe" element={<UserProvider><AddRecipeComponent token={token}  /></UserProvider>} />
              <Route path="/edit/:id" element={<UserProvider><EditRecipeComponent /></UserProvider>} />
              <Route path="/recipe/:id" element={<ShowRecipeComponent />} />
              <Route path="/about" element={<AboutComponent />} />
            </Routes>
            </div>
          </div>
    </>
  )
}

export default App;
