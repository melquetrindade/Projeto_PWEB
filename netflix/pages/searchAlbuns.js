import React, {useState} from "react";
import styles from '../styles/searchAlbuns.module.css'
import { useRouter } from "next/router";

export default function SearchArtists(){

    const [valueInput, setInput] = useState('')

    const router = useRouter()
    const navAlbuns = () => {
        router.push({
            pathname: './album',
            query: {album: document.getElementById('searchAlbuns').value}
        })
    }

    const handleChangeSearch = (e) => {
        const inputText = e.target.value

        if (/^[a-zA-Z 0-9 ']+$/.test(inputText) || inputText === '') {
            setInput(inputText)
        }
        document.getElementById('searchAlbuns').addEventListener('keydown', (e) => {
            if(e.keyCode === 13){
                e.preventDefault
                if(document.getElementById('searchAlbuns').value){
                    navAlbuns()
                }
                else{
                    console.log('não tem valores')
                }
            }
        })
    }

    return(
        <main className={styles.body}>
            <div className={styles.content}>
                <h1 className="text-center py-10">Pesquise por Álbuns</h1>
                <div class='form-floating'>
                    <input 
                        type="text" 
                        id="searchAlbuns" 
                        class="form-control shadow-none" 
                        required
                        value={valueInput}
                        placeholder="TBT WS" 
                        minlength="1" 
                        maxlength="26"
                        onChange={handleChangeSearch}
                    >
                    </input>
                    <label for="searchArtists">Digite o Nome do Álbum</label>
                </div>
            </div>
        </main>
    )
}