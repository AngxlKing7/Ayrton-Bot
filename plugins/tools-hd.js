import FormData from "form-data";
import axios from "axios";
import Jimp from "jimp";

// Función principal del handler
const handler = async (m, {conn, usedPrefix, command}) => {
 try {    
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || q.mediaType || "";
  
  // Mensaje amigable en estilo kawaii
  if (!mime) return m.reply(`✨ ¡Hola! Por favor responde a una imagen para mejorarla en *HD* ✨`);
  
  // Verificar formato de la imagen
  if (!/image\/(jpe?g|png)/.test(mime)) return m.reply(`❌ El formato del archivo (${mime}) no es compatible, por favor envía una imagen 🖼️.`);
  
  conn.reply(m.chat, `🌟 ¡Estoy mejorando la calidad de tu imagen, un momento! 🌟`, m);
  
  // Descargar la imagen y procesarla
  let img = await q.download?.();
  let pr = await remini(img, "enhance");
  
  // Responder con la imagen mejorada
  conn.sendMessage(m.chat, {image: pr}, {quoted: fkontak});
 } catch (error) {
   console.error(error); // Depuración
   return m.reply(`💔 Oh no, algo salió mal. ¡Intenta de nuevo más tarde!`);
 }
};

handler.help = ["remini", "hd", "enhance"];
handler.tags = ["ai", "tools"];
handler.command = ["remini", "hd", "enhance"];
handler.group = true;
handler.register = true;

export default handler;

// Función para mejorar la imagen
async function remini(imageData, operation) {
  return new Promise(async (resolve, reject) => {
    const availableOperations = ["enhance", "recolor", "dehaze"];
    
    // Asegurar que la operación sea válida
    if (!availableOperations.includes(operation)) {
      operation = availableOperations[0]; // Predeterminado a "enhance"
    }
    
    const baseUrl = "https://inferenceengine.vyro.ai/" + operation + ".vyro";
    const formData = new FormData();
    formData.append("image", Buffer.from(imageData), { filename: "enhance_image_body.jpg", contentType: "image/jpeg" });
    formData.append("model_version", 1);

    try {
      const response = await axios.post(baseUrl, formData, {
        headers: {
          ...formData.getHeaders(),
          "User-Agent": "okhttp/4.9.3",
          "Connection": "Keep-Alive",
          "Accept-Encoding": "gzip"
        },
        responseType: 'arraybuffer' // Recibir la respuesta como un buffer
      });
      resolve(Buffer.from(response.data)); // Devolvemos la imagen mejorada como buffer
    } catch (err) {
      reject(err); // Rechazamos si hay un error
    }
  });
}
