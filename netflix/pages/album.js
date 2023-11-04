import React from "react"
import styles from '../styles/album.module.css'
import { useRouter } from 'next/router';

export default function Album(){

    const router = useRouter()
    const { album } = router.query
    console.log(`no album: ${router.query.album}`)

    return(
        <main className={styles.body}>
            <div>
                <h1>Página de Ábuns</h1>
            </div>
        </main>
    )
}