import React, { useState } from 'react';
import { use } from 'react';

function Contraseña(){
  const [user, setuser] = useState('');
  const[pass, setpass] = useState('');
  const[mostrar, setmostrar] = useState(false);

  const actualizauser = (e) => {
    setuser(e.target.value);
  };

  const actualizapass = (e) => {
    setpass(e.target.value);
  };

  const mostrarpass = () => {
    setmostrar(!mostrar);
  };

  const evaluarfuerza = (pass) => {
  let fuerza = 0;
  if(!pass) return '';

  if(pass.length >= 8) fuerza++;
  if(/[a-z]/.test(pass)) fuerza++;
  if(/[A-Z]/.test(pass)) fuerza++;
  if(/[\d]/.test(pass)) fuerza++;
  if(/[^A-Za-Z0-9]/.test(pass)) fuerza++;

  if(fuerza <= 2) return 'Contraseña poco segura.';
  if(fuerza === 3 || fuerza === 4) return 'Constraseña segura';
  if(fuerza > 4) return 'Contraseña muy segura';
  };

  return(
    <div className='divregistro'>
      <h1 className='h1registro'>Registre su cuenta.</h1>
      <Ingresousuario user={user} onChange={actualizauser} />
      <Ingresopass pass={pass} mostrar={mostrar} onChange={actualizapass} visibilidad={mostrarpass} />
      <Indicafuerza strength={evaluarfuerza(pass)} />
    </div>
  );
};

const Ingresousuario = ({ user, onChange }) => {
  return(
    <div className='divingreso'>
      <input
        type="text"
        value={user}
        onChange={onChange}
        className="inputdatos"
        placeholder='Ingresa tu nomre de usuario'
      />
    </div>
  );
};

const Ingresopass = ({pass, visibilidad, actualizapass, mostrarpass}) => {
  return(
    <div className='divingreso'>
      <input
      type={mostrarpass ? 'text' : 'password'}
      value={pass}
      onChange={actualizapass}
      className="inputdatos"
      placeholder="Ingresa tu Contraseña"
      />
    <button onClick={mostrarpass} className='mostrarpass'>
      {visibilidad ? 'Ocultar' : 'Mostrar'} contraseña
    </button>
    </div>
  );
};

const Indicafuerza = ({ fuerza }) => {
  return(
    <div>
      <p className='mostrarfuerza'>Fuerza: <span>{fuerza}</span></p>
    </div>
  );
};

export default App;