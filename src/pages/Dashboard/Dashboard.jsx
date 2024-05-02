import Styles from './Dashboard.module.css'

import { NavLink } from 'react-router-dom'
import { useAuthValue } from "../../context/AuthContext"
import { useDocuments } from "../../hooks/useDocuments"
import { useDeleteDocument } from '../../hooks/useDelete'

const Dashboard = () => {
  const { user } = useAuthValue()
  const uid = user.uid

  const { documents: posts, loading } = useDocuments("posts", null, uid)

  const { deleteDocument } = useDeleteDocument("posts")

  if (loading) {
    return <p>Carregandoo...</p>
  }

  return (
    <div className={Styles.dashboard}>
      <h2>Gerenciar post</h2>
      {posts && posts.length === 0 ? (
        <div className={Styles.noposts}>
          <p>Não foram encontrados posts</p>
          <NavLink to="/posts/create" className="btn">Criar primeiro post</NavLink>
        </div>
      ) : (
        <>
          <div className={Styles.post_header}>
            <span>Título: </span>
            <span>Açãoes</span>
          </div>

          {posts && posts.map((post) =>
          (<div className={Styles.post_row} key={post.id}>

            <p>{post.title}</p>

            <div className={Styles.actions}>
              <NavLink to={`/posts/${post.id}`} className="btn btn-outline" >Ver</NavLink>

              <NavLink to={`/posts/edit/${post.id}`} className="btn btn-outline">Editar</NavLink>

              <button onClick={() => deleteDocument(post.id)} className='btn btn-outline btn-danger'> Excluir</button>
            </div>
          </div>
          ))}
        </>
      )
      }
    </div >
  )
}

export default Dashboard
