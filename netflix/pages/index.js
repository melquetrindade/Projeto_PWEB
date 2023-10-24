import styles from '../styles/page.module.css'
import React, {useState} from 'react';

export default function Home() {

      const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=artist:'alok'";
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'c94858764dmshc1ff10de77281dap1fa1d3jsnd03d84e68211',
          'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
      };

      const carregaArtista = async () => {
        /*
        const dados = fetch(url, options).then(response => {
          if (!response.ok) {
            throw new Error('Erro na requisição à API');
          }
          return response.json();
        }).then(data => {
          // Manipule os dados da API aqui
          //console.log(data);
        }).catch(error => {
          console.error('Ocorreu um erro:', error);
        });
        console.log(dados)*/

        const res = await fetch(url, options)
        const resJson  = await res.json()
        console.log(resJson.data[0].artist.name)
      }

      return (
        <main className={styles.body}>
          <h1 className={styles.title}>Página Inicial</h1>
          <button onClick={carregaArtista}>Carregar</button>
        </main>
      )
}





/*
  const headers = {
    'Authorization': 'Bearer live_13f6d8aedb6f165f04b113e93e599c'
  };

  fetch("https://api.api-futebol.com.br/v1/times/18", {
    method: 'GET',
    headers: headers
  }).then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição à API');
      }
      return response.json();
    }).then(data => {
      // Manipule os dados da API aqui
      console.log(data);
    }).catch(error => {
      console.error('Ocorreu um erro:', error);
    });*/

    /*
    const myHeaders = new Headers();
    myHeaders.append("x-rapidapi-key", "508e3cdc74158ae97f50d2a20a9aa9c9");
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
  
    fetch("https://v3.football.api-sports.io/leagues", requestOptions).then(response => {
        if (!response.ok) {
          throw new Error('Erro na requisição à API');
        }
        return response.json();
      }).then(data => {
        // Manipule os dados da API aqui
        console.log(data);
      }).catch(error => {
        console.error('Ocorreu um erro:', error);
      });*/