import React, { useState } from 'react'


const BlogForm = ({ author, createBlog } ) => {

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title: title,
      url : url,
      author: author
    })

    setTitle('')
    setUrl('')
  }



  return (
    <>
      <h2>New blog</h2>
      <form className="form" onSubmit={addBlog}>
        <div className="formline">
          <label className="label">Title</label>
          <input id="title" value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div className="formline">
          <label className="label">Author</label>
          <input id="author" value={author} readOnly/>
        </div>
        <div className="formline">
          <label className="label">Url</label>
          <input id="url" value={url} onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button id="submit-new-blog" type="Submit">Submit</button>
      </form>
    </>
  )
}

export default BlogForm