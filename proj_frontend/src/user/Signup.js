import React from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'

const Signup = () => {

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input className="form-control rounded" type="text" />
                        </div>
                        <div className="form-group mt-4">
                            <label className="text-light">Email</label>
                            <input className="form-control rounded" type="email" />
                        </div>
                        <div className="form-group mt-4">
                            <label className="text-light">Password</label>
                            <input className="form-control rounded" type="password" />
                        </div>
                        <button className="btn btn-success btn-block mt-4 rounded-pill">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
    return (
        <Base title="SignUp Page" description="New here ? Join us now!">
            <h1>Sign Up Page</h1>
            {signUpForm()}
        </Base>
    )
}

export default Signup
