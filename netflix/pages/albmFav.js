import React, {useState} from "react";
import styles from '../styles/albmFav.module.css'
import { collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../utils/firebase/firebaseService';
import {notification} from 'antd'
import { message } from 'antd';

export default function AlbmFavorito(){
    const [data, setData] = useState([]);
    const [searchApi, setSearchApi] = useState(false)

    const carregaAlbum = async () => {
        try{
            if(auth.currentUser){
                var newData = []
                const querySnapshot = await getDocs(collection(db, `usuarios/${auth.currentUser.uid}/album`));

                querySnapshot.forEach((doc) => {
                    var docData = doc.data();
                    newData.push({image: docData.image, nameArtista: docData.nameArt, nameAlbum: docData.nameAlbum, docId: doc.id});

                    //código para saber o número de propriedades de um doc

                    //const dadosDocumento = doc.data();
                    //console.log(dadosDocumento.name)
                    //const qtd = Object.keys(dadosDocumento).length;
                    //console.log(qtd)
                })
                setData(newData)
                setSearchApi(true)
            }
            else{
                //console.error('Usuário não encontrado');
                openNotification({placement: 'topRight', title: 'ERRO', descricao: 'NÃO FOI POSSÍVEL CONTINUAR, USUÁRIO NÃO ENCONTRADO!'})
            }
            
        } catch(error){
            //console.error('Erro ao adicionar dado:', error);
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
                openMessage()

                await deleteDoc(doc(db, `usuarios/${auth.currentUser.uid}/album`, id));
                setData([])
            }
            else{
                //console.error('Usuário não encontrado');
                openNotification({placement: 'topRight', title: 'ERRO', descricao: 'NÃO FOI POSSÍVEL CONTINUAR, USUÁRIO NÃO ENCONTRADO!'})
            }
            
        } catch(error){
            //console.error('Erro ao adicionar dado:', error);
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

    const [messageApi, contextHolder2] = message.useMessage();
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

    return(
        <div className={styles.body}>
            {contextHolder}
            {contextHolder2}
            {
                data.length == 0 && searchApi == false
                ?
                <Load/>
                :
                data.length == 0 && searchApi == true
                ?
                <h1>Lista vazia</h1>
                :
                <div className={styles.main}>
                    <h1>Página de Álbuns Favoritos</h1>
                    <div className={styles.conteudo}>
                        {data.map((item) => (
                            <div className={styles.itemAlbum}>
                                <div onClick={() => deleteAlbum({id: item.docId})} className={styles.iconDelete}>
                                    <span class="material-symbols-outlined">delete</span>
                                </div>
                                <div className={styles.card}>
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

function Load(){
    return(
        <div className={styles.fade}>
            <div class="spinner-border text-info" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}