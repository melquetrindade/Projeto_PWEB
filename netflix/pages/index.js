import React from 'react'
import styles from '../styles/login.module.css'

//onChange={func}
//onKeyPress={func01}

export default function Login(){

    return(
        <main className={styles.body}>
            <div className={styles.main}>
                <h1>Bem-Vindo</h1>
                <div className={styles.username}>
                    <div class='form-floating'>
                        <input 
                            type="text" 
                            id="username" 
                            class="form-control shadow-none" 
                            required
                            placeholder="fulado123@gmail.com" 
                            minlength="1" 
                            maxlength="50"
                        >
                        </input>
                        <label for="username">Usuário</label>
                    </div>
                </div>
                <div className={styles.password}>
                    <div class='form-floating'>
                        <input 
                            type="text" 
                            id="password" 
                            class="form-control shadow-none" 
                            required
                            placeholder="********" 
                            minlength="1" 
                            maxlength="8"
                        >
                        </input>
                        <label for="password">Senha</label>
                    </div>
                </div>

                <div className={styles.buttonCheck}>
                    <span class="material-symbols-outlined">done</span>
                    Login
                </div>

                <div className={styles.toggleButton}>
                    Ainda não tem Conta? Cadastre-se agora
                </div>
            </div>
            <div className={styles.acessoVisitante}>
                Navegue como Visitante
            </div>
        </main>
    )
}