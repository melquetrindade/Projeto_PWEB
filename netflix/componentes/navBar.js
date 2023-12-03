import Link from "next/link";
import React, {useState} from "react";
import styles from "../styles/navBar.module.css"
import { useRouter } from "next/router";
import {notification} from 'antd'
import {logOut} from '../utils/firebase/authService'

export default function NavBar(){

    const [api, contextHolder] = notification.useNotification();
    const openNotification = ({placement, title}) => {
        api.info({
            message: `${title}`,
            description:
                'Este é um campo obrigatório. Digite sua Pesquisa',
            placement,
        });
    }

    const [inputShow, setInput] = useState('close')
    const searchToggle = () => {
        inputShow == 'open' ? setInput('close') : setInput('open')
    }

    const [sideBar, setSideBar] = useState('close')
    const sideBarToggle = () => {
        sideBar == 'open' ? setSideBar('close') : setSideBar('open')
    }

    const [valueInput, setInput2] = useState('')
    const [valueInput2, setInput3] = useState('')
    
    const handleChangeSearch = (e) => {
        const inputText = e.target.value

        if (/^[a-zA-Z 0-9 ']+$/.test(inputText) || inputText === '') {
            setInput2(inputText)
        }
    }

    const handleChangeSearch2 = (e) => {
        const inputText = e.target.value

        if (/^[a-zA-Z 0-9 ']+$/.test(inputText) || inputText === '') {
            setInput3(inputText)
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            navSearch()
        }
    };

    const handleKeyPress2 = (event) => {
        if (event.key === 'Enter') {
            navSearch2()
        }
    };

    const router = useRouter()
    const navSearch = () => {

        if(document.getElementById('inputSearch').value){
            router.push({
                pathname: './multiSearch',
                query: {pesquisa: document.getElementById('inputSearch').value}
            })
        }
        else{
            openNotification({placement: 'topRight', title: 'CAMPO EM BRANCO!'})
        }
    }

    const navSearch2 = () => {
        if(document.getElementById('inputSearch2').value){
            router.push({
                pathname: './multiSearch',
                query: {pesquisa: document.getElementById('inputSearch2').value}
            })
        }
        else{
            openNotification({placement: 'topRight', title: 'CAMPO EM BRANCO!'})
        }
    }

    const prossLogout = () => {
        logOut()
        router.push({
            pathname: './',
            query: {pesquisa: document.getElementById('inputSearch2').value}
        })
    }

    return(
        <div className={styles.navBar}>

            {contextHolder}
            <div>
                <div className={styles.itemMenu}>
                    <span class="material-symbols-outlined" onClick={sideBarToggle}>menu</span>
                    <ul className={sideBar == 'close' ? styles.ul : styles.navBarNone}>
                        <li>
                            <Link href='/'>Home</Link>
                        </li>
                        <li>
                            <Link href='/searchArtists'>Artistas</Link>
                        </li>
                        <li>
                            <Link href='/searchAlbum'>Álbuns</Link>
                        </li>
                    </ul>
                </div>
                <div className={sideBar == 'open' ? styles.navBarNone : inputShow == 'close' ? styles.searchClose : styles.searchOpen}>
                    <span class="material-symbols-outlined" onClick={searchToggle}>search</span>
                    <input
                        id="inputSearch2"
                        type="text"
                        value={valueInput2}
                        placeholder="Alok" 
                        className={inputShow == 'open' ? styles.open : styles.close}
                        onChange={handleChangeSearch2}
                        onKeyPress={handleKeyPress2}
                    ></input>
                </div>
            </div>
            <div>
                <div className={styles.logo}>
                    <img src="/logo_music02.jpg"/>
                </div>
            </div>
            <div>
                <div className={sideBar == 'open' ? styles.sideBar : styles.navBarNone}>
                    <div>
                        <span class="material-symbols-outlined" onClick={sideBarToggle}>menu</span>
                        <div className={styles.menuOpcoes}>
                            <div className={styles.contSearch}>
                                <span class="material-symbols-outlined">search</span>
                                <div className={styles.contText}>
                                    <input 
                                        id="inputSearch" 
                                        type="text" 
                                        value={valueInput}
                                        placeholder="Search..."
                                        onChange={handleChangeSearch}
                                        onKeyPress={handleKeyPress}
                                    >
                                    </input>
                                </div>
                            </div>
                            <Link href='/'>
                                <div className={styles.contOpMenu}>
                                    <span class="material-symbols-outlined">home</span>
                                    <div className={styles.contText}>
                                        <h3>Home</h3>
                                    </div>
                                </div>
                            </Link>
                            <Link href='/searchArtists'>
                                <div className={styles.contOpMenu}>
                                    <span class="material-symbols-outlined">person</span>
                                    <div className={styles.contText}>
                                        <h3>Artistas</h3>
                                    </div>
                                </div>
                            </Link>
                            <Link href='/searchAlbum'>
                                <div className={styles.contOpMenu}>
                                    <span class="material-symbols-outlined">library_music</span>
                                    <div className={styles.contText}>
                                        <h3>Álbuns</h3>
                                    </div>
                                </div>
                            </Link>
                            
                            <Link href='/favoritos'>
                                <div className={styles.contOpMenu}>
                                    <span class="material-symbols-outlined">favorite</span>
                                    <div className={styles.contText}>
                                        <h3>Favoritos</h3>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div onClick={() => prossLogout()} className={styles.logout}>
                            <div className={styles.contLogout}>
                                <span class="material-symbols-outlined">logout</span>
                                <div className={styles.contOplogout}>
                                    <h3>Sair</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
