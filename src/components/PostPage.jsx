import React, { Component } from 'react'
import Post from './Post'
import Comments from './Comments'
import { withRouter } from 'react-router-dom'

import { firestore } from '../firebase'
import { collectIdsAndDocs } from '../utilities'
import withUser from './withUser'

class PostPage extends Component {
  state = { post: null, comments: [] }

  get postId() {
    return this.props.match.params.id
  }

  get postRef() {
    return firestore.doc(`posts/${this.postId}`)
  }

  get commentsRef() {
    return this.postRef.collection('comments')
  }

  unsubscribeFromPost = null
  unsubscribeFromComments = null

  componentDidMount = () => {
    this.unsubscribeFromPost = this.postRef.onSnapshot(snap => {
      const post = collectIdsAndDocs(snap)
      this.setState({ post })
    })

    this.unsubscribeFromComments = this.commentsRef.onSnapshot(snap => {
      const comments = snap.docs.map(collectIdsAndDocs)
      this.setState({ comments })
    })
  }

  componentWillUnmount = () => {
    this.unsubscribeFromComments()
    this.unsubscribeFromPost()
  }

  createComment = comment => {
    const { user } = this.props

    this.commentsRef.add({
      ...comment,
      user
    })
  }

  render() {
    const { post, comments } = this.state

    return (
      <section>
        {post && <Post {...post} />}
        <Comments comments={comments} onCreate={this.createComment} />
      </section>
    )
  }
}

export default withRouter(withUser(PostPage))
