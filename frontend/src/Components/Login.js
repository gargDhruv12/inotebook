import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials,setCredentials] = useState({email : "",password : ""});
    let navigate = useNavigate();    // Note in latest versions of React navigate has been used in place of useHistory
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email : credentials.email, password : credentials.password})
        });
        // if (!response.ok) {
        //     throw new Error('Network response was not ok');
        // }

        const json = await response.json();
        console.log(json);
        if(json.success){
            // redirect
            localStorage.setItem('token',json.authtoken);
            navigate('/');
            props.showAlert("Logged in Successfully","success");
        }
        else{
            props.showAlert("Invalid Credentials","danger");
        }
    }
    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name] : e.target.value})
    }

    return (
        <div className="flex justify-center bg-background py-12">
            <div className="w-full max-w-md bg-white dark:bg-card rounded-lg shadow-lg p-8 mx-2 my-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Login to continue to iNotebook</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email address</label>
                        <input type="email" className="form-control w-full px-3 py-2 border rounded" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text text-xs text-muted-foreground">We'll never share your email with anyone else.</div>
                    </div>
                    <div>
                        <label htmlFor="Password" className="block text-sm font-medium mb-1">Password</label>
                        <input type="password" className="form-control w-full px-3 py-2 border rounded" id="password" name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary w-full py-2 mt-2">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login
