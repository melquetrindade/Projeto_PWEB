import React, {useState} from 'react'
import albumData from '../repository/getAlbum01.json'
import { useRouter } from 'next/router';
import styles from '../styles/detailsAlbuns.module.css'

export default function DetailesAlbuns(){

    const router = useRouter()
    const {id} = router.query
    console.log(id)
    
    const lenMusics = albumData.albums[0].total_tracks
    console.log(`qtd de musicas: ${lenMusics}`)

    const [musicAtual, setAlbum] = useState(0)

    const nextMusic = () => {
        if(musicAtual < (lenMusics - 1)){
          setAlbum(musicAtual + 1)
          controlAudio({musicAtual: (musicAtual+1)})
        }
    }

    const previMusic = () => {
        if(musicAtual > 0){
          setAlbum(musicAtual - 1)
          controlAudio({musicAtual: (musicAtual-1)})
        }
    }

    const controlAudio = (props) => {
        const {musicAtual} = props

        var audio = document.getElementById('audio')
        audio.pause()
        audio.src = `${albumData.albums[0].tracks.items[musicAtual].preview_url}`
        audio.play()
    }

    return(
        <main className={styles.body}>
          <div className={styles.main}>
            <h1 className={styles.title}>{albumData.albums[0].name}</h1>
            <div className={styles.containerAlbuns}>
              
              <div className={styles.itemAlbum}>
                <img src={albumData.albums[0].images[0].url}></img>
                <div className={styles.content}>
                  <div className={styles.contentText}>
                    {albumData.albums[0].artists.map((artist) => (
                        <p>{artist.name}</p>
                      ))}
                  </div>
                  <p className={styles.nameMusic}>{albumData.albums[0].tracks.items[musicAtual].name}</p>
                  <p className={styles.qtdMusic}>Música: {musicAtual+1}/{albumData.albums[0].total_tracks}</p>
                  <div className={styles.conatinerAudio}>
                        <div className={musicAtual == 0 ? styles.disableArrowLeft : styles.arrowLeft} onClick={previMusic}><span class="material-symbols-outlined">skip_previous</span></div>
                        <audio id='audio' controls>
                            <source src={albumData.albums[0].tracks.items[musicAtual].preview_url} type='audio/mpeg'>
                            </source>
                        </audio>
                        <div className={musicAtual == (lenMusics-1) ? styles.disableArrowRight : styles.arrowRight} onClick={nextMusic}><span class="material-symbols-outlined">skip_next</span></div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </main>
    )
}