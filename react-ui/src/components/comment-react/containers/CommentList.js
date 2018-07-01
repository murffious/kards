import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CommentList from '../components/CommentList'
import { initComments, deleteComment } from '../reducers/comments'

// CommentListContainer

//  CommentList  state
class CommentListContainer extends Component {
  static propTypes = {
    comments: PropTypes.array,
    initComments: PropTypes.func,
    onDeleteComment: PropTypes.func
  }

  componentWillMount() {
    // componentWillMount 
    this._loadComments()
  }

  _loadComments() {
    // LocalStorage 
    let comments = localStorage.getItem('comments')
    comments = comments ? JSON.parse(comments) : []
    // this.props.initComments onnect 

    this.props.initComments(comments)
  }

  handleDeleteComment(index) {
    const { comments } = this.props
    // props 
    const newComments = [
      ...comments.slice(0, index),
      ...comments.slice(index + 1)
    ]
    // LocalStorage
    localStorage.setItem('comments', JSON.stringify(newComments))
    if (this.props.onDeleteComment) {
      // this.props.onDeleteComment connect 
      // dispatch 
      this.props.onDeleteComment(index)
    }
  }

  render() {
    return (
      <CommentList
        comments={this.props.comments}
        onDeleteComment={this.handleDeleteComment.bind(this)} />
    )
  }
}

// state.comments 
const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //  CommentListContainer
    //  LocalStorage 
    //  state 
    initComments: (comments) => {
      dispatch(initComments(comments))
    },

    onDeleteComment: (commentIndex) => {
      dispatch(deleteComment(commentIndex))
    }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentListContainer)