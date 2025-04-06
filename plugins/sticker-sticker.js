import { sticker } from '../lib/sticker.js';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import { webp2png } from '../lib/webp2mp4.js';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false;
  try {
    let q = m.quoted ? m.quoted : m;  // Obtén el mensaje citado, si existe, o el mensaje actual.
    let mime = (q.msg || q).mimetype || q.mediaType || '';  // Obtén el tipo MIME del mensaje.
    
    // Verifica si el archivo es de tipo imagen, video o webp
    if (/webp|image|video/g.test(mime)) {
      if (/video/g.test(mime) && (q.msg || q).seconds > 15) {  // Si es un video, limita la duración.
        return m.reply('¡El video no puede durar más de 15 segundos!');
      }

      let img = await q.download?.();  // Descarga el archivo multimedia del mensaje.
      
      if (!img) {
        return conn.reply(m.chat, 'Por favor, envía una imagen o video para hacer un sticker.', m);
      }

      let out;
      try {
        const packstickers = global.db.data.users[m.sender];
        const texto1 = packstickers?.text1 || `${global.packsticker}`;
        const texto2 = packstickers?.text2 || `${global.packsticker2}`;

        // Crea un sticker a partir de la imagen descargada
        stiker = await sticker(img, false, texto1, texto2);
      } catch (e) {
        console.error(e);
      } finally {
        // Si no se pudo crear el sticker, realiza un procesamiento alternativo del archivo.
        if (!stiker) {
          if (/webp/g.test(mime)) {
            out = await webp2png(img);  // Convierte WEBP a PNG
          } else if (/image/g.test(mime)) {
            out = await uploadImage(img);  // Sube la imagen a un servidor
          } else if (/video/g.test(mime)) {
            out = await uploadFile(img);  // Sube el video
          }
          
          if (typeof out !== 'string') out = await uploadImage(img);  // Si no es un string, sube la imagen.
          stiker = await sticker(false, out, global.packsticker, global.packsticker2);  // Crea el sticker.
        }
      }
    } else if (args[0]) {  // Si hay un URL proporcionado en los argumentos
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], global.packsticker, global.packsticker2);  // Crea un sticker a partir de un URL
      } else {
        return m.reply('El URL es incorrecto...');
      }
    }
  } catch (e) {
    console.error(e);
    if (!stiker) stiker = e;
  } finally {
    if (stiker) {
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m);  // Envía el sticker generado
    } else {
      return conn.reply(m.chat, 'Por favor, envía una imagen o video para hacer un sticker.', m);
    }
  }
};

handler.help = ['stiker <img>', 'sticker <url>'];
handler.tags = ['sticker'];
handler.command = ['s', 'sticker', 'stiker'];
handler.register = true;

export default handler;

// Función para verificar si un texto es una URL válida.
const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'));
};
