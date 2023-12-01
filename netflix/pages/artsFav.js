import React, {useState} from "react";
import styles from '../styles/artsFav.module.css'
import { collection, getDocs, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../utils/firebase/firebaseService';
import {notification} from 'antd'

export default function ArtFavorito(){
    const [data, setData] = useState([]);
    const [searchApi, setSearchApi] = useState(false)

    const carregaArtistas = async () => {
        try{
            if(auth.currentUser){
                var newData = []
                const querySnapshot = await getDocs(collection(db, `usuarios/${auth.currentUser.uid}/artistas`));
                querySnapshot.forEach((doc) => {

                    var docData = doc.data();
                    newData.push({image: docData.image, name: docData.name, docId: doc.id});

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
            console.error('Erro ao adicionar dado:', error);
            openNotification({placement: 'topRight', title: 'ERRO', descricao: 'NÃO FOI POSSÍVEL CONTINUAR, TENTE NOVAMENTE!'})
        }
    }
    if(data.length == 0){
        carregaArtistas()
    }

    const deleteArtista = async (props) => {
        const {id} = props

        try{
            if(auth.currentUser){
                console.log('entrou no delete')
                console.log(id)

                await deleteDoc(doc(db, `usuarios/${auth.currentUser.uid}/artistas`, id));
                setData([])
                setSearchApi(false)
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

    return(
        <div className={styles.body}>
            {contextHolder}
            {
                data.length == 0 && searchApi == false
                ?
                <Load/>
                :
                data.length == 0 && searchApi == true
                ?
                <Mensagem/>
                :
                <div className={styles.main}>
                    <div className={styles.title}><h1>Sua Lista de Artistas Favoritos</h1></div>
                    <div className={styles.content}>
                        {data.map((artista) => (
                            <div className={styles.itemArtists}>
                                <div onClick={() => deleteArtista({id: artista.docId})} className={styles.iconDelete}>
                                    <span class="material-symbols-outlined">delete</span>
                                </div>
                                <div className={styles.containerImg}>
                                    <img src={artista.image == null ? '/artistsNull.png' : artista.image}></img>
                                </div>
                                <h1 className={styles.nameArtists}>{artista.name}</h1>                        
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
            <h1>SUA LISTA ESTÁ VAZIA</h1>
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