import React from 'react'
import ReactDOM from 'react-dom'

import './Comment'
import './Comments.css'
import Comment from './Comment'

class Comments extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      comments: []
    }
  }

  componentWillMount () {
    console.log('Fetch comments')
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
    console.log('Post comment')
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
    console.log('Delete comment:', commentId)

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
        <Comment key={comment._id} comment={ comment } onDelete={this.deleteComment.bind(this)} />
      ))
    }

    return (
      <div>
        <div className="Comments-input">
          <div className="Comments-labels" >
            <span className="input-label">Author</span><br />
            <span className="input-label">Message</span>
          </div>
          <div className="Comments-inputs">
            <input ref="inputAuthor" name="author" /><br />
            <input ref="inputMessage" name="message" />
          </div>
          <input className="Comments-submit" type="submit" value="Add comment" onClick={this.postComment.bind(this)} />
        </div>
        { Comments }
      </div>
    )
  }
}

export default Comments
