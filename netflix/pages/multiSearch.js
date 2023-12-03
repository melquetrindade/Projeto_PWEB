import React, {useState} from "react";
import styles from '../styles/multiSearch.module.css'
import { useRouter } from "next/router";
//import dataMulti from '../repository/searchMulti01.json'
import { collection, addDoc, getDocs, doc, setDoc, getDoc, where, get, query } from 'firebase/firestore';
import { db, auth } from '../utils/firebase/firebaseService';
import { message } from 'antd';
import {notification} from 'antd'

export default function MultiSearch(){

    const router = useRouter()
    const {pesquisa} = router.query
    console.log(pesquisa)

    //const [hasDados, setDados] = useState(true) // -> usar esse para testes
    //const [status, setStatus] = useState('sucesso') // -> usar esse para testes

    const [hasDados, setDados] = useState(false) //-> usar esse quando for pegar da api
    const [dataAlbuns, setAlbuns] = useState(undefined) //-> usar esse quando for pegar da api
    const [status, setStatus] = useState('load') //-> usar esse quando for pegar da api

    const carregaDados = async () => {

        const url = `https://spotify23.p.rapidapi.com/search/?q=${router.query.pesquisa}&type=multi&offset=0&limit=10&numberOfTopResults=5`;

        //https://spotify23.p.rapidapi.com/search/?q=${router.query.pesquisa}&type=multi&offset=0&limit=10&numberOfTopResults=5

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
            setStatus('sucesso')
            setAlbuns(resJson)
            setDados(true)
        }  
    }

    if (hasDados == false){
        carregaDados()
    }

    return(
        <main className={styles.body}>
            {
                status == 'load'
                ?
                    <Load/>
                :
                status == 'erro'
                ?
                    <h1 className='text-center py-2'>Erro ao Buscar os Dados</h1>
                :
                <div className={styles.body2}>
                    <ShowArtists data={dataAlbuns}/>
                    <ShowAlbuns data={dataAlbuns} router={router}/>
                    <ShowPodcast data={dataAlbuns}/>
                </div>
            }
        </main>
    )
}

function ShowPodcast({data}){

    const podcastTotal = data.episodes.items.length
    const [podcastAtual, setPodcast] = useState(0)

    const nextPodcast = () => {
        if(podcastAtual < (podcastTotal - 1)){
          setPodcast(podcastAtual + 1)
        }
    }

    const previPodcast = () => {
        if(podcastAtual > 0){
          setPodcast(podcastAtual - 1)
        }
    }

    return(
        <div className={styles.mainPodcast}>
            <h1 className={styles.titlePodcast}>Podcast Relacionados a sua Pesquisa</h1>
            <div className={styles.containerPodcast}>
                <div className={podcastAtual == 0 ? styles.arrowLeftDesablePodcast : styles.arrowLeftPodcast} onClick={previPodcast}>
                    <span class="material-symbols-outlined">arrow_back_ios</span>
                </div>

                <div className={styles.itemPodcast}>
                    <div className={styles.containerImgPodcast}><img src={data.episodes.items[podcastAtual].data.coverArt.sources[2] == null ? '/artistsNull.png' : data.episodes.items[podcastAtual].data.coverArt.sources[2].url}></img></div>
                    <h1 className={styles.nameArtists}>{data.episodes.items[podcastAtual].data.name}</h1>
                    <FormataDados tempo={data.episodes.items[podcastAtual].data.duration.totalMilliseconds} data={data.episodes.items[podcastAtual].data.releaseDate.isoString}/>
                    <div className={styles.contDescricao}>
                        <p>{data.episodes.items[podcastAtual].data.description}</p>
                    </div>                      
                </div>

                <div className={podcastAtual == 9 ? styles.arrowRightDesablePodcast : styles.arrowRightPodcast} onClick={nextPodcast}>
                    <span class="material-symbols-outlined">arrow_forward_ios</span>
                </div>
            </div>
        </div>
    )
}

function FormataDados({tempo, data}){

    // Convertendo milissegundos para segundos
    var segundos = Math.floor(tempo / 1000);

    // Calculando os minutos e segundos
    var minutos = Math.floor(segundos / 60);
    var segundosRestantes = segundos % 60;

    var dataFormat = data.split('T');

    return(
        <div className={styles.contDetails}>
            <p>Duração: {minutos} min e {segundosRestantes} s</p>
            <p className={styles.data}>Lançamento: {dataFormat[0]}</p>
        </div>
    )
}

