import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Join from './join/join'
import Chat from './chat/chat'

const App = () => (
    <Router>
        <Route path="/" exact component={Join}></Route>
        <Route path="/chat" component={Chat}></Route>
    </Router>
)

export default App