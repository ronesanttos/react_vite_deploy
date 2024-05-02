import Styles from './EditPost.module.css'

import { useState, useEffect } from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { useNavigate, useParams } from "react-router-dom"
import { useDocument } from "../../hooks/useDocument"
import { useUpdateDocument } from '../../hooks/useUpdate'

const EditPost = () => {

    const { id } = useParams()
    const { document: post } = useDocument("posts", id)

    const [title, setTitle] = useState("")
    const [imagem, setImg] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState([])
    const [formError, setFormError] = useState("")

    useEffect(() => {
        if (post) {
            setTitle(post.title)
            setBody(post.body)
            setImg(post.imagem)

            const textTags = post.tagsArray.join(", ")
            setTags(textTags)
        }

    }, [post])


    const { updateDocument, response } = useUpdateDocument("posts")
    const { user } = useAuthValue()

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        try {
            new URL(imagem)
        } catch (error) {
            setFormError("A imagem precisa ser uma URL")
        }

        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

        if (!title || !imagem || !tags || !body) {
            setFormError("Preencha todos os campos")
        }

        if (formError) return;

        const data = {
            title,
            imagem,
            body,
            tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        }

        updateDocument(id, data)

        navigate("/dashboard")
    }

    return (
        <div className={Styles.edit_post}>
            {post && (
                <>
                    <h2>Editando post - {post.title}</h2>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Título</span>
                            <input type="text" name="title" required placeholder='Digite um título para seu post...' onChange={(e) => setTitle(e.target.value)} value={title} />
                        </label>

                        <label>
                            <span>URL da imagem</span>
                            <input type="text" name="imagem" required placeholder='Insira uma imagem' onChange={(e) => setImg(e.target.value)} value={imagem} />
                        </label>
                        <p className={Styles.preview_title}>Preview da imagem atual:</p>
                        <img className={Styles.imagem_preview} src={post.imagem} alt={post.title} />

                        <label>
                            <span>Conteúdo</span>
                            <textarea name="body" placeholder='Insira o conteúdo do post' value={body} onChange={(e) => setBody(e.target.value)} ></textarea>
                        </label>

                        <label>
                            <span>Tags</span>
                            <input type="text" name="tags" required placeholder='Insira as tags separadas por vírgula' onChange={(e) => setTags(e.target.value)} value={tags} />
                        </label>
                        {!response.loading && <button className='btn'>Atualizar</button>}
                        {response.loading && <button className='btn' disabled>Aguarde...</button>}
                        {response.error && <p className='error'>{response.error}</p>}
                        {formError && <p className='error'>{formError}</p>}
                    </form>
                </>
            )}
        </div>
    )
}

export default EditPost
