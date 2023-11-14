import React, {useState} from "react";
import styles from '../styles/multiSearch.module.css'
import { useRouter } from "next/router";

export default function MultiSearch(){

    const router = useRouter()
    const {pesquisa} = router.query
    console.log(pesquisa)

    return(
        <div>
            página multi
        </div>
    )
}