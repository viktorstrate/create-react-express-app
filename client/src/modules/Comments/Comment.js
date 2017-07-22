import React from 'react'
import PropTypes from 'prop-types'

class Comment extends React.Component {
  render () {
    let deleteFunc = null
    if (this.props.onDelete) {
      deleteFunc = this.props.onDelete.bind(null, this.props.comment._id)
    }

    return (
      <div key={this.props.comment._id} className='comment-container'>
        <b>Name:</b> {this.props.comment.author}<br />
        <b>Message:</b> {this.props.comment.message}
        <div className='comment-delete' onClick={deleteFunc} >
          X
        </div>
      </div>
    )
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onDelete: PropTypes.func
}

export default Comment
