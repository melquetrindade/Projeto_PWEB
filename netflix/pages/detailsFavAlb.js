import React from 'react'
import styles from '../styles/detailsFavAlb.module.css'
import { useRouter } from 'next/router'
import { collection, getDoc, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../utils/firebase/firebaseService';
import {notification} from 'antd'
import { message } from 'antd';

export default function DetalhesAlbum(){

    const router = useRouter()
    const [data, setData] = useState([]);
    const [searchApi, setSearchApi] = useState(false)
    const {docId} = router.query
    console.log(docId)

    const deleteAlbum = async (props) => {
        const {id} = props

        try{
            if(auth.currentUser){
                //openMessage()
                console.log('entrou para carregar o album')
                //var newData = []
                //const referenciaDoDocumento = doc(db, colecao, idDoDocumento);
                const querySnapshot = await getDoc(doc(db, `usuarios/${auth.currentUser.uid}/album`, id));
                console.log(querySnapshot)
                ///const querySnapshot = await getDoc(collection(db, `usuarios/${auth.currentUser.uid}/album`));
                //await deleteDoc(doc(db, `usuarios/${auth.currentUser.uid}/album`, id));
                //setData([])
            }
            else{
                //console.error('Usuário não encontrado');
                openNotification({placement: 'topRight', title: 'ERRO', descricao: 'NÃO FOI POSSÍVEL CONTINUAR, USUÁRIO NÃO ENCONTRADO!'})
            }
            
        } catch(error){
            //console.error('Erro ao adicionar dado:', error);
            //openNotification({placement: 'topRight', title: 'ERRO', descricao: 'NÃO FOI POSSÍVEL CONTINUAR, TENTE NOVAMENTE!'})
        }
    }

    return(
        <main className={styles.body}>
          <h1>Página de detalhes</h1>
        </main>
    )
}

/* 
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
*/