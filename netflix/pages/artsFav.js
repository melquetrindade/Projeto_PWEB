import React, {useState} from "react";
import styles from '../styles/artsFav.module.css'
import { collection, addDoc, getDocs, doc, setDoc, getDoc, CollectionReference, get } from 'firebase/firestore';
import { db, auth } from '../utils/firebase/firebaseService';

export default function ArtFavorito(){
    const [data, setData] = useState([]);

    const carregaArtistas = async () => {
        try{
            if(auth.currentUser){

                const querySnapshot = await getDocs(collection(db, `us/${auth.currentUser.uid}/artistas`));
                querySnapshot.forEach((doc) => {
                    
                    //código para saber o número de propriedades de um doc

                    const dadosDocumento = doc.data();
                    console.log(dadosDocumento.name)
                    const qtd = Object.keys(dadosDocumento).length;
                    console.log(qtd)
                })
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
        carregaArtistas()
    }
    //carregaArtistas()
    //console.log(data.length)

    return(
        <div className={styles.body}>
            <div className={styles.main}><h1>Página de Artistas Favoritos</h1></div>
        </div>
    )
}