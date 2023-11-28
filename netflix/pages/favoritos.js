import React from "react";
import styles from '../styles/favoritos.module.css';
import { useRouter } from "next/router";

export default function Favoritos(){

    const router = useRouter()

    const navArtsFav = () => {
        router.push({
            pathname: './artsFav',
        })
    }

    const navAlbmFav = () => {
        router.push({
            pathname: './albmFav',
        })
    }

    return(
        <div className={styles.body}>
            <div className={styles.main}>
                <div className={styles.containerArts} onClick={navArtsFav}>
                    <div className={styles.poster}><img src="/capa_arts.jpg"></img></div>
                    <h1>Artistas</h1>
                </div>
                <div className={styles.containerAlbm} onClick={navAlbmFav}>
                    <div className={styles.poster}><img src="/capa_album.jpg"></img></div>
                    <h1>Álbuns</h1>
                </div>
            </div>
        </div>
    )
}