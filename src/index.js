import React from 'react'
import { render } from 'react-dom'
import PostsProvider from './providers/PostsProvider'
import UserProvider from './providers/UserProvider'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.scss'

import Application from './components/Application'

render(
  <Router>
    <PostsProvider>
      <UserProvider>
        <Application />
      </UserProvider>
    </PostsProvider>
  </Router>,
  document.getElementById('root')
)
