import styles from '../styles/page.module.css'
import React, {useState} from 'react';
import albumData from '../repository/home.json'

export default function Home() {

      const lenDados = Object.keys(albumData.tracks).length
      const [albumAtual, setAlbum] = useState(0)

      const carregaAlbum = () => {
        console.log(albumData.tracks[albumAtual].album.artists.length)
        console.log(Object.keys(albumData.tracks).length)
      }

      const nextAlbum = () => {
        if(albumAtual < (lenDados - 1)){
          setAlbum(albumAtual + 1)
          controlAudio({musicAtual: (albumAtual+1)})
        }
      }

      const previAlbum = () => {
        if(albumAtual > 0){
          setAlbum(albumAtual - 1)
          controlAudio({musicAtual: (albumAtual-1)})
        }
      }

      const controlAudio = (props) => {

        const {musicAtual} = props

        var audio = document.getElementById('audio')
        audio.pause()
        audio.src = `${albumData.tracks[musicAtual].preview_url}`
        audio.play()
      }

      const recuperaID = (props) => {
        const {id} = props
        //var idRecuperado = id.split(':album:')
        //console.log(`id: ${idRecuperado[1]}`)
        console.log(id)
      }

      return (
        <main className={styles.body}>
          <div className={styles.main}>
            <h1 className={styles.title}>Álbuns Recomendados</h1>
            <div className={styles.containerAlbuns}>
              <div className={albumAtual == 0 ? styles.disableArrowLeft : styles.arrowLeft} onClick={previAlbum}><span class="material-symbols-outlined">arrow_back_ios</span></div>
              <div className={styles.itemAlbum}>
                <div className={styles.iconFav} onClick={() => recuperaID({id:albumData.tracks[albumAtual].album.id})}><span class="material-symbols-outlined">favorite</span></div>
                <img src={albumData.tracks[albumAtual].album.images[0].url}></img>
                <div className={styles.content}>
                  <h1 className={styles.nameAlbum}>{albumData.tracks[albumAtual].album.name}</h1>
                  <div className={styles.contentText}>
                    {albumData.tracks[albumAtual].album.artists.map((artist) => (
                        <p>{artist.name}</p>
                      ))}
                  </div>
                  <div className={styles.conatinerAudio}>
                      <audio id='audio' controls>
                        <source src={albumData.tracks[albumAtual].preview_url} type='audio/mpeg'>
                        </source>
                      </audio>
                  </div>
                </div>
              </div>
              <div className={albumAtual == 9 ? styles.disableArrowRight : styles.arrowRight} onClick={nextAlbum}><span class="material-symbols-outlined">arrow_forward_ios</span></div>
            </div>
          </div>
        </main>
      )
}