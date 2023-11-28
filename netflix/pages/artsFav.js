import React, {useState} from "react";
import styles from '../styles/artsFav.module.css'
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../utils/firebase/firebaseService';

export default function ArtFavorito(){
    const [data, setData] = useState([]);

    const carregaArtistas = async () => {
        try{
            if(auth.currentUser){
                var newData = []
                const querySnapshot = await getDocs(collection(db, `usuarios/${auth.currentUser.uid}/artistas`));
                querySnapshot.forEach((doc) => {
                    var docData = doc.data();
                    newData.push({image: docData.image, name: docData.name});

                    //código para saber o número de propriedades de um doc

                    //const dadosDocumento = doc.data();
                    //console.log(dadosDocumento.name)
                    //const qtd = Object.keys(dadosDocumento).length;
                    //console.log(qtd)
                })
                setData(newData)
            }
            else{
                console.error('Usuário não encontrado');
            }
            
        } catch(error){
            console.error('Erro ao adicionar dado:', error);
            //openNotification({placement: 'topRight', title: 'ERRO', descricao: 'NÃO FOI POSSÍVEL CONTINUAR, TENTE NOVAMENTE!'})
        }
    }
    if(data.length == 0){
        console.log('entrou na func de carregar')
        carregaArtistas()
    }
    console.log(data)
    return(
        <div className={styles.body}>
            <div className={styles.main}>
                <h1>Página de Artistas Favoritos</h1>
                <div className={styles.content}>
                    {data.map((artista) => (
                        <div className={styles.itemArtists}>
                            <div className={styles.containerImg}><img src={artista.image == null ? '/artistsNull.png' : artista.image}></img></div>
                            <h1 className={styles.nameArtists}>{artista.name}</h1>                        
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}