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

      return (
        <main className={styles.body}>
          <div className={styles.main}>
            <h1 className={styles.title}>Álbuns Recomendados</h1>
            <div className={styles.containerAlbuns}>
              <div className={albumAtual == 0 ? styles.disableArrowLeft : styles.arrowLeft} onClick={previAlbum}><span class="material-symbols-outlined">arrow_back_ios</span></div>
              <div className={styles.itemAlbum}>
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










//https://spotify23.p.rapidapi.com/search/?q=marilia%20mendonca&type=artists&offset=0&limit=10&numberOfTopResults=5
      /*
      const url = "https://spotify23.p.rapidapi.com/search/?q=marilia%20mendonca&type=artists&offset=0&limit=10&numberOfTopResults=5";
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'dc8f4e0d13msh0a30c408daca17dp1ec9d2jsn147d94a16c74',
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
      };

      const carregaArtista = async () => {
      
        const res = await fetch(url, options)
        const resJson  = await res.json()
        console.log(resJson)
      }*/

/*
  const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=artist:'alok'";
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c94858764dmshc1ff10de77281dap1fa1d3jsnd03d84e68211',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  };

  const carregaArtista = async () => {
  
    const res = await fetch(url, options)
    const resJson  = await res.json()
    console.log(resJson.data[0].artist.name)
  }*/

/*
  const dados = fetch(url, options).then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição à API');
    }
    return response.json();
  }).then(data => {
    // Manipule os dados da API aqui
    //console.log(data);
  }).catch(error => {
    console.error('Ocorreu um erro:', error);
  });
  console.log(dados)*/

/*
  const headers = {
    'Authorization': 'Bearer live_13f6d8aedb6f165f04b113e93e599c'
  };

  fetch("https://api.api-futebol.com.br/v1/times/18", {
    method: 'GET',
    headers: headers
  }).then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição à API');
      }
      return response.json();
    }).then(data => {
      // Manipule os dados da API aqui
      console.log(data);
    }).catch(error => {
      console.error('Ocorreu um erro:', error);
    });*/

    /*
    const myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", "508e3cdc74158ae97f50d2a20a9aa9c9");
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    fetch("https://v3.football.api-sports.io/leagues", requestOptions).then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição à API');
        }
        return response.json();
      }).then(data => {
        // Manipule os dados da API aqui
        console.log(data);
      }).catch(error => {
        console.error('Ocorreu um erro:', error);
      });*/