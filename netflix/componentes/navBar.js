import Link from "next/link";
import React, {useState} from "react";
import styles from "../styles/navBar.module.css"

export default function NavBar(){

    const [inputShow, setInput] = useState('close')
    const searchToggle = () => {
        console.log('entrou')
        inputShow == 'open' ? setInput('close') : setInput('open')
    }

    const [sideBar, setSideBar] = useState('close')
    const sideBarToggle = () => {
        sideBar == 'open' ? setSideBar('close') : setSideBar('open')
    }

    return(
        <div className={styles.navBar}>
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
                            <Link href='/searchAlbuns'>Álbuns</Link>
                        </li>
                    </ul>
                </div>
                <div className={sideBar == 'open' ? styles.navBarNone : inputShow == 'close' ? styles.searchClose : styles.searchOpen}>
                    <span class="material-symbols-outlined" onClick={searchToggle}>search</span>
                    <input type="text" placeholder="Alok" className={inputShow == 'open' ? styles.open : styles.close}></input>
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
                                    <input type="text" placeholder="Search..."></input>
                                </div>
                            </div>
                            <div className={styles.contOpMenu}>
                                <span class="material-symbols-outlined">home</span>
                                <div className={styles.contText}>
                                    <h3>Home</h3>
                                </div>
                            </div>
                            <div className={styles.contOpMenu}>
                                <span class="material-symbols-outlined">person</span>
                                <div className={styles.contText}>
                                    <h3>Artistas</h3>
                                </div>
                            </div>
                            <div className={styles.contOpMenu}>
                                <span class="material-symbols-outlined">library_music</span>
                                <div className={styles.contText}>
                                    <h3>Álbuns</h3>
                                </div>
                            </div>
                            <div className={styles.contOpMenu}>
                                <span class="material-symbols-outlined">favorite</span>
                                <div className={styles.contText}>
                                    <h3>Favoritos</h3>
                                </div>
                            </div>
                        </div>
                        <div className={styles.logout}>
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
