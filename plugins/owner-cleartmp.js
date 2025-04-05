import { tmpdir } from 'os'
import { join } from 'path'
import { readdirSync, statSync, unlinkSync, existsSync, rmSync } from 'fs'

let handler = async (m, { conn, __dirname }) => {
  try {
    const tmp = [tmpdir(), join(__dirname, '../tmp')]
    let archivosEliminados = 0
    let carpetasEliminadas = 0

    tmp.forEach(dirname => {
      if (existsSync(dirname)) {
        readdirSync(dirname).forEach(file => {
          const filePath = join(dirname, file)
          if (existsSync(filePath)) {
            try {
              const stats = statSync(filePath)
              if (stats.isFile()) {
                unlinkSync(filePath)
                archivosEliminados++
              } else if (stats.isDirectory()) {
                rmSync(filePath, { recursive: true, force: true })
                carpetasEliminadas++
              }
            } catch (err) {
              console.error(`No se pudo eliminar: ${filePath} - ${err.message}`)
            }
          }
        })
      }
    })

    conn.reply(
      m.chat,
      `✅ Se han eliminado ${archivosEliminados} archivos y ${carpetasEliminadas} carpetas de la carpeta tmp`,
      m
    )
  } catch (error) {
    console.error(`Error en cleartmp: ${error.message}`)
    conn.reply(m.chat, `⚠️ Ocurrió un error al limpiar la carpeta tmp`, m)
  }
}

handler.help = ['cleartmp']
handler.tags = ['owner']
handler.command = ['cleartmp', 'borrartmp', 'borrarcarpetatmp', 'vaciartmp']
handler.rowner = true

export default handler
