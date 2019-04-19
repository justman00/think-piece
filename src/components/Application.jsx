import React, { Component } from 'react'

import { firestore } from '../firebase'

import Posts from './Posts'
import { collectIdsAndDocs } from '../utilities'
import Authentication from './Authentication'
import { auth } from '../firebase'

class Application extends Component {
  state = {
    posts: [],
    user: null
  }

  unsubscrbeFromFirestore = null
  unsubscrbeFromAuth = null

  componentDidMount = async () => {
    this.unsubscrbeFromFirestore = firestore
      .collection('posts')
      .onSnapshot(snapshot => {
        const posts = snapshot.docs.map(collectIdsAndDocs)
        console.log(posts)
        this.setState({ posts })
      })

    this.unsubscrbeFromAuth = auth.onAuthStateChanged(user => {
      console.log(user)
      this.setState({ user })
    })
  }

  componentWillUnmount = () => {
    this.unsubscrbe()
  }

  render() {
    const { posts, user } = this.state

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication user={user} />
        <Posts posts={posts} />
      </main>
    )
  }
}

export default Application
