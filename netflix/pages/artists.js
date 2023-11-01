import React from 'react'
import styles from '../styles/artists.module.css'

export default function Artists(){
    return(
        <main className={styles.body}> 
            <div className={styles.main}>
                <h1 className={styles.title}>Artistas</h1>
                <div className={styles.containerArtists}>
                    <p>Conteúdo vem aqui</p>
                </div>
            </div>
        </main>
    )
}