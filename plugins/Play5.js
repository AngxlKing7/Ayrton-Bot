import fetch from "node-fetch"; 
import yts from 'yt-search';
import axios from "axios";

const formatAudio = ['mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav'];

const ddownr = { 
  download: async (url, format) => { 
    if (!formatAudio.includes(format)) { 
      throw new Error('✦ Formato no soportado. Revisa la lista de formatos disponibles.');
    }

    const config = {
      method: 'GET',
      url: `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    };

    try {
      const response = await axios.request(config);
      if (response.data && response.data.success) {
        const { id, title, info } = response.data;
        const { image } = info;
        const downloadUrl = await ddownr.cekProgress(id);

        return {
          id: id,
          image: image,
          title: title,
          downloadUrl: downloadUrl
        };
      } else {
        throw new Error('✦ Fallo al obtener los detalles del video.');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }, 

  cekProgress: async (id) => { 
    const config = { 
      method: 'GET', 
      url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`, 
      headers: { 
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, como Gecko) Chrome/91.0.4472.124 Safari/537.36' 
      } 
    };

    try {
      while (true) {
        const response = await axios.request(config);
        if (response.data && response.data.success && response.data.progress === 1000) {
          return response.data.download_url;
        }
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  } 
};

const handler = async (m, { conn, text, usedPrefix, command }) => { 
  try { 
    if (!text.trim()) { 
      return conn.reply(m.chat, '《✧》Por favor, menciona el nombre o URL del video que deseas descargar', m); 
    }

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return m.reply('No se encontraron resultados.');
    }

    const videoInfo = search.all[0];
    const { title, thumbnail, timestamp, views, ago, url } = videoInfo;
    const infoMessage = `「✦」Descargando *<${title}>*\n\n> ✦ Canal » *${videoInfo.author.name || 'Desconocido'}*\n> ⴵ Duración » *${timestamp}*\n> ✰ Calidad: *129k*\n> ✐ Publicación » *${ago}*\n> 🜸 Link » ${url}\n`;

    const thumb = (await conn.getFile(thumbnail))?.data;

    const packname = 'Ayrton-Bot'; 
    const dev = 'Desarrollado por speed3xz';

    const JT = {
      contextInfo: {
        externalAdReply: {
          title: packname,
          body: dev,
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    };

    await conn.reply(m.chat, infoMessage, m, JT);

    const api = await ddownr.download(url, 'mp3');
    const result = api.downloadUrl;

    await conn.sendMessage(m.chat, { 
      audio: { url: result }, 
      mimetype: "audio/mpeg" 
    }, { quoted: m });

  } catch (error) { 
    return m.reply(`✦ Error: ${error.message}\n`); 
  } 
};

handler.command = ['ytaudio'];
handler.help = ['ytaudio'];
handler.tags = ['downloader'];
handler.group = true;
handler.register = false;

export default handler;
