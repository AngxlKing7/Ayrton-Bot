import axios from 'axios';

const pins = async (query) => {
  const link = `https://id.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(query)}%26rs%3Dtyped&data=%7B%22options%22%3A%7B%22query%22%3A%22${encodeURIComponent(query)}%22%2C%22scope%22%3A%22pins%22%7D%2C%22context%22%3A%7B%7D%7D`;

  const headers = {
    'user-agent': 'Mozilla/5.0',
    'x-requested-with': 'XMLHttpRequest',
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'referer': 'https://id.pinterest.com/',
  };

  try {
    const res = await axios.get(link, { headers });
    const results = res.data?.resource_response?.data?.results || [];
    return results.map(item => ({
      image: item.images?.orig?.url,
      username: item.pinner?.username,
      title: item.title || item.rich_metadata?.title || 'Sin título',
      board: item.board?.name,
      pin_url: `https://pinterest.com/pin/${item.id}/`
    }));
  } catch (error) {
    return [];
  }
};

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply(`🍫 Ingresa un texto. Ejemplo: #pin Ayrton Senna`);

  const result = (await pins(text))[0]; // solo 1 imagen
  if (!result) return conn.reply(m.chat, `No se encontraron resultados para "${text}".`, m);

  await conn.sendMessage(m.chat, {
    image: { url: result.image },
    caption: `❀ Usuario » *${result.username}*\n❖ Título » *${result.title}*\n❏ Tablero » *${result.board}*\n🜸 Link » _${result.pin_url}_`,
    quoted: m
  });
};

handler.help = ['pin'];
handler.tags = ['buscador'];
handler.command = ['pinterest', 'pin'];

export default handler;
