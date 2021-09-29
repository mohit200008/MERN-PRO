import React from 'react'
import { Link } from 'react-router-dom'
import Base from '../core/Base'


const Signin = () => {

    const signInForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
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
        <Base title="Sign in Page" description="Welcome back,Please enter your credentials">
            <h1>Sign IN Page</h1>
            {signInForm()}
        </Base>
    )
}

export default Signin
