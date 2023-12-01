import styles from '../styles/page.module.css'
import React, {useState} from 'react';
import albumData from '../repository/home.json'

export default function Home() {

      //const lenDados = Object.keys(albumData.tracks).length

      const [albumAtual, setAlbum] = useState(0)

      //https://spotify23.p.rapidapi.com/recommendations/?limit=10&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=rock%2Cpop

      //const [hasDados, setDados] = useState(true) // -> usar esse para testes
      //const [status, setStatus] = useState('sucesso') // -> usar esse para testes

      const [hasDados, setDados] = useState(false)  //-> usar esse quando for pegar da api
      const [dataArtists, setArtists] = useState(undefined) //-> usar esse quando for pegar da api
      const [status, setStatus] = useState('load') ///-> usar esse quando for pegar da api

      var lenDados = 0
      if(hasDados == true){
          lenDados = Object.keys(dataArtists.tracks).length
      }

      const carregaDados = async () => {
          console.log('entrou no carrega')

          const url = `https://spotify23.p.rapidapi.com/recommendations/?limit=10&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=rock%2Cpop`;

          const options = {
              method: 'GET',
              headers: {
              'X-RapidAPI-Key': 'fb06ffc7acmsh5be3073c2bcc404p1f42bajsneb6e0cfa6922',
              'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
              }
          };
      
          const res = await fetch(url, options)
          const resJson  = await res.json()

          if(resJson.Response == 'False'){
              setStatus('erro')
          }
          else{
              setStatus('sucesso')
              setArtists(resJson)
              setDados(true)
          }  
      }

      if (hasDados == false){
          carregaDados()
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
        audio.src = `${dataArtists.tracks[musicAtual].preview_url}`
        audio.play()
      }

      return (
        <main className={styles.body}>
          {
            status == 'load'
            ?
              <Load/>
            :
            status == 'erro'
            ?
              <h1 className='text-center py-2'>Erro ao Buscar os Dados</h1>
            :
              <div className={styles.main}>
                <h1 className={styles.title}>Álbuns Recomendados</h1>
                <div className={styles.containerAlbuns}>
                  <div className={albumAtual == 0 ? styles.disableArrowLeft : styles.arrowLeft} onClick={previAlbum}><span class="material-symbols-outlined">arrow_back_ios</span></div>
                  <div className={styles.itemAlbum}>
                    <img src={dataArtists.tracks[albumAtual].album.images[0].url}></img>
                    <div className={styles.content}>
                      <h1 className={styles.nameAlbum}>{dataArtists.tracks[albumAtual].album.name}</h1>
                      <div className={styles.contentText}>
                        {dataArtists.tracks[albumAtual].album.artists.map((artist) => (
                            <p>{artist.name}</p>
                          ))}
                      </div>
                      <div className={styles.conatinerAudio}>
                          <audio id='audio' controls>
                            <source src={dataArtists.tracks[albumAtual].preview_url} type='audio/mpeg'>
                            </source>
                          </audio>
                      </div>
                    </div>
                  </div>
                  <div className={albumAtual == 9 ? styles.disableArrowRight : styles.arrowRight} onClick={nextAlbum}><span class="material-symbols-outlined">arrow_forward_ios</span></div>
                </div>
              </div>
          }
        </main>
      )
}

function Load(){
  return(
      <div className={styles.fade}>
          <div class="spinner-border text-info" role="status">
              <span class="visually-hidden">Loading...</span>
          </div>
      </div>
  )
}