import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom'
import { AUTH } from '../../constants/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Login = () => {
    const history = useHistory();
    const { register, errors, handleSubmit } = useForm({
        defaultValues: {
            email: '',
            password:''
        }
    });

    const btnLogin = (data) => {
        if (data.email === AUTH.EMAIL && data.password === AUTH.PASSWORD) {
            history.push({ pathname: '/list' });
        } else {
            toast.error('Invalid email or password.')
      }
    }
    return (
        <div className="d-flex main hw100">
            <div className="form-signin mwmt">
                <div className="card shadow-sm">
                    <div className="card-header fw-bold">Login</div>
                    <div className="card-body p-4">
                        <div className="col-md-12">
                            <label className="form-label fw-bold">Email</label>
                            <input type="text" className="form-control" placeholder="Email" name="email"
                                ref={register({
                                    required: true,
                                    pattern:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                })} />
                            {(errors && errors.email && errors.email.type === 'required') && <span className="text-danger">Email is Required.</span>}
                            {(errors && errors.email && errors.email.type === 'pattern') && <span className="text-danger">Invalid Email.</span>}
                        </div>
                        <div className="col-md-12 mt-2">
                            <label className="form-label fw-bold">Password</label>
                            <input type="password" className="form-control" placeholder="Password" name="password" ref={register({ required: true })} />
                            {(errors && errors.password && errors.password.type === 'required') && <span className="text-danger">Password is Required.</span>}
                        </div>
                        <div className="d-flex justify-content-end mt-4 ">
                            <button className="btn btn-primary" onClick={handleSubmit(btnLogin)}>Sign In</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
