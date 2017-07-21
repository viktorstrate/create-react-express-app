import React from 'react'
import ReactDOM from 'react-dom'

import './Comments.css'

class Comments extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      comments: []
    }
  }

  componentWillMount () {
    fetch('/api/comments').then((res) => {
      return res.json()
    }).then((data) => {
      if (!data.success) {
        console.log(data.status)
        return
      }

      this.setState({
        comments: data.messages
      })
    })
  }

  postComment (event) {
    event.preventDefault()

    const self = this

    const message = ReactDOM.findDOMNode(this.refs.inputMessage).value
    const author = ReactDOM.findDOMNode(this.refs.inputAuthor).value

    ReactDOM.findDOMNode(this.refs.inputMessage).value = ''
    ReactDOM.findDOMNode(this.refs.inputAuthor).value = ''

    fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        author
      })
    }).then((res) => res.json())
      .then((json) => {
        self.setState({
          comments: self.state.comments.concat(json.message)
        })
      }).catch((err) => {
      console.log(err)
    })
  }

  deleteComment (commentId) {
    console.log('delete', commentId)

    const self = this

    fetch('/api/comments', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        commentId
      })
    }).then((res) => res.json())
      .then((json) => {
        let newComments = self.state.comments.filter((comment) => comment._id !== commentId)
        self.setState({
          comments: newComments
        })
      }).catch((err) => {
      console.log(err)
    })
  }

  render() {

    let Comments = null

    if (this.state.comments && this.state.comments.length > 0) {
      // Copy comments array to a new variable
      let comments = this.state.comments.slice()
      comments.reverse()
      Comments = comments.map(comment => (
        <div key={comment._id} className="comment-container">
          <b>Name:</b> {comment.author}<br/>
          <b>Message:</b> {comment.message}
          <div className="comment-delete" onClick={this.deleteComment.bind(this, comment._id)} >
            X
          </div>
        </div>
      ))
    }

    return (
      <div>
        <div>
          Author: <input ref="inputAuthor" name="author" /><br />
          Message: <input ref="inputMessage" name="message" /><br />
          <input type="submit" value="Add comment" onClick={this.postComment.bind(this)} />
        </div>
        { Comments }
      </div>
    )
  }
}

export default Comments
