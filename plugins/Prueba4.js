import fs from 'fs';  
import path from 'path';  
import fetch from "node-fetch";
import crypto from "crypto";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";

// Variable separada para el banner secundario (no afecta al bot principal)
global.secondaryBanner = global.secondaryBanner || null;

let handler = async (m, { conn }) => {
  // Números autorizados (en formato WhatsApp: [número]@s.whatsapp.net)
  const allowedNumbers = [
    "526678552332@s.whatsapp.net", // Dueño principal (sin +1)
    "526678552332@s.whatsapp.net"  // Segundo número permitido (mismo dueño)
  ];
  
  // Verificar si el remitente está autorizado
  if (!allowedNumbers.includes(m.sender)) {
    return m.reply("❌ *Acceso denegado.* Solo el dueño puede usar este comando.");
  }

  // Verificar si se respondió a una imagen
  if (!m.quoted || !m.quoted.mimetype || !m.quoted.mimetype.includes("image")) {
    return m.reply("🔹 *Responde a una imagen* con el comando *setbanner2* para cambiar el banner secundario.");
  }

  try {
    // Descargar la imagen citada
    const media = await m.quoted.download();
    if (!media) throw new Error("No se pudo descargar la imagen");

    // Verificar que sea una imagen válida (JPEG/PNG)
    const { ext, mime } = await fileTypeFromBuffer(media) || {};
    if (!ext || !mime.includes("image")) {
      return m.reply("⚠️ *Formato no soportado.* Usa imágenes JPEG o PNG.");
    }

    // Subir la imagen a Catbox y obtener el enlace
    console.log("Subiendo imagen a Catbox...");
    const link = await catbox(media);
    if (!link) throw new Error("No se recibió enlace de Catbox");

    // Actualizar SOLO el banner secundario (el principal no se toca)
    global.secondaryBanner = link;
    
    // Enviar confirmación con la imagen
    await conn.sendFile(
      m.chat, 
      media, 
      'banner.jpg', 
      `✅ *Banner secundario actualizado con éxito*\nEnlace: ${link}\n\n🔹 Este cambio no afecta al bot principal.`, 
      m
    );

  } catch (error) {
    console.error("Error en setbanner2:", error);
    m.reply(`❌ *Error al cambiar el banner secundario*\nMensaje: ${error.message}`);
  }
};

// Función para subir a Catbox (se mantiene igual)
async function catbox(content) {
  try {
    const { ext, mime } = (await fileTypeFromBuffer(content)) || {};
    const blob = new Blob([content.toArrayBuffer()], { type: mime });
    const formData = new FormData();
    const randomName = crypto.randomBytes(5).toString("hex") + "." + ext;
    
    formData.append("reqtype", "fileupload");
    formData.append("fileToUpload", blob, randomName);

    const response = await fetch("https://catbox.moe/user/api.php", {
      method: "POST",
      body: formData,
    });

    return await response.text();
  } catch (e) {
    console.error("Error en catbox:", e);
    return null;
  }
}

// Configuración del handler
handler.help = ['setbanner2'];
handler.tags = ['owner'];
handler.command = ['setbanner2'];
export default handler;
