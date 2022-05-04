import React, {useContext, useEffect, useState} from "react";
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {AuthContext} from '../context/Auth.context';

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    });

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError])
    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message);
        } catch (e) {}
    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId);
        } catch (e) {}
    }
    return (
        <div className="row">
            <div className="col s6 offset-s3" style={{marginTop: 200}}></div>
                <input
                    placeholder="email"
                    id="email"
                    type="text"
                    name="email"
                    value={form.email}
                    className="validate"
                    onChange={changeHandler}
                />
                <label htmlFor="email">email</label>
                <input
                    placeholder="password"
                    id="password"
                    type="text"
                    name="password"
                    className="validate"
                    value={form.password}
                    onChange={changeHandler}
                />
                <label htmlFor="password">password</label>

                <div>
                    <button
                        onClick={loginHandler}
                        disabled={loading}
                    >Sign in</button>
                    <button
                        onClick={registerHandler}
                        disabled={loading}
                    >Sign up</button>
                </div>
            </div>
        </div>
    )
}
