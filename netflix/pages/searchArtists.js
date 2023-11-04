import React, {useState} from "react";
import styles from '../styles/searchArtists.module.css'
import { useRouter } from "next/router";
import {notification} from 'antd'

export default function SearchArtists(){

    const [valueInput, setInput] = useState('')

    const [api, contextHolder] = notification.useNotification();
    const openNotification = ({placement, title}) => {
        api.info({
            message: `${title}`,
            description:
                'Este é um campo obrigatório. Informe algum Artista!',
            placement,
        });
    }

    const router = useRouter()
    const navArtists = () => {
        router.push({
            pathname: './artists',
            query: {artista: document.getElementById('searchArtists').value}
        })
    }

    const handleChangeSearch = (e) => {
        //e.preventDefault()
        const inputText = e.target.value

        if (!(/^[a-zA-Z 0-9 ']+$/.test(inputText)) || !(inputText === '')) {
            //console.log('entrou 01')
            setInput(inputText)
        }
        
        
    }

    const handleInput = (e) => {
        
        document.getElementById('searchArtists').addEventListener('keydown', (e) => {
            if(e.keyCode === 13){
                e.preventDefault()
                if(document.getElementById('searchArtists').value){
                    navArtists()
                }
                else{
                    openNotification({placement: 'topRight', title: 'CAMPO EM BRANCO!'})
                }
            }
        })
    }

    return(
        <main className={styles.body}>
            {contextHolder}
            <div className={styles.content}>
                <h1 className="text-center py-10">Pesquise por Artistas</h1>
                <div class='form-floating'>
                    <input 
                        type="text" 
                        id="searchArtists" 
                        class="form-control shadow-none" 
                        required
                        value={valueInput}
                        placeholder="Marília Mendonça" 
                        minlength="1" 
                        maxlength="26"
                        onChange={handleChangeSearch}
                    >
                    </input>
                    <label for="searchArtists">Digite o Nome do Artista</label>
                </div>
            </div>
        </main>
    )
}