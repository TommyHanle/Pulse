import './AuthPage.css';
import SignUpForm from '../../components/SignUpForm/SignUpForm'
import LoginForm from '../../components/LoginForm/LoginForm'

export default function AuthPage({ setUser }) {
    return (
        <div>
            <h2>PULSE</h2>
            <div className="container">
                <div className="form-container">
                    <h3>Sign Up</h3>
                    <SignUpForm setUser={setUser} />
                </div>
                <div className="form-container">
                    <h3>Login</h3>
                    <LoginForm setUser={setUser} />
                </div>
            </div>
        </div>
    )
}
