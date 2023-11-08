import React, {useState} from 'react'
import styles from '../styles/artists.module.css'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import artistsData01 from '../repository/searchArtists01.json'
import artistsData02 from '../repository/searchArtists02.json'
import artistsData03 from '../repository/searchArtists03.json'

async function carregaArtista(url){
    const options = {
        method: 'GET',
        headers: {
        'X-RapidAPI-Key': 'dc8f4e0d13msh0a30c408daca17dp1ec9d2jsn147d94a16c74',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    const res = await fetch(url, options)
    const resJson  = await res.json()
    return resJson
}

export default function Artists(){

    const router = useRouter()
    const { artista } = router.query
    //console.log(router.query.artista)
    const [artistsAtuais, setArtists] = useState([0,1])

    const url = `https://spotify23.p.rapidapi.com/search/?q=${router.query.artista}&type=artists&offset=0&limit=10&numberOfTopResults=5`;

    //const data = carregaArtista(url)

    const {data, error} = useSWR(url, carregaArtista)
    
    if (!data){ 
        return (<Load/>)
        //setLoad(true)
    }
    
    if(data){
        console.log(data.artists)
    }

    const artistsTotal = artistsData01.artists.items.length
    
    const nextArtists = () => {
        if(((artistsAtuais[0]+2) < artistsTotal) && ((artistsAtuais[1]+2) < artistsTotal)){
            setArtists([(artistsAtuais[0] + 2), (artistsAtuais[1] + 2)])
            console.log(artista)
        }
    }

    const previArtists = () => {
        if(((artistsAtuais[0]-2) >= 0) && ((artistsAtuais[1]-2) >= 0)){
            setArtists([(artistsAtuais[0] - 2), (artistsAtuais[1] - 2)])
        }
    }

    return(
        <main className={styles.body}> 
            <div className={styles.main}>
                <h1 className={styles.title}>Artistas Relacionados a sua Pesquisa</h1>
                <div className={styles.containerArtists}>
                    <div className={artistsAtuais[0] == 0 ? styles.arrowLeftDesable : styles.arrowLeft} onClick={previArtists}>
                        <span class="material-symbols-outlined">arrow_back_ios</span>
                    </div>
                    <div className={styles.itemArtists}>
                        <div className={styles.containerImg}><img src={artistsData01.artists.items[artistsAtuais[0]].data.visuals.avatarImage == null ? '/artistsNull.png' : artistsData01.artists.items[artistsAtuais[0]].data.visuals.avatarImage.sources[0].url}></img></div>
                        <h1 className={styles.nameArtists}>{artistsData01.artists.items[artistsAtuais[0]].data.profile.name}</h1>                        
                    </div>

                    <div className={styles.itemArtists}>
                        <div className={styles.containerImg}><img src={artistsData01.artists.items[artistsAtuais[1]].data.visuals.avatarImage == null ? '/artistsNull.png' : artistsData01.artists.items[artistsAtuais[1]].data.visuals.avatarImage.sources[0].url}></img></div>
                        <h1 className={styles.nameArtists}>{artistsData01.artists.items[artistsAtuais[1]].data.profile.name}</h1>                        
                    </div>
                    <div className={artistsAtuais[1] == 9 ? styles.arrowRightDesable : styles.arrowRight} onClick={nextArtists}>
                        <span class="material-symbols-outlined">arrow_forward_ios</span>
                    </div>
                </div>
            </div>
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