function ShowArtists({data}){

    const [artistsAtuais, setArtists] = useState([0,1])
    const artistsTotal = data.artists.items.length
    
    const nextArtists = () => {
        if(((artistsAtuais[0]+2) < artistsTotal) && ((artistsAtuais[1]+2) < artistsTotal)){
            setArtists([(artistsAtuais[0] + 2), (artistsAtuais[1] + 2)])
        }
    }

    const previArtists = () => {
        if(((artistsAtuais[0]-2) >= 0) && ((artistsAtuais[1]-2) >= 0)){
            setArtists([(artistsAtuais[0] - 2), (artistsAtuais[1] - 2)])
        }
    }

    const [messageApi, contextHolder] = message.useMessage();
    const key = 'updatable';

    const openMessage = () => {
        messageApi.open({
        key,
        type: 'loading',
        content: 'Loading...',
        });
        setTimeout(() => {
            messageApi.open({
                key,
                type: 'success',
                content: 'Loaded!',
                duration: 2,
            });
        }, 1000);
    };

    const [api, contextHolder2] = notification.useNotification();
    const openNotification = ({placement, title, descricao}) => {
        api.info({
            message: `${title}`,
            description: `${descricao}`,
            placement,
        });
    }

    const recuperaID = async (props) => {
        const {id, img, nome} = props

        try{
            if(auth.currentUser){
                var idRecuperado = id.split(':artist:')
                var existsId = false

                const querySnapshot = await getDocs(collection(db, `usuarios/${auth.currentUser.uid}/artistas`));

                try{
                    querySnapshot.forEach((doc) => {
                        if(doc.data().id == idRecuperado[1]){
                            existsId = true
                            throw new Error('StopIteration');
                        }
                    })
                } catch (e){
                    if (e.message !== 'StopIteration') {
                        throw e;
                    }
                }

                if(existsId == false){
                    openMessage()

                    await addDoc(collection(db, `usuarios/${auth.currentUser.uid}/artistas`), {
                        id: idRecuperado[1],
                        name: nome,
                        image: img 
                    })
 
                    //querySnapshot.forEach((doc) => {
                        /*
                        código para saber o número de propriedades de um doc

                        const dadosDocumento = doc.data();
                        const qtd = Object.keys(dadosDocumento).length;
                        console.log(qtd)
                         
                        código para saber o número de doc's dentro de uma coleção

                        console.log(querySnapshot.size)
                        */
                    //})
                
                }
                else{
                    openNotification({placement: 'topRight', title: 'ERRO', descricao: 'ESTE ARTISTA JÁ FOI FAVORITADO!'})
                }
                
                /*
                await addDoc(collection(db, `usuarios/${auth.currentUser.uid}/testes`)).doc('language').setDoc({
                    local: 'pt_BR',
                })*/
                
            }
            else{
                openNotification({placement: 'topRight', title: 'ERRO', descricao: 'USUÁRIO NÃO CADASTRADO NO SISTEMA!'})
            }
        }catch (error){
            //console.error('Erro ao adicionar dado:', error);
            openNotification({placement: 'topRight', title: 'ERRO', descricao: 'NÃO FOI POSSÍVEL CONTINUAR, TENTE NOVAMENTE!'})
        }
    }

    return(
        <div className={styles.mainArtista}>
            {contextHolder}
            {contextHolder2}
            <h1 className={styles.titleArtista}>Artistas Relacionados a sua Pesquisa</h1>
            <div className={styles.containerArtists}>
                <div className={artistsAtuais[0] == 0 ? styles.arrowLeftDesableArtista : styles.arrowLeftArtista} onClick={previArtists}>
                    <span class="material-symbols-outlined">arrow_back_ios</span>
                </div>
                <div className={styles.itemArtists}>
                    <div className={styles.iconFavArt} onClick={() => recuperaID({id: data.artists.items[artistsAtuais[0]].data.uri, img: data.artists.items[artistsAtuais[0]].data.visuals.avatarImage == null ? null : data.artists.items[artistsAtuais[0]].data.visuals.avatarImage.sources[0].url, nome: data.artists.items[artistsAtuais[0]].data.profile.name})}><span class="material-symbols-outlined">favorite</span></div>
                    <div className={styles.containerImgArtista}><img src={data.artists.items[artistsAtuais[0]].data.visuals.avatarImage == null ? '/artistsNull.png' : data.artists.items[artistsAtuais[0]].data.visuals.avatarImage.sources[0].url}></img></div>
                    <h1 className={styles.nameArtists}>{data.artists.items[artistsAtuais[0]].data.profile.name}</h1>                        
                </div>

                <div className={styles.itemArtists}>
                    <div className={styles.iconFavArt} onClick={() => recuperaID({id: data.artists.items[artistsAtuais[1]].data.uri, img: data.artists.items[artistsAtuais[1]].data.visuals.avatarImage == null ? null : data.artists.items[artistsAtuais[1]].data.visuals.avatarImage.sources[0].url, nome: data.artists.items[artistsAtuais[1]].data.profile.name})}><span class="material-symbols-outlined">favorite</span></div>
                    <div className={styles.containerImgArtista}><img src={data.artists.items[artistsAtuais[1]].data.visuals.avatarImage == null ? '/artistsNull.png' : data.artists.items[artistsAtuais[1]].data.visuals.avatarImage.sources[0].url}></img></div>
                    <h1 className={styles.nameArtists}>{data.artists.items[artistsAtuais[1]].data.profile.name}</h1>                        
                </div>
                <div className={artistsAtuais[1] == 9 ? styles.arrowRightDesableArtista : styles.arrowRightArtista} onClick={nextArtists}>
                    <span class="material-symbols-outlined">arrow_forward_ios</span>
                </div>
            </div>
        </div>
    )
}

