import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import React,{useState} from 'react';

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



export default function Home() {

  const [Comunidades,setComunidades] = useState([])

  const githubUser = "kametobu"
  const pessoasFavoritas = ['juunegreiros',
  'omariosouto',
  'peas',
  'rafaballerini',
  'marcobrunodev',
  'felipefialho']

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
                  
                  setComunidades([...Comunidades,{nome: dadosForm.get('title'), imagem: dadosForm.get('image')}])
                  
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
        
        <ul>
          {Comunidades.map((itemAtual)=>{
            
            return(
              <li key={itemAtual.nome}>
                <a  >
                  {/*http://placehold.it/300x300*/}
                  <img src={`${itemAtual.imagem}`} />
                  <span>{itemAtual.nome}</span>
                </a>
              </li>
            )
          })}
        </ul>

        </ProfileRelationsBoxWrapper>
      </div>
        
    </MainGrid>
    </>
    )
}
