import React, {useState} from "react";
import styles from '../styles/multiSearch.module.css'
import { useRouter } from "next/router";
import dataMulti from '../repository/searchMulti01.json'

export default function MultiSearch(){

    const router = useRouter()
    const {pesquisa} = router.query
    console.log(pesquisa)

    return(
        <main className={styles.body}>
            <ShowArtists data={dataMulti}/>
            <ShowAlbuns data={dataMulti}/>
        </main>
    )
}

//<ShowAlbuns data={dataMulti}/>

function ShowArtists({data}){

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

    return(
        <div className={styles.mainArtista}>
            <h1 className={styles.titleArtista}>Artistas Relacionados a sua Pesquisa</h1>
            <div className={styles.containerArtists}>
                <div className={artistsAtuais[0] == 0 ? styles.arrowLeftDesableArtista : styles.arrowLeftArtista} onClick={previArtists}>
                    <span class="material-symbols-outlined">arrow_back_ios</span>
                </div>
                <div className={styles.itemArtists}>
                    <div className={styles.containerImgArtista}><img src={data.artists.items[artistsAtuais[0]].data.visuals.avatarImage == null ? '/artistsNull.png' : data.artists.items[artistsAtuais[0]].data.visuals.avatarImage.sources[0].url}></img></div>
                    <h1 className={styles.nameArtists}>{data.artists.items[artistsAtuais[0]].data.profile.name}</h1>                        
                </div>

                <div className={styles.itemArtists}>
                    <div className={styles.containerImgArtista}><img src={data.artists.items[artistsAtuais[1]].data.visuals.avatarImage == null ? '/artistsNull.png' : data.artists.items[artistsAtuais[1]].data.visuals.avatarImage.sources[0].url}></img></div>
                    <h1 className={styles.nameArtists}>{data.artists.items[artistsAtuais[1]].data.profile.name}</h1>                        
                </div>
                <div className={artistsAtuais[1] == 9 ? styles.arrowRightDesableArtista : styles.arrowRightArtista} onClick={nextArtists}>
                    <span class="material-symbols-outlined">arrow_forward_ios</span>
                </div>
            </div>
        </div>
    )
}

function ShowAlbuns({data, router}){

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

    const navDetailsAlbuns = () => {
        router.push({
            pathname: './detailsAlbuns',
            query: {id: 'opa'}
        })
    }

    return(
        <div className={styles.mainAlbum}>
            <h1 className={styles.titleAlbum}>Álbuns Relacionados a sua Pesquisa</h1>
            <div className={styles.containerAlbum}>
                <div className={artistsAtuais[0] == 0 ? styles.arrowLeftDesableAlbum : styles.arrowLeftAlbum} onClick={previArtists}>
                    <span class="material-symbols-outlined">arrow_back_ios</span>
                </div>
                <div className={styles.itemAlbum} onClick={navDetailsAlbuns}>
                    <div className={styles.containerImgAlbum}><img src={data.albums.items[artistsAtuais[0]].data.coverArt.sources == null ? '/artistsNull.png' : data.albums.items[artistsAtuais[0]].data.coverArt.sources[2].url}></img></div>
                    <h1 className={styles.nameArtists}>{data.albums.items[artistsAtuais[0]].data.name}</h1>
                    <div className={styles.contentText}>
                        {data.albums.items[artistsAtuais[0]].data.artists.items.map((itemArtist) => (
                            <p>{itemArtist.profile.name}</p>
                        ))}
                    </div>
                    <p>{data.albums.items[artistsAtuais[1]].data.date.year}</p>                 
                </div>

                <div className={styles.itemAlbum} onClick={navDetailsAlbuns}>
                    <div className={styles.containerImgAlbum}><img src={data.albums.items[artistsAtuais[1]].data.coverArt.sources == null ? '/artistsNull.png' : data.albums.items[artistsAtuais[1]].data.coverArt.sources[2].url}></img></div>
                    <h1 className={styles.nameArtists}>{data.albums.items[artistsAtuais[1]].data.name}</h1>
                    <div className={styles.contentText}>
                        {data.albums.items[artistsAtuais[1]].data.artists.items.map((itemArtist) => (
                            <p>{itemArtist.profile.name}</p>
                        ))}
                    </div>
                    <p>{data.albums.items[artistsAtuais[1]].data.date.year}</p>                      
                </div>
                <div className={artistsAtuais[1] == 9 ? styles.arrowRightDesableAlbum : styles.arrowRightAlbum} onClick={nextArtists}>
                    <span class="material-symbols-outlined">arrow_forward_ios</span>
                </div>
            </div>
        </div>
    )
}