import React, { useState } from 'react';

const App = () => {
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
  if(!pass) return 'ninguna';

  if(pass.length >= 8) fuerza++;
  if(/[a-z]/.test(pass)) fuerza++;
  if(/[A-Z]/.test(pass)) fuerza++;
  if(/[\d]/.test(pass)) fuerza++;

  if (fuerza <= 2) return 'poco';
  if (fuerza === 3 || fuerza === 4) return 'media';
  return 'alta';

  };

  return(
    <div className='divregistro'>
      <h1 className='h1registro'>Registre su cuenta.</h1>
      <Ingresousuario user={user} onChange={actualizauser} />
      <Ingresopass pass={pass} mostrar={mostrar} onChange={actualizapass} visibilidad={mostrarpass} />
      <Indicafuerza fuerza={fuerza} />
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

const Ingresopass = ({pass, mostrar, onChange, visibilidad}) => {
  return(
    <div className='divingreso'>
      <input
      type={mostrar ? 'text' : 'password'}
      value={pass}
      onChange={onChange}
      className="inputdatos"
      placeholder="Ingresa tu Contraseña"
      />
    <button onClick={visibilidad} className='mostrarpass'>
      {mostrar ? 'Ocultar' : 'Mostrar'} contraseña
    </button>
    </div>
  );
};

const Indicafuerza = ({ fuerza }) => {

  if (fuerza === 'ninguna') return null;

  let mensaje = '';

  switch (fuerza) {
    case 'poco':
      mensaje = 'Contraseña poco segura';
      break;
    case 'media':
      mensaje = 'Contraseña segura';
      break;
    case 'alta':
      mensaje = 'Contraseña muy segura';
      break;
    default:
      mensaje = '';
      break;
  }
  
  return(
    <div>
      <p className={'mostrarfuerza'}>Fuerza: <span>{mensaje}</span></p>
    </div>
  );
};

export default App;