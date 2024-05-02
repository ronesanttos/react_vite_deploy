import Styles from './PostDetail.module.css'

import { NavLink } from 'react-router-dom'

const PostDetail = ({ post }) => {
    return (
        <div className={Styles.post_detail}>
            <img src={post.imagem} alt={post.title} />
            <h2>{post.title}</h2>
            <p className={Styles.createdby}>{post.createdBy}</p>

            <div className={Styles.tags}>
                {post.tagsArray.map((tag) => (
                    <p key={tag}>
                        <span>#</span>
                        {tag}
                    </p>
                ))}
            </div>

            <NavLink to={`posts/${post.id}`} className="btn btn-outline">Ler</NavLink>
        </div>
    )
}

export default PostDetail
