import React, {useState} from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Form from '../../components/form/form.component';
import Input from '../../components/input/input.component';
import Loader from '../../components/loader/loader.component';

import "./login.styles.css";

const Login = ({setBearer}) => {
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const prevBearer = JSON.parse(localStorage.getItem("user"));
        if(prevBearer) {
            setBearer(prevBearer);
            navigate("/")
        } else {
            setLoader(false)
        }
    })

    const initData = {
        email: '',
        password: '',
    }

    const [data, setData] = useState(initData);

    const changeData = (e) => {
        const {value, name} = e.target;

        setData({
            ...data,
            [name]: value,
        })
    }

    const submitData = (e) => {
        e.preventDefault();
        setLoader(true)

        fetch("https://modular-ap.herokuapp.com/api/user/login", {
            method: "POST", 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message)
            if(data.token) {
                const user = {token: data.token, perm: data.canCreateCrudItem}
                localStorage.setItem("user", JSON.stringify(user))
                setBearer(user)
                navigate("/")
            }
            setLoader(false)
        })
        .catch(err => alert(err.message))
    }

    return (
        !loader ? 
        <div className="login-page">
            <div className="page-content">
                <h1 className='page-header'>Login</h1>
                <Form>
                    <Input label="Email" inpValue={data["email"]} type="email" placeholder="enter your email" name="email" changeData={changeData} required/>
                    <Input label="Password" inpValue={data["password"]} type="password" placeholder="enter your password" changeData={changeData} name="password" required/>

                    <button type='button' className='btn btn-login' onClick={(e) => submitData(e)}>Log In</button>
                </Form>
            </div>
        </div> : <Loader />
    )
}

export default Login