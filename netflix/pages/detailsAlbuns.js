import React, {useState} from 'react'
import albumData from '../repository/getAlbum01.json'
import { useRouter } from 'next/router';
import styles from '../styles/detailsAlbuns.module.css'
import { collection, addDoc, getDocs} from 'firebase/firestore';
import { db, auth } from '../utils/firebase/firebaseService';
import { message } from 'antd';
import {notification} from 'antd'

export default function DetailesAlbuns(){

    const router = useRouter()
    const {id} = router.query
    console.log(id)
    
    const lenMusics = albumData.albums[0].total_tracks

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

    const recuperaID = async (props) => {
      const {id, img, tracks ,nomeArtista} = props

      console.log(id)
      console.log(img)
      console.log(tracks)
      console.log(nomeArtista)
      //console.log(nomeMusicas)
      //console.log(nomeArtista)

      /*
      try{
          if(auth.currentUser){
              var idRecuperado = id.split(':artist:')
              var existsId = false

              const querySnapshot = await getDocs(collection(db, `usuarios/${auth.currentUser.uid}/artistas`));

              try{
                  querySnapshot.forEach((doc) => {
                      if(doc.data().id == idRecuperado[1]){
                          existsId = true
                          throw new Error('StopIteration');
                      }
                  })
              } catch (e){
                  if (e.message !== 'StopIteration') {
                      throw e;
                  }
              }

              if(existsId == false){
                  openMessage()

                  await addDoc(collection(db, `usuarios/${auth.currentUser.uid}/artistas`), {
                      id: idRecuperado[1],
                      name: nome,
                      image: img 
                  })

                  //querySnapshot.forEach((doc) => {
                      /*
                      código para saber o número de propriedades de um doc

                      const dadosDocumento = doc.data();
                      const qtd = Object.keys(dadosDocumento).length;
                      console.log(qtd)
                       
                      código para saber o número de doc's dentro de uma coleção

                      console.log(querySnapshot.size)
                      */
                  //})
              
              //}
              //else{
                  //openNotification({placement: 'topRight', title: 'ERRO', descricao: 'ESTE ARTISTA JÁ FOI FAVORITADO!'})
              //}
              
              /*
              await addDoc(collection(db, `usuarios/${auth.currentUser.uid}/testes`)).doc('language').setDoc({
                  local: 'pt_BR',
              })*/
              
          //}
      //}catch (error){
          //console.error('Erro ao adicionar dado:', error);
          //openNotification({placement: 'topRight', title: 'ERRO', descricao: 'NÃO FOI POSSÍVEL CONTINUAR, TENTE NOVAMENTE!'})
      //}
    }  
    var cont = 0
    return(
        <main className={styles.body}>
          <div className={styles.main}>
            <h1 className={styles.title}>{albumData.albums[0].name}</h1>
            <div className={styles.containerAlbuns}>
              
              <div className={styles.itemAlbum}>
                <div className={styles.iconFav} onClick={() => recuperaID({
                  id:  albumData.albums[0].id,
                  
                  img: albumData.albums[0].images[0].url,
                  
                  tracks: albumData.albums[0].tracks.items.map((valor) => {
                    //console.log(valor.preview_url)
                    //cont +=1
                    //objeto[`obj${cont}`] = { nome: valor.name, preview: valor.preview_url}
                    //objeto['preview'] = valor.preview_url
                    //nome: music.name;
                    //preview: music.preview_url
                    //return objeto
                    return {nome: valor.name, preview: valor.preview_url}
                  }, {}),
                  
                  nomeArtista: albumData.albums[0].artists.map((valor) => {
                    //objeto['nome'] = valor.name
                    //return objeto
                    return {nome: valor.name}
                  }, {}),
                  
                })}><span class="material-symbols-outlined">favorite</span></div>
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