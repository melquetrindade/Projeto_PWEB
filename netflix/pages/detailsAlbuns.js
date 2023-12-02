import React, {useState} from 'react'
//import albumData from '../repository/getAlbum02.json'
import { useRouter } from 'next/router';
import styles from '../styles/detailsAlbuns.module.css'
import { collection, addDoc, getDocs} from 'firebase/firestore';
import { db, auth } from '../utils/firebase/firebaseService';
import { message } from 'antd';
import {notification} from 'antd'

export default function DetailesAlbuns(){

    const router = useRouter()
    const {id} = router.query

    //const [hasDados, setDados] = useState(true) // -> usar esse para testes
    //const [status, setStatus] = useState('sucesso') // -> usar esse para testes

    const [hasDados, setDados] = useState(false) //-> usar esse quando for pegar da api
    const [dataAlbuns, setAlbuns] = useState(undefined) //-> usar esse quando for pegar da api
    const [status, setStatus] = useState('load') //-> usar esse quando for pegar da api

    const carregaDados = async () => {

        const url = `https://spotify23.p.rapidapi.com/albums/?ids=${router.query.id}`;

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
            setAlbuns(resJson)
            setDados(true)
        }  
    }

    if (hasDados == false){
        carregaDados()
    }

    var lenMusics = 0
    if(hasDados == true){
        lenMusics = dataAlbuns.albums[0].total_tracks
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
        audio.src = `${dataAlbuns.albums[0].tracks.items[musicAtual].preview_url}`
        audio.play()
    }

    const [api, contextHolder2] = notification.useNotification();
    const openNotification = ({placement, title, descricao}) => {
        api.info({
            message: `${title}`,
            description: `${descricao}`,
            placement,
        });
    }

    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';

    const openMessage = () => {
        messageApi.open({
        key,
        type: 'loading',
        content: 'Loading...',
        });
        setTimeout(() => {
            messageApi.open({
                key,
                type: 'success',
                content: 'Loaded!',
                duration: 2,
            });
        }, 1000);
    };

    const recuperaID = async (props) => {
      const {id, img, tracks ,nomeArtista, nomeAlbum} = props

      try{
        if(auth.currentUser){
              var existsId = false
              const querySnapshot = await getDocs(collection(db, `usuarios/${auth.currentUser.uid}/album`));

              try{
                  querySnapshot.forEach((doc) => {
                      if(doc.data().id == id){
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

                  await addDoc(collection(db, `usuarios/${auth.currentUser.uid}/album`), {
                      id: id,
                      image: img,
                      nameArt: nomeArtista,
                      musics: tracks,
                      nameAlbum: nomeAlbum
                  })

              }
              else{
                  openNotification({placement: 'topRight', title: 'ERRO', descricao: 'ESTE ÁLBUM JÁ FOI FAVORITADO!'})
              }
        }
        else{
            openNotification({placement: 'topRight', title: 'ERRO', descricao: 'USUÁRIO NÃO CADASTRADO NO SISTEMA!'})
        }
      }catch (error){
          openNotification({placement: 'topRight', title: 'ERRO', descricao: 'NÃO FOI POSSÍVEL CONTINUAR, TENTE NOVAMENTE!'})
      }
    }  

    return(
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
                        {contextHolder}
                        {contextHolder2}
                        <h1 className={styles.title}>{dataAlbuns.albums[0].name}</h1>
                        <div className={styles.containerAlbuns}>
                        
                            <div className={styles.itemAlbum}>
                                <div className={styles.iconFav} onClick={() => recuperaID({

                                id:  dataAlbuns.albums[0].id,
                                img: dataAlbuns.albums[0].images[0].url,
                                tracks: dataAlbuns.albums[0].tracks.items.map((valor) => {
                                    return {nome: valor.name, preview: valor.preview_url}
                                }, {}),    
                                nomeArtista: dataAlbuns.albums[0].artists.map((valor) => {
                                    return {nome: valor.name}
                                }, {}),
                                nomeAlbum: dataAlbuns.albums[0].name
                                
                                })}><span class="material-symbols-outlined">favorite</span></div>
                                <img src={dataAlbuns.albums[0].images[0].url}></img>
                                <div className={styles.content}>
                                <div className={styles.contentText}>
                                    {dataAlbuns.albums[0].artists.map((artist) => (
                                        <p>{artist.name}</p>
                                    ))}
                                </div>
                                <p className={styles.nameMusic}>{dataAlbuns.albums[0].tracks.items[musicAtual].name}</p>
                                <p className={styles.qtdMusic}>Música: {musicAtual+1}/{dataAlbuns.albums[0].total_tracks}</p>
                                <div className={styles.conatinerAudio}>
                                        <div className={musicAtual == 0 ? styles.disableArrowLeft : styles.arrowLeft} onClick={previMusic}><span class="material-symbols-outlined">skip_previous</span></div>
                                        <audio id='audio' controls>
                                            <source src={dataAlbuns.albums[0].tracks.items[musicAtual].preview_url} type='audio/mpeg'>
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