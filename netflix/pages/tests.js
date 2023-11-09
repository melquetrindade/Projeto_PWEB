import React, {useState} from "react";
import styles from '../styles/searchArtists.module.css'
import { useRouter } from "next/router";
import {notification} from 'antd'

export default function SearchArtists(){

    const [valueInput, setInput] = useState('')
    const [status, setStatus] = useState('form')
    const [dataArtists, setArtists] = useState(undefined)

    const [api, contextHolder] = notification.useNotification();
    const openNotification = ({placement, title}) => {
        api.info({
            message: `${title}`,
            description:
                'Este é um campo obrigatório. Informe algum Artista!',
            placement,
        });
    }

    const carregaDados = async () => {
        console.log('entrou no carrega')
        setStatus('load')
        const url = `https://spotify23.p.rapidapi.com/search/?q=${document.getElementById('searchAlbuns').value}&type=artists&offset=0&limit=10&numberOfTopResults=5`;

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
            setArtists(resJson)
        }  
    }

    const router = useRouter()
    const navAlbuns = () => {
        if(document.getElementById('searchAlbuns').value){
            router.push({
                pathname: './artists',
                query: {artista: document.getElementById('searchAlbuns').value}
            })
        }
        else{
            openNotification({placement: 'topRight', title: 'CAMPO EM BRANCO!'})
        }
    }

    const handleChangeSearch = (e) => {
        const inputText = e.target.value

        if (/^[a-zA-Z 0-9 ']+$/.test(inputText) || inputText === '') {
            setInput(inputText)
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            carregaDados()
        }
    };

    return(
        <main className={styles.body}>
            {
                status == 'form'
                ?
                    <Formulario arg={contextHolder} func={handleChangeSearch} func01={handleKeyPress} func02={carregaDados} teste={valueInput}/>
                :
                status == 'load'
                ?
                    <Load/>
                :
                status == 'erro'
                ?
                    <h1 className="text-center py-2">Deu Pau</h1>
                :
                    <h1 className="text-center py-2">Ainda vou fazer</h1>
            }
            
        </main>
    )
}

function Formulario({arg, func, func01, func02, teste}){

    return(
        <div>
            {arg}
            <div className={styles.content}>
                <h1 className="text-center py-10">Pesquise por Álbuns</h1>
                <div class='form-floating'>
                    <input 
                        type="text" 
                        id="searchAlbuns" 
                        class="form-control shadow-none" 
                        required
                        value={teste}
                        placeholder="TBT WS" 
                        minlength="1" 
                        maxlength="26"
                        onChange={func}
                        onKeyPress={func01}
                    >
                    </input>
                    <label for="searchArtists">Digite o Nome do Álbum</label>
                </div>
                <div className={styles.instrucoes}>
                    <p>Atenção: As pesquisas devem ser feitas sem o uso de acentos ou caracteres especiais!</p>
                </div>
            </div>
            <button className={styles.buttonSearch} onClick={func02}>
                <span class="material-symbols-outlined">search</span>
            </button>
        </div>
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

/* 
const router = useRouter()
    const navAlbuns = () => {
        if(document.getElementById('searchAlbuns').value){
            router.push({
                pathname: './artists',
                query: {artista: document.getElementById('searchAlbuns').value}
            })
        }
        else{
            openNotification({placement: 'topRight', title: 'CAMPO EM BRANCO!'})
        }
    }
*/

/*
<div>
    {contextHolder}
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
                onKeyPress={handleKeyPress}
            >
            </input>
            <label for="searchArtists">Digite o Nome do Álbum</label>
        </div>
        <div className={styles.instrucoes}>
            <p>Atenção: As pesquisas devem ser feitas sem o uso de acentos ou caracteres especiais!</p>
        </div>
    </div>
    <button className={styles.buttonSearch} onClick={navAlbuns}>
        <span class="material-symbols-outlined">search</span>
    </button>
</div>*/