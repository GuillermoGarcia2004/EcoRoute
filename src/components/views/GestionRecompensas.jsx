import { useState, useEffect } from "react";
import { AdminView } from "../layouts/AdminView";
import { ErrorMessage } from "../messages/ErrorMessage";
import { SuccessMessage } from "../messages/SuccessMessage";

export const GestionRecompensas = () => {
  // Estados de la aplicación
  const [recompensas, setRecompensas] = useState([]);
  const [modalVer, setModalVer] = useState(false);
  const [modalBorrar, setModalBorrar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalCrear, setModalCrear] = useState(false);
  const [recompensaElegida, setRecompensaElegida] = useState(null);

  // Estado para el formulario de edición
  const [formDataEditar, setFormDataEditar] = useState({
    nombre: '',
    descripcion: '',
    valor: ''
  });

  // Estado para el formulario de creación
  const [formDataCrear, setFormDataCrear] = useState({
    nombre: '',
    descripcion: '',
    valor: ''
  });

  // Estados para mensajes SOLO en el modal de editar
  const [mostrarErrorEditar, setMostrarErrorEditar] = useState(false);
  const [mostrarExitoEditar, setMostrarExitoEditar] = useState(false);
  const [mensajeErrorEditar, setMensajeErrorEditar] = useState('');
  const [mensajeExitoEditar, setMensajeExitoEditar] = useState('');

  // Estados para mensajes SOLO en el modal de crear
  const [mostrarErrorCrear, setMostrarErrorCrear] = useState(false);
  const [mostrarExitoCrear, setMostrarExitoCrear] = useState(false);
  const [mensajeErrorCrear, setMensajeErrorCrear] = useState('');
  const [mensajeExitoCrear, setMensajeExitoCrear] = useState('');

  // Función para listar las recompensas
  const listarRecompensas = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/ecoroute/recompensas/");
      if(!response.ok) {
        throw new Error("Error al obtener las recompensas");
      }
      const datos = await response.json();
      setRecompensas(datos.recompensas || datos || []);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  // Función para validar formulario (común para crear y editar)
  const validarFormulario = (tipo = 'editar') => {
    const formData = tipo === 'crear' ? formDataCrear : formDataEditar;
    
    // Validar campos obligatorios
    if (!formData.nombre.trim() || !formData.descripcion.trim() || !formData.valor.trim()) {
      if (tipo === 'crear') {
        setMensajeErrorCrear('Todos los campos son obligatorios');
        setMostrarErrorCrear(true);
        setMostrarExitoCrear(false);
      } else {
        setMensajeErrorEditar('Todos los campos son obligatorios');
        setMostrarErrorEditar(true);
        setMostrarExitoEditar(false);
      }
      return false;
    }

    // Validar valor numérico y longitud <= 4 cifras
    const valorNum = parseInt(formData.valor);
    if (isNaN(valorNum) || valorNum < 0 || valorNum.toString().length > 4) {
      if (tipo === 'crear') {
        setMensajeErrorCrear('El valor debe ser un número de cuatro cifras o menos');
        setMostrarErrorCrear(true);
        setMostrarExitoCrear(false);
      } else {
        setMensajeErrorEditar('El valor debe ser un número de cuatro cifras o menos');
        setMostrarErrorEditar(true);
        setMostrarExitoEditar(false);
      }
      return false;
    }

    return true;
  };

  // Función para crear recompensa
  const crearRecompensa = async () => {
    // Validar antes de enviar
    if (!validarFormulario('crear')) {
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/ecoroute/recompensas/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataCrear)
      });
      
      const datosRespuesta = await response.json();
      
      if(!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      await listarRecompensas();
      
      // ✅ Usar mensaje de la API y cerrar modal inmediatamente
      setMensajeExitoCrear(datosRespuesta.mensaje || 'Recompensa creada correctamente');
      setMostrarExitoCrear(true);
      setMostrarErrorCrear(false);
      
      // Cerrar modal después de 1.5 segundos para que el usuario vea el mensaje
      setTimeout(() => {
        cerrarModalCrear();
      }, 1500);
      
    } catch(error) {
      console.log(error);
      setMostrarErrorCrear(true);
      setMensajeErrorCrear('Error al crear la recompensa');
      setMostrarExitoCrear(false);
    }
  };

  // Función para actualizar recompensa
  const actualizarRecompensa = async (id_recompensa) => {
    // Validar antes de enviar
    if (!validarFormulario('editar')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/v1/ecoroute/recompensas/${id_recompensa}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataEditar)
      });
      
      const datosRespuesta = await response.json();
      
      if(!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      await listarRecompensas();
      
      // ✅ Usar mensaje de la API y cerrar modal inmediatamente
      setMensajeExitoEditar(datosRespuesta.mensaje || 'Recompensa actualizada correctamente');
      setMostrarExitoEditar(true);
      setMostrarErrorEditar(false);
      
      // Cerrar modal después de 1.5 segundos para que el usuario vea el mensaje
      setTimeout(() => {
        cerrarModalEditar();
      }, 1500);
      
    } catch(error) {
      console.log(error);
      setMostrarErrorEditar(true);
      setMensajeErrorEditar('Error al actualizar la recompensa');
      setMostrarExitoEditar(false);
    }
  };

  // UseEffect para cargar las recompensas 
  useEffect(() => {
    listarRecompensas();
  }, []);

  // Función para eliminar una recompensa elegida utilizando su ID
  const eliminarRecompensa = async id_recompensa => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/ecoroute/recompensas/${id_recompensa}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if(!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      await listarRecompensas();
    } catch(error) {
      console.log(error);
    } finally {
      setModalBorrar(false);
      setRecompensaElegida(null);
    }
  };

  // Funciones para manejar los modales
  const abrirModalVer = (recompensa) => {
    setRecompensaElegida(recompensa);
    setModalVer(true);
  };
  const cerrarModalVer = () => {
    setModalVer(false);
    setRecompensaElegida(null);
  };

  const abrirModalBorrar = (recompensa) => {
    setRecompensaElegida(recompensa);
    setModalBorrar(true);
  };
  const cerrarModalBorrar = () => {
    setModalBorrar(false);
    setRecompensaElegida(null);
  };

  const abrirModalEditar = (recompensa) => {
    setFormDataEditar({
      nombre: recompensa.nombre || '',
      descripcion: recompensa.descripcion || '',
      valor: recompensa.valor || ''
    });
    setRecompensaElegida(recompensa);
    // Reset mensajes al abrir
    setMostrarErrorEditar(false);
    setMostrarExitoEditar(false);
    setModalEditar(true);
  };

  const cerrarModalEditar = () => {
    setModalEditar(false);
    setRecompensaElegida(null);
    setFormDataEditar({ nombre: '', descripcion: '', valor: '' });
    // Reset mensajes al cerrar
    setMostrarErrorEditar(false);
    setMostrarExitoEditar(false);
  };

  const abrirModalCrear = () => {
    setFormDataCrear({ nombre: '', descripcion: '', valor: '' });
    // Reset mensajes al abrir
    setMostrarErrorCrear(false);
    setMostrarExitoCrear(false);
    setModalCrear(true);
  };

  const cerrarModalCrear = () => {
    setModalCrear(false);
    setFormDataCrear({ nombre: '', descripcion: '', valor: '' });
    // Reset mensajes al cerrar
    setMostrarErrorCrear(false);
    setMostrarExitoCrear(false);
  };

  const handleInputChangeEditar = (e) => {
    const { name, value } = e.target;
    setFormDataEditar(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar errores al escribir
    if (mostrarErrorEditar) {
      setMostrarErrorEditar(false);
    }
  };

  const handleInputChangeCrear = (e) => {
    const { name, value } = e.target;
    setFormDataCrear(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar errores al escribir
    if (mostrarErrorCrear) {
      setMostrarErrorCrear(false);
    }
  };

  return (
    <AdminView>
      <div className="mb-5">
        <h1 className="text-white text-2xl">Listado de recompensas:</h1>
        <button 
          onClick={abrirModalCrear}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg cursor-pointer"
        >
          + Agregar recompensa
        </button>
      </div>

      <div className="w-[80%] h-[500px] p-5 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/80 [&::-webkit-scrollbar-thumb]:rounded-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {recompensas.map(r => (
          <div key={r.id} className="bg-white border rounded-lg p-4 shadow-[11px_10px_5px_0px_rgba(0,0,0,0.75)]">
            <div className="flex items-center justify-center gap-x-5">
                <div className="h-full w-[20%] border-4 border-solid border-[green] bg-black p-4 rounded-full">
                    <img src="/src/assets/img/regalo.png" alt={`Logo regalo ${r.id}`} />
                </div>
                <div className="h-full w-[79%] border-2 border-solid border-black rounded-xl p-5">
                  <p className="font-medium text-gray-700">Nombre: {r.nombre}</p>
                  <p>Valor: {r.valor} puntos</p>
                  <div className="flex items-center justify-center gap-x-4 border border-solid border-black p-2 w-full rounded-xl">
                      <button onClick={() => abrirModalVer(r)} className="text-white bg-indigo-600 p-2 rounded-xl w-[30%] cursor-pointer hover:bg-indigo-700 transition-colors">Ver</button>
                      <button onClick={() => abrirModalEditar(r)} className="text-white bg-yellow-600 p-2 rounded-xl w-[30%] cursor-pointer hover:bg-yellow-700 transition-colors">Editar</button>
                      <button onClick={() => abrirModalBorrar(r)} className="text-white bg-red-600 p-2 rounded-xl w-[30%] cursor-pointer hover:bg-red-700 transition-colors">Borrar</button>
                  </div>
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL PARA VER LA RECOMPENSA */}
      {modalVer && recompensaElegida && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
         <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 relative" onClick={(e) => e.stopPropagation()}>
           <div className="text-center mb-6">
             <div className="w-24 h-24 border-4 border-green-500 bg-black rounded-full mx-auto p-4 mb-4">
               <img src="/src/assets/img/regalo.png" alt="Regalo" className="w-full h-full object-contain" />
             </div>
             <h2 className="text-2xl font-bold text-gray-800 mb-2">{recompensaElegida.nombre}</h2>
             <p className="text-3xl font-bold text-green-600">{recompensaElegida.valor} puntos</p>
           </div>
           <div className="space-y-3">
             <p>Código para canjear la recompensa: <strong>{recompensaElegida.codigo}</strong></p>
             {recompensaElegida.descripcion && (
               <div>
                 <p className="font-semibold text-gray-700 mb-1">Descripción:</p>
                 <p className="text-gray-600">{recompensaElegida.descripcion}</p>
               </div>
             )}
             {recompensaElegida.id && (
               <p className="text-sm text-gray-500">ID: {recompensaElegida.id}</p>
             )}
           </div>
           <div className="mt-8 flex gap-4 justify-end">
               <button onClick={cerrarModalVer} className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">Cerrar</button>
           </div>
         </div>
        </div>
      )}

      {/* MODAL PARA BORRAR LA RECOMPENSA */}
      {modalBorrar && recompensaElegida && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
         <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 relative" onClick={(e) => e.stopPropagation()}>
           <h2 className="text-2xl font-bold text-gray-800 mb-2">{recompensaElegida.nombre}</h2>
           <p>¿Desea borrar la recompensa seleccionada? Esta acción es permanente e irreversible.</p>
           <div className="flex items-center justify-center gap-x-4 border border-solid border-black p-2 w-full rounded-xl mt-2">
             <button onClick={cerrarModalBorrar} className="text-white bg-indigo-600 p-2 rounded-xl w-[50%] cursor-pointer hover:bg-indigo-700 transition-colors">Cancelar</button>
             <button onClick={() => eliminarRecompensa(recompensaElegida.id)} className="text-white bg-red-600 p-2 rounded-xl w-[50%] cursor-pointer hover:bg-red-700 transition-colors">Borrar</button>
           </div>
         </div>
        </div>
      )}

      {/* MODAL PARA EDITAR LA RECOMPENSA - CON MENSAJE DE API Y CIERRE AUTOMÁTICO */}
      {modalEditar && recompensaElegida && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
         <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 relative" onClick={(e) => e.stopPropagation()}>
           <h2 className="text-2xl font-bold text-gray-800 mb-6">Editar {recompensaElegida.nombre}</h2>
           
           {/* MENSAJES DE ERROR Y ÉXITO DENTRO DEL MODAL */}
           {mostrarExitoEditar && (
             <SuccessMessage message={mensajeExitoEditar} onClose={() => setMostrarExitoEditar(false)} />
           )}
           {mostrarErrorEditar && (
             <ErrorMessage message={mensajeErrorEditar} onClose={() => setMostrarErrorEditar(false)} />
           )}

           <div className="space-y-4">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
               <input
                 type="text"
                 name="nombre"
                 value={formDataEditar.nombre}
                 onChange={handleInputChangeEditar}
                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                 placeholder="Nombre de la recompensa"
                 required
               />
             </div>
             
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Descripción:</label>
               <textarea
                 name="descripcion"
                 value={formDataEditar.descripcion}
                 onChange={handleInputChangeEditar}
                 rows="3"
                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                 placeholder="Descripción de la recompensa"
                 required
               />
             </div>
             
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Valor (puntos):</label>
               <input
                 type="number"
                 name="valor"
                 value={formDataEditar.valor}
                 onChange={handleInputChangeEditar}
                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                 placeholder="1900"
                 min="0"
                 max="9999"
                 required
               />
             </div>
           </div>

           <div className="mt-8 flex gap-4 justify-end">
             <button 
               onClick={cerrarModalEditar} 
               className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
             >
               Cancelar
             </button>
             <button 
               onClick={() => actualizarRecompensa(recompensaElegida.id)}
               className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
             >
               Guardar cambios
             </button>
           </div>
         </div>
        </div>
      )}

      {/* MODAL PARA CREAR LA RECOMPENSA - IGUAL QUE EDITAR */}
      {modalCrear && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
         <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 relative" onClick={(e) => e.stopPropagation()}>
           <h2 className="text-2xl font-bold text-gray-800 mb-6">Crear nueva recompensa</h2>
           
           {/* MENSAJES DE ERROR Y ÉXITO DENTRO DEL MODAL */}
           {mostrarExitoCrear && (
             <SuccessMessage message={mensajeExitoCrear} onClose={() => setMostrarExitoCrear(false)} />
           )}
           {mostrarErrorCrear && (
             <ErrorMessage message={mensajeErrorCrear} onClose={() => setMostrarErrorCrear(false)} />
           )}

           <div className="space-y-4">
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
               <input
                 type="text"
                 name="nombre"
                 value={formDataCrear.nombre}
                 onChange={handleInputChangeCrear}
                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                 placeholder="Nombre de la recompensa"
                 required
               />
             </div>
             
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Descripción:</label>
               <textarea
                 name="descripcion"
                 value={formDataCrear.descripcion}
                 onChange={handleInputChangeCrear}
                 rows="3"
                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                 placeholder="Descripción de la recompensa"
                 required
               />
             </div>
             
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Valor (puntos):</label>
               <input
                 type="number"
                 name="valor"
                 value={formDataCrear.valor}
                 onChange={handleInputChangeCrear}
                 className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                 placeholder="1900"
                 min="0"
                 max="9999"
                 required
               />
             </div>
           </div>

           <div className="mt-8 flex gap-4 justify-end">
             <button 
               onClick={cerrarModalCrear} 
               className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
             >
               Cancelar
             </button>
             <button 
               onClick={crearRecompensa}
               className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
             >
               Crear recompensa
             </button>
           </div>
         </div>
        </div>
      )}
    </AdminView>
  );
};
