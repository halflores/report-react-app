import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import ParamService from "../services/parametro.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="invalid-feedback d-block">
        El campo es requerido!
      </div>
    );
  }
};

const Login = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [parametro, setParametro] = useState({});

  const navigate = useNavigate();

  async function requestAxios() {
    const data = await ParamService.getParametro();
    setParametro(data.data);
  }
  
/*   useEffect(async() => {
     requestAxios()
  }, []); */

  useEffect(() => {
    requestAxios();
  }, []); // Or [] if effect doesn't need props or state

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        (response) => {
/*           if (response.data.idUsuario != 0) {
            navigate("/report");
            window.location.reload();
          }
          else{
            setMessage("usuario o contraseña incorrecta");
            setLoading(false);
          } */
          if (response.data.response.mensaje == "exito") {
            localStorage.setItem("user", JSON.stringify(response.data.usuario));
            navigate("/report");
            window.location.reload();
          }
          else{
            setMessage(response.data.response.mensaje);
            setLoading(false);
          }
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <h1>Bienvenido!!!</h1>
        <h3>Gestion activa: {parametro.gestion}</h3> 
        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <br></br>
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>&nbsp;Iniciar sesión</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <br></br>
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
