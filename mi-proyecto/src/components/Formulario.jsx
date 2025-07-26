import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  username: yup.string().required('El usuario es obligatorio'),

  email: yup.string()
    .email('Correo no válido')
    .required('El correo es obligatorio'),

  password: yup.string()
    .required('La contraseña es obligatoria')
    .min(8, 'La contraseña debe tener 8 caracteres mínimos')
    .matches(/[A-Z]/, 'La contraseña debe tener al menos una mayúscula')
    .matches(/[0-9]/, 'La contraseña debe tener al menos un número'),

  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña')
});

export default function Formulario() {
  const [mensaje, setMensaje] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log("Datos enviados:", data);
    setMensaje('Usuario guardado :) ');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Registro de Usuario</h2>

      <input type="text" placeholder="Nombre de usuario" {...register('username')} />
      {errors.username && <p>{errors.username.message}</p>}

      <input type="email" placeholder="Correo electrónico" {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="password" placeholder="Contraseña" {...register('password')} className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none" />
      {errors.password && <p>{errors.password.message}</p>}

      <input type="password" placeholder="Confirmar contraseña" {...register('confirmPassword')} className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none" />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <button type="submit">Registrarse</button>

      {}
      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
    </form>
  );
}
