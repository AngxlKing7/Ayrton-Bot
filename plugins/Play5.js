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
        'User-Agent': 'Mozilla/5.0'
      }
    };

    try {
      const response = await axios.request(config);
      if (response.data && response.data.success) {
        const { id, title, info } = response.data;
        const downloadUrl = await ddownr.cekProgress(id);
        return {
          id,
          image: info.image,
          title,
          downloadUrl
        };
      } else {
        throw new Error('✦ Fallo al obtener los detalles del video.');
      }
    } catch (error) {
      throw error;
    }
  },

  cekProgress: async (id) => {
    const config = {
      method: 'GET',
      url: `https://p.oceansaver.in/ajax/progress.php?id=${id}`,
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    };

    try {
      for (let i = 0; i < 10; i++) {
        const response = await axios.request(config);
        if (response.data && response.data.success && response.data.progress === 1000) {
          return response.data.download_url;
        }
        await new Promise(resolve => setTimeout(resolve, 2500));
      }
      throw new Error('✦ Tiempo de espera agotado.');
    } catch (error) {
      throw error;
    }
  }
};

const formatViews = (num) => {
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
  return num;
};

const handler = async (m, { conn, text }) => {
  try {
    if (!text.trim()) return conn.reply(m.chat, 'Ingresa el nombre de la música ejemplo: Jacobo grinberg Victor Mendivil', m);

    const search = await yts(text);
    if (!search.all || search.all.length === 0) return m.reply('No se encontraron resultados.');

    const videoInfo = search.all[0];
    const { title, thumbnail, timestamp, views, ago, url } = videoInfo;
    const infoMessage = `「✦」Descargando *<${title}>*\n\n> ✦ Canal » *${videoInfo.author.name || 'Desconocido'}*\n> ✰ Vistas » *${formatViews(views)}*\n> ⴵ Duración » *${timestamp}*\n> ✐ Publicación » *${ago}*\n`;

    await conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption: infoMessage
    }, { quoted: m });

    const api = await ddownr.download(url, 'mp3');
    const result = api.downloadUrl;

    await conn.sendMessage(m.chat, {
      audio: { url: result },
      mimetype: "audio/mpeg"
    }, { quoted: m });

  } catch (error) {
    return m.reply(`✦ Error: ${error.message}`);
  }
};

handler.command = ['ytaudio'];
handler.help = ['play5'];
handler.tags = ['downloader'];
handler.group = true;
handler.register = false;

export default handler;
