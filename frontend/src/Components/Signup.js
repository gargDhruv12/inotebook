import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials,setCredentials] = useState({name : "", email : "",password : "",cpassword : ""});
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password} = credentials;
    const response = await fetch(`https://inotebook-4v99.onrender.com/api/auth/createuser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name,email,password})
    });
    
    const json = await response.json();
    console.log(json);
    if(json.success){
        localStorage.setItem('token',json.authtoken);
        // Fetch user name after signup
        try {
            const userRes = await fetch('https://inotebook-4v99.onrender.com/api/auth/getuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': json.authtoken
                }
            });
            const userData = await userRes.json();
            if(userData && userData.name) {
                localStorage.setItem('username', userData.name);
            }
        } catch (err) {
            // fallback: clear username if fetch fails
            localStorage.removeItem('username');
        }
        navigate('/');
        props.showAlert("Account created Successfully","success");
    }
    else{
        props.showAlert("Invalid Details","danger");
    }
}
const onChange = (e)=>{
    setCredentials({...credentials,[e.target.name] : e.target.value})
}

  return (
    <div className="min-h-screen flex items-center justify-center" style={{
      backgroundImage: `url(${process.env.PUBLIC_URL + '/notes_bg.jpg'})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <div className="w-full max-w-md bg-white/80 dark:bg-card/80 rounded-lg shadow-lg p-8 mx-2 backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign up to use iNotebook</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <input type="text" className="form-control w-full px-3 py-2 border rounded" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text text-xs text-muted-foreground">We'll never share your name with anyone else.</div>
          </div>
          <div>
            <label htmlFor="exampleInputEmail1" className="block text-sm font-medium mb-1">Email address</label>
            <input type="email" className="form-control w-full px-3 py-2 border rounded" id="exampleInputEmail1" name='email' onChange={onChange} aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text text-xs text-muted-foreground">We'll never share your email with anyone else.</div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input type="password" className="form-control w-full px-3 py-2 border rounded" id="password" name='password' onChange={onChange} minLength={5} required/>
          </div>
          <div>
            <label htmlFor="cpassword" className="block text-sm font-medium mb-1">Confirm Password</label>
            <input type="password" className="form-control w-full px-3 py-2 border rounded" id="cpassword" name='cpassword' onChange={onChange} minLength={5} required />
          </div>
          <button type="submit" className="btn btn-primary w-full py-2 mt-2">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
