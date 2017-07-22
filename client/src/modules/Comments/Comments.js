import React from 'react'
import ReactDOM from 'react-dom'

import callApi from '../../utils/callApi'
import Comment from './Comment'
import './Comments.css'

/**
 * A component to show and modify comments
 */
class Comments extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      comments: [],
      commentsState: 'loading'
    }
  }

  componentWillMount () {
    const self = this

    callApi('/api/comments').then((data) => {
      if (!data.success) {
        console.log(data.status)
        return
      }

      self.setState({
        comments: data.messages,
        commentsState: 'loaded'
      })
    })
  }

  postComment (event) {
    if (event) event.preventDefault()

    const self = this

    const message = ReactDOM.findDOMNode(this.refs.inputMessage).value
    const author = ReactDOM.findDOMNode(this.refs.inputAuthor).value

    ReactDOM.findDOMNode(this.refs.inputMessage).value = ''
    ReactDOM.findDOMNode(this.refs.inputAuthor).value = ''

    callApi('/api/comments', 'POST', { message, author }).then((data) => {
      self.setState({
        comments: self.state.comments.concat(data.message)
      })
    })
  }

  deleteComment (commentId) {
    const self = this

    callApi('/api/comments', 'DELETE', { commentId })
      .then((data) => {
        let newComments = self.state.comments.filter((comment) => comment._id !== commentId)
        self.setState({
          comments: newComments
        })
      })
  }

  render () {
    let Comments = null

    if (this.state.comments && this.state.comments.length > 0) {
      // Copy comments array to a new variable
      let comments = this.state.comments.slice()
      comments.reverse()
      Comments = comments.map(comment => (
        <Comment key={comment._id} comment={comment} onDelete={this.deleteComment.bind(this)} />
      ))
    } else if (this.state.commentsState === 'loading') {
      Comments = <div>Loading comments...</div>
    } else if (this.state.commentsState === 'loaded') {
      Comments = <div>No comments yet, post some.</div>
    }

    return (
      <div>
        <div className='Comments-input'>
          <div className='Comments-labels' >
            <span className='input-label'>Author</span><br />
            <span className='input-label'>Message</span>
          </div>
          <div className='Comments-inputs'>
            <input ref='inputAuthor' name='author' /><br />
            <input ref='inputMessage' name='message' />
          </div>
          <input className='Comments-submit' type='submit' value='Add comment' onClick={this.postComment.bind(this)} />
        </div>
        { Comments }
      </div>
    )
  }
}

export default Comments
