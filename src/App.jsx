import react, { useState } from 'react';
import { use } from 'react';

function contraseña(){
  const[pass, setpass] = useState('');
  const[mostrar, setmostrar] = useState(false);
  const[valmay, setvalmay] = useState(false);
  const[valnum, setvalnum] = useState(false);

  let cont=0
  if(!pass) return '';

  if(pwd.lenght >= 8) cont++;
  if(/a-z/.test) cont++;
  if(/A-Z/.test) cont++;
  if(/\d/) cont++;
  if(/[^A-Za-Z0-9]/) cont++;


}