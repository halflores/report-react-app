import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          Usuario:&nbsp;<strong>{currentUser.nombre}</strong>
        </h3>
      </header>
      <p>
        <strong>Id:</strong>&nbsp;{currentUser.idUsuario}
      </p>
      <p>
        <strong>Correo:</strong>&nbsp;{currentUser.estado}
      </p>
      <strong>Permisos:</strong>
{/*       <ul>
        {currentUser.roles &&
          currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
      </ul> */}
    </div>
  );
};

export default Profile;
