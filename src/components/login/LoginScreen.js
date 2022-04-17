import { useNavigate } from "react-router-dom"


export const LoginScreen = () => {

    const navigate = useNavigate();

    const handleLogin = () =>{
        navigate('admin',{
            replace:true
        })
    }

    return (
        <>
        <div className="row h-100">
            <div className="col-lg-5 col-12">
                <div id="auth-left">
                    <div className="auth-logo">
                    </div>
                    <h1 className="auth-title">Log in.</h1>
                    <p className="auth-subtitle mb-5">Log in with your data that you entered during registration.</p>

                    <form action="index.html">
                        <div className="form-group position-relative has-icon-left mb-4">
                            <input type="text" className="form-control form-control-xl" placeholder="Username"/>
                            <div className="form-control-icon">
                                <i className="bi bi-person"></i>
                            </div>
                        </div>
                        <div className="form-group position-relative has-icon-left mb-4">
                            <input type="password" className="form-control form-control-xl" placeholder="Password"/>
                            <div className="form-control-icon">
                                <i className="bi bi-shield-lock"></i>
                            </div>
                        </div>
                        <button className="btn btn-primary btn-block btn-lg shadow-lg mt-5" onClick={handleLogin}>Log in</button>
                    </form>
                    <div className="text-center mt-5 text-lg fs-4">
                        <p className="text-gray-600">Don't have an account? <a href="auth-register.html"
                                className="font-bold">Sign
                                up</a>.</p>
                        <p><a className="font-bold" href="auth-forgot-password.html">Forgot password?</a>.</p>
                    </div>
                </div>
            </div>
            <div className="col-lg-7 d-none d-lg-block">
                <div id="auth-right">

                </div>
            </div>
        </div>
        </>
    )
}