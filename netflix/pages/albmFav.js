import React, {useState} from "react";
import styles from '../styles/albmFav.module.css'
import { collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../utils/firebase/firebaseService';
import {notification} from 'antd'
import { useRouter } from "next/router";

export default function AlbmFavorito(){
    const [data, setData] = useState([]);
    const [searchApi, setSearchApi] = useState(false)
    const router = useRouter()
    var hasUser = true

    const carregaAlbum = async () => {
        try{
            if(auth.currentUser){
                var newData = []
                const querySnapshot = await getDocs(collection(db, `usuarios/${auth.currentUser.uid}/album`));

                querySnapshot.forEach((doc) => {
                    var docData = doc.data();
                    newData.push({image: docData.image, nameArtista: docData.nameArt, nameAlbum: docData.nameAlbum, docId: doc.id});
                })
                setData(newData)
                setSearchApi(true)
            }
            else{
                hasUser = false
            }
            
        } catch(error){
            openNotification({placement: 'topRight', title: 'ERRO', descricao: 'NÃO FOI POSSÍVEL CONTINUAR, TENTE NOVAMENTE!'})
        }
    }
    if(data.length == 0){
        carregaAlbum()
    }

    const deleteAlbum = async (props) => {
        const {id} = props

        try{
            if(auth.currentUser){

                await deleteDoc(doc(db, `usuarios/${auth.currentUser.uid}/album`, id));
                setData([])
                setSearchApi(false)
            }
            else{
                openNotification({placement: 'topRight', title: 'ERRO', descricao: 'NÃO FOI POSSÍVEL CONTINUAR, USUÁRIO NÃO ENCONTRADO!'})
            }
            
        } catch(error){
            openNotification({placement: 'topRight', title: 'ERRO', descricao: 'NÃO FOI POSSÍVEL CONTINUAR, TENTE NOVAMENTE!'})
        }
    }

    const [api, contextHolder] = notification.useNotification();
    const openNotification = ({placement, title, descricao}) => {
        api.info({
            message: `${title}`,
            description: `${descricao}`,
            placement,
        });
    }

    const detailsAlb = (props) => {
        const {docId} = props
        router.push({
            pathname: './detailsFavAlb',
            query: {docId}
        })
    }

    return(
        <div className={styles.body}>
            {contextHolder}
            {
                data.length == 0 && searchApi == false && hasUser == true
                ?
                <Load/>
                :
                data.length == 0 && searchApi == true
                ?
                <Mensagem/>
                :
                data.length == 0 && hasUser == false
                ?
                <Mensagem2/>
                :
                <div className={styles.main}>
                    <div className={styles.title}><h1>Sua Lista de Álbuns Favoritos</h1></div>
                    <div className={styles.conteudo}>
                        {data.map((item) => (
                            <div className={styles.itemAlbum}>
                                <div onClick={() => deleteAlbum({id: item.docId})} className={styles.iconDelete}>
                                    <span class="material-symbols-outlined">delete</span>
                                </div>
                                <div onClick={() => detailsAlb({docId: item.docId})} className={styles.card}>
                                    <img src={item.image}></img>
                                </div>
                                <h1>{item.nameAlbum}</h1>
                                <div className={styles.containerArt}>
                                    {item.nameArtista.map((artista) => (
                                        <p>{artista.nome}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

function Mensagem(){
    return(
        <div className={styles.containerMensagem}>
            <div className={styles.contIcon}>
                <span class="material-symbols-outlined">warning</span>
            </div>
            <h1>SUA LISTA ESTÁ VAZIA!</h1>
        </div>
    )
}

function Mensagem2(){
    return(
        <div className={styles.containerMensagem}>
            <div className={styles.contIcon}>
                <span class="material-symbols-outlined">warning</span>
            </div>
            <h1>USUÁRIO NÃO CADASTRADO NO SISTEMA!</h1>
        </div>
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