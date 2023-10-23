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
                            <Link href='/'>HOME</Link>
                        </li>
                        <li>
                            <Link href='/filmes'>FILMES</Link>
                        </li>
                        <li>
                            <Link href='/series'>SÉRIES</Link>
                        </li>
                    </ul>
                </div>
                <div className={sideBar == 'open' ? styles.navBarNone : inputShow == 'close' ? styles.searchClose : styles.searchOpen}>
                    <span class="material-symbols-outlined" onClick={searchToggle}>search</span>
                    <input type="text" placeholder="Spider-Man" className={inputShow == 'open' ? styles.open : styles.close}></input>
                </div>
            </div>
            <div>
                <div className={styles.logo}>
                    <img src="/logo_filme3.png"/>
                </div>
            </div>
        </div>
    )
}
