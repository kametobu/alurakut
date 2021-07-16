import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import React,{useState,useEffect} from 'react';
import nookies from 'nookies';
import jwt  from 'jsonwebtoken';

function ProfileSiderbar(props){
  return(
      <Box as="aside">
        <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: "8px" }}/>
        <hr/>
        <p>
          <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
            @{props.githubUser}
          </a>
        </p>
        <hr/>

        <AlurakutProfileSidebarMenuDefault/>

      </Box>
  )
  }

  

  function ProfileRelations(props){



    return (
      <ProfileRelationsBoxWrapper >
      <h2 className="smallTitle"> Seguidores ({props.items.length})</h2>
     
        <ul style={{ overflow: 'auto' }}>
          {props.items.map((itemAtual)=>{
            
            return(
              <li key={itemAtual.id}>
                <a  >
                  {/*http://placehold.it/300x300*/}
                  <img src={`${itemAtual.avatar_url}`} />
                  <span>{itemAtual.login}</span>
                </a>
              </li>
            )
          })}
        </ul>

     </ProfileRelationsBoxWrapper>
    )
  }





export default function Home(props) {
  const [seguidores,setSeguidores] = useState([]);
  
  const [Comunidades,setComunidades] = useState([])

  const githubUser = props.githubUser
  const pessoasFavoritas = ['juunegreiros',
  'omariosouto',
  'peas',
  'rafaballerini',
  'marcobrunodev',
  'felipefialho']




  useEffect(function(){
    fetch('https://api.github.com/users/peas/followers').then((res)=>{
      if(res.ok){
        return res.json()
      }
      throw new Error("ERRO falta um s")
      
    }).then((json)=>{
      setSeguidores(json)
    }).catch((erro)=>{
      console.log(erro)
    })
    const token = '81c9a00ffa48df539a7ec78801afd0'
    fetch('https://graphql.datocms.com/',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${token}`,
      },
      body: JSON.stringify({
        query: `query {
          allComunidades{
            title
            id
            imageUrl
            creatorSlug
          }
        }`
      }),
    }
  )
  .then((res)=>(res.json()))
  .then((res)=>{
    setComunidades(res.data.allComunidades)
    
  })

  }, [])

  return (
    <>
    <AlurakutMenu githubUser={githubUser}/>
    <MainGrid>
      

      <div className="profileArea" style={{ gridArea: 'profileArea'}}>
          <ProfileSiderbar githubUser={githubUser}/>
      </div>

      <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}> 
        <Box >
          <h1 className="title">
              Bem Vindo
          </h1>

          <OrkutNostalgicIconSet/>
            
          
        </Box>

        <Box>
            <h2 className="subTitle"> O que você dedeja fazer? </h2>
            <form onSubmit={function handdleCriarComunidade(event){
                  event.preventDefault()

                  const dadosForm = new FormData(event.target);
                  
                  

                  fetch('/api/comunidades',{
                    method: "POST",
                    headers:{
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                    },
                    body: JSON.stringify({title: dadosForm.get('title'),imageUrl: dadosForm.get('image'),creatorSlug: "kametobu"})
                    
                  }).then(async (res) =>{
                    const dados = await res.json()

                    setComunidades([...Comunidades,dados.registroCriado])
                    
                  })
                  
            }}>
              <div>
                <input 
                placeholder="Qual vai ser o nome da sua comunidade?" 
                name="title" 
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"/>
              </div>
              <div>
                <input 
                placeholder="Colocar uma URL para usar de capa" 
                name="image" 
                aria-label="Colocar uma URL para usar de capa"/>
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
      </div>

      <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
      <ProfileRelationsBoxWrapper >
         <h2 className="smallTitle"> Pessosas da Comunidade ({pessoasFavoritas.length})</h2>
        
        <ul>
          {pessoasFavoritas.map((itemAtual)=>{
            return(
              <li>
                <a href={`/users/${itemAtual}`} key={itemAtual}>
                  <img src={`https://github.com/${itemAtual}.png`} />
                  <span>{itemAtual}</span>
                </a>
              </li>
            )
          })}
        </ul>

        </ProfileRelationsBoxWrapper>
        


        <ProfileRelationsBoxWrapper >
         <h2 className="smallTitle"> Comunidades ({Comunidades.length})</h2>
        
        <ul style={{ overflow: 'auto' }}>
          {Comunidades.map((itemAtual)=>{
            
            return(
              <li key={itemAtual.id}>
                <a  >
                  {/*http://placehold.it/300x300*/}
                  <img src={`${itemAtual.imageUrl}`} />
                  <span>{itemAtual.title}</span>
                </a>
              </li>
            )
          })}
        </ul>

        </ProfileRelationsBoxWrapper>


          <ProfileRelations items={seguidores}/>
      


      </div>
        
    </MainGrid>
    </>
    )
}



export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const {user} = jwt.decode(token);
  console.log(jwt.decode(token))
  const autenticado = true
  if(!autenticado){
    return{
      redirect:{
        destination: "/login",
        permanent: false,
      }
    }

  }
  return {
    props: {
      githubUser: "peas"
    }, // will be passed to the page component as props
  }
}
