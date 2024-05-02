import Styles from './Home.module.css'

import { NavLink, useNavigate } from "react-router-dom"
import { useState } from 'react'
import { useDocuments } from '../../hooks/useDocuments'
import PostDetail from '../../components/PostDetail'

const Home = () => {
  const [query, setQuery] = useState("")
  const { documents: posts, loading } = useDocuments("posts")

  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    if(query) {
      return navigate(`/search?q=${query}`)
    }
  }
  return (
    <div className={Styles.home}>
      <h1>Veja os posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={Styles.search_form}>
        <input type="text" placeholder='Ou busque por tags...' onChange={(e) => setQuery(e.target.value)} />
        <button className='btn btn-dark'>Pesquisar</button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts && posts.map((post) => (
          <PostDetail key={post.id} post={post}/>
        ))}
      {posts && posts.length === 0 && (
        <div className={Styles.noposts}>
          <p>Não foi encontrado nenhum post</p>
          <NavLink to="/posts/create" className="btn">Criar primeiro post</NavLink>
        </div>
      )}
    </div>
    </div >
  )
}

export default Home
