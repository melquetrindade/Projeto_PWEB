import React from "react";
import styles from '../styles/favoritos.module.css'

export default function Favoritos(){

    return(
        <div className={styles.body}>
            <div className={styles.main}>
                <div className={styles.containerArts}>
                    <img src="/capa_arts.jpg"></img>
                </div>
                <div className={styles.containerAlbm}>
                    <img src="/capa_albm.jpg"></img>
                </div>
            </div>
        </div>
    )
}