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

    const response = await axios.request(config);
    if (response.data && response.data.success) {
      const { id, title, info } = response.data;
      const { image } = info;
      const { size } = response.data;

      const downloadUrl = await ddownr.cekProgress(id);
      return {
        id,
        image,
        title,
        size,
        downloadUrl
      };
    } else {
      throw new Error('✦ Falló al obtener los detalles del video.');
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

    for (let i = 0; i < 6; i++) {
      const response = await axios.request(config);
      if (response.data?.success && response.data.progress === 1000) {
        return response.data.download_url;
      }
      await new Promise(resolve => setTimeout(resolve, 2500)); // máx. 15s
    }

    throw new Error('✦ Tiempo de espera agotado. Intenta con otra canción.');
  }
};

const formatViews = (n) => {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K';
  return n;
};

const handler = async (m, { conn, text }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, '╭───────────⩊\n│  Ingresa el nombre de la música.\n╰───────────⩊', m);
    }

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return m.reply('No se encontraron resultados.');
    }

    const videoInfo = search.all[0];
    const { title, thumbnail, timestamp, views, ago, url, author, uploadedAt } = videoInfo;
    const thumb = (await conn.getFile(thumbnail))?.data;

    const api = await ddownr.download(url, 'mp3');
    const { downloadUrl, size } = api;

    const infoMessage = `「✦」Descargando *<${title}>*\n\n` +
      `> ✦ Canal » *${author.name || 'Desconocido'}*\n` +
      `> ✰ Vistas » *${formatViews(views)}*\n` +
      `> ⴵ Duración » *${timestamp}*\n` +
      `> ✐ Publicación » *${uploadedAt || ago}*\n` +
      `> 🜸 Link » ${url}\n` +
      `> 🗂️ Tamaño » *${size}*\n`;

    await conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption: infoMessage
    }, { quoted: m });

    await conn.sendMessage(m.chat, {
      audio: { url: downloadUrl },
      mimetype: "audio/mpeg"
    }, { quoted: m });

  } catch (error) {
    return m.reply(`✦ Error: ${error.message}\n`);
  }
};

handler.command = ['ytaudio'];
handler.help = ['play5'];
handler.tags = ['downloader'];
handler.group = true;
handler.register = false;

export default handler;
