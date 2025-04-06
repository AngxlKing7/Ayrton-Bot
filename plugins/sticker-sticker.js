import { sticker } from '../lib/sticker.js';
import uploadFile from '../lib/uploadFile.js';
import uploadImage from '../lib/uploadImage.js';
import { webp2png } from '../lib/webp2mp4.js';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let stiker = false;
  try {
    let q = m.quoted ? m.quoted : m; // Obtiene el mensaje citado si existe, si no el mensaje actual
    let mime = (q.msg || q).mimetype || q.mediaType || ''; // Obtiene el tipo MIME del mensaje
    if (/webp|image|video/g.test(mime)) { // Verifica si es una imagen, video o webp
      if (/video/g.test(mime) && (q.msg || q).seconds > 15) { // Si es video, verifica que no supere los 15 segundos
        return m.reply('¡El video no puede durar más de 15 segundos!');
      }
      let img = await q.download?.(); // Descarga el archivo multimedia

      if (!img) {
        return conn.reply(m.chat, 'Por favor, envía una imagen o video para hacer un sticker.', m);
      }

      let out;
      try {
        const packstickers = global.db.data.users[m.sender];
        const texto1 = packstickers?.text1 || `${global.packsticker}`;
        const texto2 = packstickers?.text2 || `${global.packsticker2}`;

        stiker = await sticker(img, false, texto1, texto2); // Crea el sticker
      } catch (e) {
        console.error(e);
      } finally {
        if (!stiker) {
          if (/webp/g.test(mime)) out = await webp2png(img); // Convierte webp a png si es necesario
          else if (/image/g.test(mime)) out = await uploadImage(img); // Sube la imagen
          else if (/video/g.test(mime)) out = await uploadFile(img); // Sube el video
          if (typeof out !== 'string') out = await uploadImage(img);
          stiker = await sticker(false, out, global.packsticker, global.packsticker2); // Crea el sticker final
        }
      }
    } else if (args[0]) { // Si hay un URL proporcionado
      if (isUrl(args[0])) {
        stiker = await sticker(false, args[0], global.packsticker, global.packsticker2); // Crea sticker desde URL
      } else {
        return m.reply('El URL es incorrecto...');
      }
    }
  } catch (e) {
    console.error(e);
    if (!stiker) stiker = e;
  } finally {
    if (stiker) {
      conn.sendFile(m.chat, stiker, 'sticker.webp', '', m); // Envía el sticker
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

// Función para verificar si es un URL válido
const isUrl = (text) => {
  return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'));
};
