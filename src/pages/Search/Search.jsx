import Styles from "./Search.module.css"

import { useDocuments } from "../../hooks/useDocuments"
import { useQuery } from "../../hooks/useQuery"

import PostDetail from "../../components/PostDetail"
import { NavLink } from "react-router-dom"

const Search = () => {
  const query = useQuery()
  const search = query.get("q")

  const { documents: posts } = useDocuments("posts", search)

  return (
    <div className={Styles.search_container}>
      <h2>Search</h2>
      <div>
        {posts && posts.length === 0 && (
          <div className={Styles.noposts}>
            <p>Post não encontrado...</p>
            <NavLink to="/" className="btn btn-dark">Voltar</NavLink>
          </div>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  )
}

export default Search
