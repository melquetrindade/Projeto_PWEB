import React, {useState} from "react"
import styles from '../styles/album.module.css'
import { useRouter } from 'next/router';
import dataAlbuns from '../repository/searchAlbum01.json'

export default function Album(){

    const router = useRouter()
    const { album } = router.query
    //console.log(`no album: ${router.query.album}`)

    const [hasDados, setDados] = useState(true) // -> usar esse para testes
    const [status, setStatus] = useState('sucesso') // -> usar esse para testes

    //const [hasDados, setDados] = useState(false) -> usar esse quando for pegar da api
    //const [dataAlbuns, setAlbuns] = useState(undefined) -> usar esse quando for pegar da api
    //const [status, setStatus] = useState('load') -> usar esse quando for pegar da api

    const carregaDados = async () => {
        console.log('entrou no carrega')

        const url = `https://spotify23.p.rapidapi.com/search/?q=${router.query.album}&type=albums&offset=0&limit=10&numberOfTopResults=5`;

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
            console.log(resJson)
            setStatus('sucesso')
            setAlbuns(resJson)
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
                    <ShowContent data={dataAlbuns}/>
                    //<h1 className='text-center py-2'>Deu Certo</h1>
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
    const artistsTotal = data.albums.items.length
    
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

    return(
        <main className={styles.body}> 
            <div className={styles.main}>
                <h1 className={styles.title}>Álbuns Relacionados a sua Pesquisa</h1>
                <div className={styles.containerArtists}>
                    <div className={artistsAtuais[0] == 0 ? styles.arrowLeftDesable : styles.arrowLeft} onClick={previArtists}>
                        <span class="material-symbols-outlined">arrow_back_ios</span>
                    </div>
                    <div className={styles.itemArtists}>
                        <div className={styles.containerImg}><img src={data.albums.items[artistsAtuais[0]].data.coverArt.sources == null ? '/artistsNull.png' : data.albums.items[artistsAtuais[0]].data.coverArt.sources[2].url}></img></div>
                        <h1 className={styles.nameArtists}>{data.albums.items[artistsAtuais[0]].data.name}</h1>
                        <div className={styles.contentText}>
                            {data.albums.items[artistsAtuais[0]].data.artists.items.map((itemArtist) => (
                                <p>{itemArtist.profile.name}</p>
                            ))}
                        </div>
                        <p>{data.albums.items[artistsAtuais[1]].data.date.year}</p>                 
                    </div>

                    <div className={styles.itemArtists}>
                        <div className={styles.containerImg}><img src={data.albums.items[artistsAtuais[1]].data.coverArt.sources == null ? '/artistsNull.png' : data.albums.items[artistsAtuais[1]].data.coverArt.sources[2].url}></img></div>
                        <h1 className={styles.nameArtists}>{data.albums.items[artistsAtuais[1]].data.name}</h1>
                        <div className={styles.contentText}>
                            {data.albums.items[artistsAtuais[1]].data.artists.items.map((itemArtist) => (
                                <p>{itemArtist.profile.name}</p>
                            ))}
                        </div>
                        <p>{data.albums.items[artistsAtuais[1]].data.date.year}</p>                      
                    </div>
                    <div className={artistsAtuais[1] == 9 ? styles.arrowRightDesable : styles.arrowRight} onClick={nextArtists}>
                        <span class="material-symbols-outlined">arrow_forward_ios</span>
                    </div>
                </div>
            </div>
        </main>
    )
}