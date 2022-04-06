import { useEffect, useState } from 'react';

import Error from './Error';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      const {nombre, propietario, email, fecha, sintomas} = paciente;
      setNombre(nombre);
      setPropietario(propietario);
      setEmail(email);
      setFecha(fecha);
      setSintomas(sintomas);
    }
  }, [paciente]);

  const generarId = () => {
    const random = Math.random();
    const fecha = Date.now();

    return random + fecha;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      setError(true);
      return;
    }

    setError(false);

    const objPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
    };

    if (paciente.id) {
      objPaciente.id = paciente.id;
      const pacienteActualizado = pacientes.map(pacienteActual => pacienteActual.id === objPaciente.id 
        ? objPaciente
        : pacienteActual
      );
      setPacientes(pacienteActualizado);
      setPaciente({});
    } else {
      objPaciente.id = generarId();
      setPacientes([...pacientes, objPaciente]);
    }

    // Reiniciar form
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintomas('');
  };

  return (
    <div className='md:w-1/2 lg:w-2/5'>
      <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>

      <p className='text-lg mt-5 text-center mb-10'>
        Añade Pacientes y {''}
        <span className='text-indigo-600 font-bold'>Adminístralos</span>
      </p>

      <form
        className='bg-white shadow-md shadow-gray-600 rounded-lg py-5 px-5 mb-10'
        onSubmit={handleSubmit}
      >
        {error && 
          <Error><p>Todos los campos son obligatorios</p></Error>
        }
        <div className='mb-5'>
          <label
            htmlFor='mascota'
            className='block text-gray-700 uppercase font-bold'
          >
            Nombre mascota
          </label>
          <input
            id='mascota'
            type='text'
            placeholder='Nombre de la mascota'
            className='border-2 w-full p-2 mt-2 placeholde-gray-400 rounded-md'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='propietario'
            className='block text-gray-700 uppercase font-bold'
          >
            Nombre propietario
          </label>
          <input
            id='propietario'
            type='text'
            placeholder='Nombre del propietario'
            className='border-2 w-full p-2 mt-2 placeholde-gray-400 rounded-md'
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='email'
            className='block text-gray-700 uppercase font-bold'
          >
            Email propietario
          </label>
          <input
            id='email'
            type='text'
            placeholder='Email propietario'
            className='border-2 w-full p-2 mt-2 placeholde-gray-400 rounded-md'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='fecha'
            className='block text-gray-700 uppercase font-bold'
          >
            Alta
          </label>
          <input
            id='fecha'
            type='date'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className='mb-5'>
          <label
            htmlFor='sintomas'
            className='block text-gray-700 uppercase font-bold'
          >
            Síntomas
          </label>
          <textarea
            id='sintomas'
            placeholder='Describe los síntomas'
            className='border-2 w-full p-2 mt-2 placeholde-gray-400 rounded-md'
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>
        <input
          type='submit'
          className='bg-indigo-500 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all'
          value={paciente.id ? 'Actualizar paciente' : 'Agregar paciente'}
        />
      </form>
    </div>
  );
};

export default Formulario;
