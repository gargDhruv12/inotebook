import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from '../Components/ui/button';
import { BookOpen, LogOut, User, Home, Info, Menu } from 'lucide-react';

const Navbar = ({ onOpenSidebar }) => {
  let navigate = useNavigate();
  let location = useLocation()
  const [username, setUsername] = useState(localStorage.getItem('username'));

  useEffect(() => {
    const onStorage = () => setUsername(localStorage.getItem('username'));
    window.addEventListener('storage', onStorage);
    // Also update on mount and when token changes
    setUsername(localStorage.getItem('username'));
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUsername(null);
    navigate("/login")
  }
  
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Hamburger menu for mobile */}
            {localStorage.getItem('token') && (
              <button
                className="md:hidden mr-2 p-2 rounded hover:bg-accent focus:outline-none"
                onClick={onOpenSidebar}
                aria-label="Open sidebar"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
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
            {username && localStorage.getItem('token') && (
              <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-base">
                <User className="h-5 w-5 mr-1" />
                <span className="max-w-[120px] truncate">{username}</span>
              </div>
            )}
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
