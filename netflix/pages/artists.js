import React, {useState} from 'react'
import styles from '../styles/artists.module.css'
import { useRouter } from 'next/router'
import dataArtists from '../repository/searchArtists01.json'
import { collection, addDoc, getDocs, doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../utils/firebase/firebaseService';

export default function Artists(){

    console.log(db)
    console.log('=================')
    console.log(auth.currentUser.uid)

    const router = useRouter()
    const { artista } = router.query

    const [hasDados, setDados] = useState(true) // -> usar esse para testes
    const [status, setStatus] = useState('sucesso') // -> usar esse para testes

    //const [hasDados, setDados] = useState(false)  -> usar esse quando for pegar da api
    //const [dataArtists, setArtists] = useState(undefined) -> usar esse quando for pegar da api
    //const [status, setStatus] = useState('load') -> usar esse quando for pegar da api

    const carregaDados = async () => {
        console.log('entrou no carrega')

        const url = `https://spotify23.p.rapidapi.com/search/?q=${router.query.artista}&type=artists&offset=0&limit=10&numberOfTopResults=5`;

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
            setArtists(resJson)
            setDados(true)
        }  
    }

    if (hasDados == false){ 
        carregaDados()
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
                    <ShowContent data={dataArtists}/>
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

function ShowContent({data}){

    const [artistsAtuais, setArtists] = useState([0,1])
    const artistsTotal = data.artists.items.length
    
    const nextArtists = () => {
        if(((artistsAtuais[0]+2) < artistsTotal) && ((artistsAtuais[1]+2) < artistsTotal)){
            setArtists([(artistsAtuais[0] + 2), (artistsAtuais[1] + 2)])
        }
    }

    const previArtists = () => {
        if(((artistsAtuais[0]-2) >= 0) && ((artistsAtuais[1]-2) >= 0)){
            setArtists([(artistsAtuais[0] - 2), (artistsAtuais[1] - 2)])
        }
    }

    const recuperaID = async (props) => {
        const {id} = props
        //console.log(id)
        try{
            if(auth.currentUser){
                var idRecuperado = id.split(':artist:')
                
                /*
                await addDoc(collection(db, `usuarios/${auth.currentUser.uid}/artistasFav`), {
                    idArtista: idRecuperado[1]
                })*/

                /*
                await addDoc(collection(db, `usuarios/${auth.currentUser.uid}/testes`)).doc('language').setDoc({
                    local: 'pt_BR',
                })*/
            }
        }catch (error){
            console.error('Erro ao adicionar dado:', error);
        }
        
        //console.log(`id: ${idRecuperado[1]}`)
    }

    return(
        <div className={styles.main}>
            <h1 className={styles.title}>Artistas Relacionados a sua Pesquisa</h1>
            <div className={styles.containerArtists}>
                <div className={artistsAtuais[0] == 0 ? styles.arrowLeftDesable : styles.arrowLeft} onClick={previArtists}>
                    <span class="material-symbols-outlined">arrow_back_ios</span>
                </div>
                <div className={styles.itemArtists}>
                    <div className={styles.iconFav} onClick={() => recuperaID({id: data.artists.items[artistsAtuais[0]].data.uri})}><span class="material-symbols-outlined">favorite</span></div>
                    <div className={styles.containerImg}><img src={data.artists.items[artistsAtuais[0]].data.visuals.avatarImage == null ? '/artistsNull.png' : data.artists.items[artistsAtuais[0]].data.visuals.avatarImage.sources[0].url}></img></div>
                    <h1 className={styles.nameArtists}>{data.artists.items[artistsAtuais[0]].data.profile.name}</h1>                        
                </div>

                <div className={styles.itemArtists}>
                    <div className={styles.iconFav} onClick={() => recuperaID({id: data.artists.items[artistsAtuais[1]].data.uri})}><span class="material-symbols-outlined">favorite</span></div>
                    <div className={styles.containerImg}><img src={data.artists.items[artistsAtuais[1]].data.visuals.avatarImage == null ? '/artistsNull.png' : data.artists.items[artistsAtuais[1]].data.visuals.avatarImage.sources[0].url}></img></div>
                    <h1 className={styles.nameArtists}>{data.artists.items[artistsAtuais[1]].data.profile.name}</h1>                        
                </div>
                <div className={artistsAtuais[1] == 9 ? styles.arrowRightDesable : styles.arrowRight} onClick={nextArtists}>
                    <span class="material-symbols-outlined">arrow_forward_ios</span>
                </div>
            </div>
        </div>
    )
}