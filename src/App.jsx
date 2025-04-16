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

  const generarpassaleatorio = () => {
    const longitudMinima = 8;
    const caracteresMayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const caracteresMinusculas = 'abcdefghijklmnopqrstuvwxyz';
    const caracteresNumeros = '0123456789';
    const todosLosCaracteres = caracteresMayusculas + caracteresMinusculas + caracteresNumeros;

    let nuevaContraseña = '';
    const requisitos = [caracteresMayusculas, caracteresMinusculas, caracteresNumeros];

    // Se asuegura que al menos un carácter de cada requisito esté presente
    for (let i = 0; i < requisitos.length; i++) {
      const requisito = requisitos[i];
      nuevaContraseña += requisito.charAt(Math.floor(Math.random() * requisito.length));
    }

    // Genera el resto de la contraseña aleatoriamente
    const longitudRestante = Math.max(0, longitudMinima - nuevaContraseña.length);
    for (let i = 0; i < longitudRestante; i++) {
      nuevaContraseña += todosLosCaracteres.charAt(Math.floor(Math.random() * todosLosCaracteres.length));
    }

    // Baraja la contraseña para que los caracteres obligatorios no estén al principio
    nuevaContraseña = nuevaContraseña.split('').sort(() => Math.random() - 0.5).join('');

    setpass(nuevaContraseña);
  };

  const evaluarfuerza = (pass) => {
  let fuerza = 0;
  if(!pass) return 'ninguna';

  if(pass.length >= 8) fuerza = 3;
  if(/[a-z]/.test(pass)) fuerza++;
  if(/[A-Z]/.test(pass)) fuerza++;
  if(/[\d]/.test(pass)) fuerza++;

  if (fuerza <= 3) return 'poco';
  if (fuerza === 4 || fuerza === 5) return 'media';
  return 'alta';

  };

  const copiarpass = () => {
    if (pass) {
      navigator.clipboard.writeText(pass)
        .then(() => {
          alert('Contraseña copiada al portapapeles!');
        })
        .catch(err => {
          console.error('Error al copiar la contraseña: ', err);
          alert('No se pudo copiar la contraseña.');
        });
    } else {
      alert('No hay contraseña para copiar.');
    }
  };

  return(
    <div className='divregistro'>
      <h1 className='h1registro'>Registre su cuenta.</h1>
      <Ingresousuario user={user} onChange={actualizauser} />
      <Ingresopass pass={pass} mostrar={mostrar} onChange={actualizapass} visibilidad={mostrarpass} />
      <Indicafuerza fuerza={evaluarfuerza(pass)} />
      <button className="botonregistro">Registrar usuario</button>
      <button className="botoncopiar" onClick={copiarpass}>Copiar Contraseña</button>
      <button className="boton-generar-pass" onClick={generarpassaleatorio}>Generar Contraseña</button>
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
  let claseColor = '';

  switch (fuerza) {
    case 'poco':
      mensaje = 'Contraseña poco segura';
      claseColor = 'fuerza-poco';
      break;
    case 'media':
      mensaje = 'Contraseña segura';
      claseColor = 'fuerza-media';
      break;
    case 'alta':
      mensaje = 'Contraseña muy segura';
      claseColor = 'fuerza-alta';
      break;
    default:
      mensaje = '';
      claseColor = '';
      break;
  }

  return (
    <div className="fuerzapass">
      <p className={`font-semibold ${claseColor}`}>Fuerza: <span>{mensaje}</span></p>
    </div>
  );
};

export default App;