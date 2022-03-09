import axios from 'axios'
const baseUrl = '/api/comments'

const getCommentByBlogId = async (id) => {
  const comments = await axios.get(`${baseUrl}/${id}`)
  return comments.data
}

const createComment = async (comment) => {
  const newComment = await axios.post(`${baseUrl}/${comment.blog}`, comment)
  return newComment.data
}

export default { getCommentByBlogId, createComment }
