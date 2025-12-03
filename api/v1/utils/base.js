import bcrypt from 'bcrypt';
// Función para generar un token aleatorio
export const generarTokenAleatorio = () => {
  const caracteres =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 17; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    token += caracteres.charAt(indiceAleatorio);
  }
  return token;
};
// Función para encriptar una contraseña
export const crearHash = async clave => {
  const hash = await bcrypt.hash(clave, 12);
  return hash;
};
// Función para generar los estilos del correo electrónico
export const generarEstilosCorreo = () => {
  const styles = {
    estilosContenedorPrincipal: `style="
      max-width: 600px; 
      margin: 20px auto; 
      background-color: #ffffff; 
      border-radius: 8px; 
      box-shadow: 0 4px 12px rgba(0,0,0,0.1); 
      padding: 20px 30px; 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      color: #333;
    "`,
    estilosH1: `style="
      color: #2c3e50; 
      font-size: 24px; 
      margin-bottom: 10px;
    "`,
    estilosParrafo: `style="
      font-size: 16px; 
      line-height: 1.5;
    "`,
    estilosEnlace: `style="
      display: inline-block;
      background-color: #007bff; 
      color: white !important; 
      padding: 10px 20px; 
      border-radius: 5px; 
      text-decoration: none; 
      font-weight: bold; 
      margin-top: 20px;
    "`,
    estilosContenedorFinal: `style="
      font-size: 12px; 
      color: #999; 
      text-align: center; 
      margin-top: 30px; 
      border-top: 1px solid #ddd; 
      padding-top: 15px;
    "`
  };
  return styles;
};
// FUNCIONES PARA DEVOLVER LOS CORREOS ELECTRÓNICOS QUE ENVIAMOS AL USUARIO
const styles = generarEstilosCorreo();
export const htmlTemplateActivarCuenta = (nombre, enlace) => {
  const html = `
    <div ${styles.estilosContenedorPrincipal}>
      <h1 ${styles.estilosH1}>¡Hola ${nombre}!</h1>
      <p ${styles.estilosParrafo}>Gracias por registrarte en nuestra plataforma. Estamos emocionados de tenerte con nosotros.</p>
      <p ${styles.estilosParrafo}>Por favor, haz clic sobre el botón para activar tu cuenta y disfrutar de todos sus beneficios.</p>
      <a href="${enlace}" ${styles.estilosEnlace}>Activar cuenta</a>
      <div ${styles.estilosContenedorFinal}>Si no solicitaste este correo, por favor ignóralo.</div>
    </div>
  `;
  return html;
}
export const htmlTemplateCuentaActivada = (nombre) => {
  const html = `
    <div ${styles.estilosContenedorPrincipal}>
      <h1 ${styles.estilosH1}>¡Hola ${nombre}!</h1>
      <p ${styles.estilosParrafo}>Gracias por registrarte en nuestra plataforma. Estamos emocionados de tenerte con nosotros.</p>
      <p ${styles.estilosParrafo}>Su cuenta ya ha sido activada. Ya puede disfrutar de todos sus beneficios.</p>
      <div ${styles.estilosContenedorFinal}>Si no solicitaste este correo, por favor ignóralo.</div>
    </div>
  `;
  return html;
}
export const htmlTemplateBorrarCuenta = (nombre, dia) => {
  const html = `
    <div ${styles.estilosContenedorPrincipal}>
      <h1 ${styles.estilosH1}>¡Hola ${nombre}!</h1>
      <p ${styles.estilosParrafo}>Usted ha solicitado el día ${dia} darse de baja en nuestra plataforma.</p>
      <p ${styles.estilosParrafo}>Su cuenta se ha eliminado correctamente. Gracias por su atención.</p>
      <div ${styles.estilosContenedorFinal}>Si no solicitaste este correo, por favor ignóralo.</div>
    </div>
  `;
  return html;
}
export const htmlTemplateSolicitarBorrarCuenta = (nombre, dia) => {
  const html = `
    <div ${styles.estilosContenedorPrincipal}>
      <h1 ${styles.estilosH1}>¡Hola ${nombre}!</h1>
      <p ${styles.estilosParrafo}>Usted ha solicitado el día ${dia} darse de baja en nuestra plataforma.</p>
      <p ${styles.estilosParrafo}>Su cuenta será eliminada en un plazo de dos o tres días. Gracias por su atención.</p>
      <div ${styles.estilosContenedorFinal}>Si no solicitaste este correo, por favor ignóralo.</div>
    </div>
  `;
  return html;
}
export const htmlTemplateRecompensaComprada = (nombre, recompensa, valor,codigo) => {
  const html = `
    <div ${styles.estilosContenedorPrincipal}>
      <h1 ${styles.estilosH1}>¡Felicidades ${nombre}!</h1>
      <p ${styles.estilosParrafo}>Has comprado exitosamente la recompensa:</p>
      <h2 style="color: #27ae60; font-size: 20px;">${recompensa}</h2>
      <p ${styles.estilosParrafo}><strong>Valor:</strong> ${valor} puntos</p>
      <p ${styles.estilosParrafo}><strong>Código de canje:</strong></p>
      <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; font-size: 18px; font-weight: bold; color: #2c3e50; text-align: center; margin: 15px 0;">
        ${codigo}
      </div>
      <p ${styles.estilosParrafo}>Guarda este código, lo necesitarás para canjear tu recompensa en cualquier comercio local asociado.</p>
      <div ${styles.estilosContenedorFinal}>¡Gracias por usar nuestra plataforma!</div>
    </div>
  `;
  return html;
}