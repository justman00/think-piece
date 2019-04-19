import React, { Component } from 'react'

import { firestore } from '../firebase'

import Posts from './Posts'
import { collectIdsAndDocs } from '../utilities'

class Application extends Component {
  state = {
    posts: []
  }

  unsubscrbe = null

  componentDidMount = async () => {
    this.unsubscrbe = firestore.collection('posts').onSnapshot(snapshot => {
      const posts = snapshot.docs.map(collectIdsAndDocs)
      console.log(posts)
      this.setState({ posts })
    })
  }

  componentWillUnmount = () => {
    this.unsubscrbe()
  }

  render() {
    const { posts } = this.state

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts posts={posts} />
      </main>
    )
  }
}

export default Application
