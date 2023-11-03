import React from "react";
import styles from '../styles/searchArtists.module.css'

export default function SearchArtists(){

    return(
        <main className={styles.body}>
            <div className={styles.content}>
                <h1 className="text-center py-10">Pesquise por Artistas</h1>
                <div class='form-floating'>
                    <input 
                        type="text" 
                        id="searchArtists" 
                        class="form-control shadow-none" 
                        required 
                        placeholder="Marília Mendonça" 
                        minlength="1" 
                        maxlength="26"
                    >
                    </input>
                    <label for="searchArtists">Digite o Nome do Artista</label>
                </div>
            </div>
        </main>
    )
}