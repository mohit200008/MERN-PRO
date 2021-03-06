import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const currentTab = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#3DBE29" }
    } else {
        return { color: "#1C8D73" }
    }
}

const Menu = ({ history }) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark rounded-pill">
                <li className="nav-item">
                    <Link style={currentTab(history, "/")} className="nav-link rounded-pill" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history, "/cart")} className="nav-link rounded-pill" to="/cart">Cart</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history, "/user/dashboard")} className="nav-link rounded-pill" to="/user/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history, "/admin/dashboard")} className="nav-link rounded-pill" to="/admin/dashboard">Ad. Dashboard</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history, "/signin")} className="nav-link rounded-pill" to="/signin">Sign In</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history, "/signup")} className="nav-link rounded-pill" to="/signup">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history, "/signout")} className="nav-link rounded-pill" to="/signout">Signout</Link>
                </li>
            </ul>
        </div>
    )
}

export default withRouter(Menu);
