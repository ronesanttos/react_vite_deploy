import Styles from './CreatePost.module.css'

import { useState } from 'react'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'
import {useNavigate} from "react-router-dom"

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [imagem, setImg] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const { insertDocument, response } = useInsertDocument("posts")
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

    if(!title || !imagem || !tags || !body) {
      setFormError("Preencha todos os campos")
    }

    if (formError) return;

    insertDocument({
      title,
      imagem,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    navigate("/")
  }

  return (
    <div className={Styles.create_post}>
      <h2>Criar post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título</span>
          <input type="text" name="title" required placeholder='Digite um título para seu post...' onChange={(e) => setTitle(e.target.value)} value={title} />
        </label>

        <label>
          <span>URL da imagem</span>
          <input type="text" name="imagem" required placeholder='Insira uma imagem' onChange={(e) => setImg(e.target.value)} value={imagem} />
        </label>

        <label>
          <span>Conteúdo</span>
          <textarea name="body" placeholder='Insira o conteúdo do post' value={body} onChange={(e) => setBody(e.target.value)} ></textarea>
        </label>

        <label>
          <span>Tags</span>
          <input type="text" name="tags" required placeholder='Insira as tags separadas por vírgula' onChange={(e) => setTags(e.target.value)} value={tags} />
        </label>
        {!response.loading && <button className='btn'>Cadastrar</button>}
        {response.loading && <button className='btn' disabled>Aguarde...</button>}
        {response.error && <p className='error'>{response.error}</p>}
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost
