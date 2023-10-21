import Link from "next/link";
import React from "react";
import styles from "../styles/navBar.module.css"

export default function NavBar(){
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
        </ul>
    )
}