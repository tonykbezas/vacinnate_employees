import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { helpHttp } from "../../helpers/helpHttp";
import { useForm } from "../../hooks/useForm";
import { UserContext } from "../admin/UserContext";


export const LoginScreen = () => {
    
    const {user, setUser} = useContext(UserContext)

    const navigate = useNavigate();
    let initialState = {
        usuario:'',
        contrasenia: ''
    }
    

    const validateForm = (formValues) => {
        let errors ={}
        if (!formValues.usuario.trim()){
            errors.usuario = 'Campo usuario vacio';
        }
        if (!formValues.contrasenia.trim()){
            errors.usuario = 'Campo contraseña vacio';
        }
        return errors
    };

    const api = helpHttp();
    let url = "http://localhost:5000/usuario?usuario=";

    const [ formValues, handleInputChange, 
            setValues, handleInputBlur, error, setError ] = useForm(initialState,validateForm);
    const handleLogin = async (e) => {
        e.preventDefault();
        const user = await api.get(url+formValues.usuario);

        if (user.length != 0){
            if (formValues.usuario == user[0].usuario && formValues.contrasenia == user[0].contrasenia){
                setUser(user[0]);
                if (user[0].tipo == 'admin'){
                    navigate('admin',{
                        replace:true
                    })
                }else{
                    navigate('employee',{
                        replace:true
                    })
                }
            }
        }


        
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

                    <form onSubmit={handleLogin}>
                        <div className="form-group position-relative has-icon-left mb-4">
                            <input type="text" className="form-control form-control-xl" 
                                    placeholder="Username"
                                    value={formValues.usuario}
                                    id="usuario"
                                    name="usuario"
                                    onChange={handleInputChange} />
                            <div className="form-control-icon">
                                <i className="bi bi-person"></i>
                            </div>
                        </div>
                        <div className="form-group position-relative has-icon-left mb-4">
                            <input type="password" className="form-control form-control-xl" 
                                    placeholder="Password" 
                                    id="contrasenia"
                                    name="contrasenia"
                                    value={formValues.contrasenia}
                                    onChange={handleInputChange} />
                            <div className="form-control-icon">
                                <i className="bi bi-shield-lock"></i>
                            </div>
                        </div>
                        <button className="btn btn-primary btn-block btn-lg shadow-lg mt-5" type="submit">Log in</button>
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