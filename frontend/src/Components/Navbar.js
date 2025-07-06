import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from '../Components/ui/button';
import { BookOpen, LogOut, User, Home, Info } from 'lucide-react';

const Navbar = () => {
  let navigate = useNavigate();
  let location = useLocation()
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/login")
  }
  
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">iNotebook</span>
            </Link>
            
            {localStorage.getItem('token') && (
              <div className="hidden md:flex items-center space-x-4">
                <Link to="/">
                  <Button 
                    variant={location.pathname === "/" ? "default" : "ghost"}
                    className="flex items-center space-x-2"
                  >
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Button>
                </Link>
                <Link to="/about">
                  <Button 
                    variant={location.pathname === "/about" ? "default" : "ghost"}
                    className="flex items-center space-x-2"
                  >
                    <Info className="h-4 w-4" />
                    <span>About</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {(!localStorage.getItem('token')) ? (
              <>
                <Link to="/login">
                  <Button variant="outline" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Login</span>
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Signup</span>
                  </Button>
                </Link>
              </>
            ) : (
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