function ShowAlbuns({data, router}){

    const [artistsAtuais, setArtists] = useState([0,1])
    const artistsTotal = data.albums.items.length
    
    const nextArtists = () => {
        if(((artistsAtuais[0]+2) < artistsTotal) && ((artistsAtuais[1]+2) < artistsTotal)){
            setArtists([(artistsAtuais[0] + 2), (artistsAtuais[1] + 2)])
        }
    }

    const previArtists = () => {
        if(((artistsAtuais[0]-2) >= 0) && ((artistsAtuais[1]-2) >= 0)){
            setArtists([(artistsAtuais[0] - 2), (artistsAtuais[1] - 2)])
        }
    }

    const navDetailsAlbuns = (props) => {
        const {id} = props
        var idRecuperado = id.split(':album:')
        //console.log(`id: ${idRecuperado[1]}`)

        router.push({
            pathname: './[id]',
            query: {id: idRecuperado[1]}
        })
    }

    return(
        <div className={styles.mainAlbum}>
            <h1 className={styles.titleAlbum}>Álbuns Relacionados a sua Pesquisa</h1>
            <div className={styles.containerAlbum}>
                <div className={artistsAtuais[0] == 0 ? styles.arrowLeftDesableAlbum : styles.arrowLeftAlbum} onClick={previArtists}>
                    <span class="material-symbols-outlined">arrow_back_ios</span>
                </div>
                <div className={styles.itemAlbum} onClick={()=>navDetailsAlbuns({id: data.albums.items[artistsAtuais[0]].data.uri})}>
                    <div className={styles.containerImgAlbum}><img src={data.albums.items[artistsAtuais[0]].data.coverArt.sources == null ? '/artistsNull.png' : data.albums.items[artistsAtuais[0]].data.coverArt.sources[2].url}></img></div>
                    <h1 className={styles.nameArtists}>{data.albums.items[artistsAtuais[0]].data.name}</h1>
                    <div className={styles.contentText}>
                        {data.albums.items[artistsAtuais[0]].data.artists.items.map((itemArtist) => (
                            <p>{itemArtist.profile.name}</p>
                        ))}
                    </div>
                    <p>{data.albums.items[artistsAtuais[1]].data.date.year}</p>                 
                </div>

                <div className={styles.itemAlbum} onClick={()=>navDetailsAlbuns({id: data.albums.items[artistsAtuais[1]].data.uri})}>
                    <div className={styles.containerImgAlbum}><img src={data.albums.items[artistsAtuais[1]].data.coverArt.sources == null ? '/artistsNull.png' : data.albums.items[artistsAtuais[1]].data.coverArt.sources[2].url}></img></div>
                    <h1 className={styles.nameArtists}>{data.albums.items[artistsAtuais[1]].data.name}</h1>
                    <div className={styles.contentText}>
                        {data.albums.items[artistsAtuais[1]].data.artists.items.map((itemArtist) => (
                            <p>{itemArtist.profile.name}</p>
                        ))}
                    </div>
                    <p>{data.albums.items[artistsAtuais[1]].data.date.year}</p>                      
                </div>
                <div className={artistsAtuais[1] == 9 ? styles.arrowRightDesableAlbum : styles.arrowRightAlbum} onClick={nextArtists}>
                    <span class="material-symbols-outlined">arrow_forward_ios</span>
                </div>
            </div>
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