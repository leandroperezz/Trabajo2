import React, { useState } from 'react';
import PasswordInput from './components/PasswordInput';
import StrengthIndicator from './components/StrengthIndicator';
import UsernameInput from './components/UsernameInput';
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
    mostrar(!showPassword);
  };

  const evaluarfuerza = (pass) => {
  let cont = 0;
  if(!pass) return '';

  if(pass.length >= 8) cont++;
  if(/[a-z]/.test(pass)) cont++;
  if(/[A-Z]/.test(pass)) cont++;
  if(/[\d]/.test(pass)) cont++;
  if(/[^A-Za-Z0-9]/.test(pass)) cont++;

  if(cont <= 2) return 'Contraseña poco segura.';
  if(cont === 3 || cont === 4) return 'Constraseña segura';
  if(cont > 5) return 'Contraseña muy segura';
  else setfuerza('');
  }

  return(
    <div className='divingreso'>
      <h1 className='h1ingreso'>Registre su cuenta.</h1>
      <UsernameInput user={user} onChange={actualizauser} />
      <PasswordInput pass={pass} mostrar={mostrar} onChange={actualizapass} toggleVisibility={mostrarpass} />
      <StrengthIndicator strength={evaluarfuerza(pass)} />
    </div>
  )
}

export default App;