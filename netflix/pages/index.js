import styles from '../styles/page.module.css'
import React, {useState} from 'react';
import albumData from '../repository/home.json'

export default function Home() {

      //https://spotify23.p.rapidapi.com/search/?q=marilia%20mendonca&type=artists&offset=0&limit=10&numberOfTopResults=5
      /*
      const url = "https://spotify23.p.rapidapi.com/search/?q=marilia%20mendonca&type=artists&offset=0&limit=10&numberOfTopResults=5";
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'dc8f4e0d13msh0a30c408daca17dp1ec9d2jsn147d94a16c74',
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
      };

      const carregaArtista = async () => {
      
        const res = await fetch(url, options)
        const resJson  = await res.json()
        console.log(resJson)
      }*/

      const carregaAlbum = () => {
        console.log(albumData)
      }

      return (
        <main className={styles.body}>
          <div>
            <h1 className={styles.title}>Página Inicial</h1>
            <button onClick={carregaAlbum}>Carregar</button>
          </div>
        </main>
      )
}

/*
  const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=artist:'alok'";
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'c94858764dmshc1ff10de77281dap1fa1d3jsnd03d84e68211',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  };

  const carregaArtista = async () => {
  
    const res = await fetch(url, options)
    const resJson  = await res.json()
    console.log(resJson.data[0].artist.name)
  }*/

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