import Styles from './Post.module.css'

import { useParams } from "react-router-dom"
import { useDocument } from "../../hooks/useDocument";

const Post = () => {
  const { id } = useParams()
  const { document: post, loading } = useDocument("posts", id)
  return (
    <div className={Styles.post_container}>
      {loading && <p>Carregando...</p>}
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.imagem} alt={post.title}/>
          <p>{post.body}</p>

          <h3>Este post trata sobre: </h3>
          <div className={Styles.tags}>
            {post.tagsArray.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Post
