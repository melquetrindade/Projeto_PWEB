import React, {useState} from 'react'
import styles from '../styles/detailsFavAlb.module.css'
import { useRouter } from 'next/router'
import { collection, getDoc, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../utils/firebase/firebaseService';
import {notification} from 'antd'
import { message } from 'antd';

export default function DetalhesAlbum(){

  const router = useRouter()
  const [data, setData] = useState([]);
  const {docId} = router.query

  var lenMusics = 0
  if(data.length > 0){
    lenMusics = data[0].tracks.length
  }

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
      audio.src = `${data[0].tracks[musicAtual].preview}`
      audio.play()
  }

  const carregaAlbum = async () => {

    try{
      if(auth.currentUser){
          //openMessage()
          var newData = []

          const querySnapshot = await getDoc(doc(db, `usuarios/${auth.currentUser.uid}/album`, docId));
          const snapData = querySnapshot.data()

          newData.push({img: snapData.image, tracks: snapData.musics, nameAlbum: snapData.nameAlbum, nameArtista: snapData.nameArt})
          setData(newData)
      }
      else{
          console.error('Usuário não encontrado');
          //openNotification({placement: 'topRight', title: 'ERRO', descricao: 'NÃO FOI POSSÍVEL CONTINUAR, USUÁRIO NÃO ENCONTRADO!'})
      }
        
    } catch(error){
        console.error('Erro ao adicionar dado:', error);
        //openNotification({placement: 'topRight', title: 'ERRO', descricao: 'NÃO FOI POSSÍVEL CONTINUAR, TENTE NOVAMENTE!'})
    }
  }

  if(data.length == 0){
    carregaAlbum()
  }

  return(
      <main className={styles.body}>
        {
          data.length == 0
          ?
          <Load/>
          :
          <div className={styles.main}>
            <h1 className={styles.title}>{data.nameAlbum}</h1>
            <div className={styles.containerAlbuns}>
              <div className={styles.itemAlbum}>
                <img src={data[0].img}></img>
                <div className={styles.content}>
                  <div className={styles.contentText}>
                    {data[0].nameArtista.map((artist) => (
                        <p>{artist.nome}</p>
                      ))}
                  </div>
                  <p className={styles.nameMusic}>{data[0].tracks[musicAtual].nome}</p>
                  <p className={styles.qtdMusic}>Música: {musicAtual+1}/{lenMusics}</p>
                  <div className={styles.conatinerAudio}>
                        <div className={musicAtual == 0 ? styles.disableArrowLeft : styles.arrowLeft} onClick={previMusic}><span class="material-symbols-outlined">skip_previous</span></div>
                        <audio id='audio' controls>
                            <source src={data[0].tracks[musicAtual].preview} type='audio/mpeg'>
                            </source>
                        </audio>
                        <div className={musicAtual == (lenMusics-1) ? styles.disableArrowRight : styles.arrowRight} onClick={nextMusic}><span class="material-symbols-outlined">skip_next</span></div>
                  </div>
                </div>
              </div>
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