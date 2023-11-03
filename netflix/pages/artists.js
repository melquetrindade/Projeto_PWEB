import React, {useState} from 'react'
import styles from '../styles/artists.module.css'
import artistsData01 from '../repository/searchArtists01.json'
import artistsData02 from '../repository/searchArtists02.json'
import artistsData03 from '../repository/searchArtists03.json'

export default function Artists(){

    const artistsTotal = artistsData01.artists.items.length
    const [artistsAtuais, setArtists] = useState([0,1])
    
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
                <h1 className={styles.title}>Artistas</h1>
                <div className={styles.containerArtists}>
                    <div className={artistsAtuais[0] == 0 ? styles.arrowLeftDesable : styles.arrowLeft} onClick={previArtists}>
                        <span class="material-symbols-outlined">arrow_back_ios</span>
                    </div>
                    <div className={styles.itemArtists}>
                        <img src={artistsData01.artists.items[artistsAtuais[0]].data.visuals.avatarImage == null ? '/artistsNull.png' : artistsData01.artists.items[artistsAtuais[0]].data.visuals.avatarImage.sources[0].url}></img>
                        <h1 className={styles.nameArtists}>{artistsData01.artists.items[artistsAtuais[0]].data.profile.name}</h1>                        
                    </div>

                    <div className={styles.itemArtists}>
                        <img src={artistsData01.artists.items[artistsAtuais[1]].data.visuals.avatarImage == null ? '/artistsNull.png' : artistsData01.artists.items[artistsAtuais[1]].data.visuals.avatarImage.sources[0].url}></img>
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