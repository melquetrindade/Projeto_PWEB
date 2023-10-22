import Link from "next/link";
import React, {useState} from "react";
import styles from "../styles/navBar.module.css"

export default function NavBar(){

    const [inputShow, setInput] = useState('close')
    const searchToggle = () => {
        inputShow == 'open' ? setInput('close') : setInput('open')
    }

    return(
        <ul className={styles.ul}>
            <li>
                <span class="material-symbols-outlined">menu</span>
            </li>
            <li>
                <Link href='/'>HOME</Link>
            </li>
            <li>
                <Link href='/filmes'>FILMES</Link>
            </li>
            <li>
                <Link href='/series'>SÉRIES</Link>
            </li>
            <li>
                <div className={inputShow == 'close' ? styles.searchClose : styles.searchOpen}>
                    <span class="material-symbols-outlined" onClick={searchToggle}>search</span>
                    <input type="text" placeholder="Spider-Man" className={inputShow == 'open' ? styles.open : styles.close}></input>
                </div>
            </li>
        </ul>
    )
}
