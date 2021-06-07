import React from 'react'

import './join.css'

class Join extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            room: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.joinRoom = this.joinRoom.bind(this)
    }
    
    handleChange(event) {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    joinRoom () {
        this.props.history.push(`/chat?name=${this.state.name}&room=${this.state.room}`)
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <div className="text-center mb-4">
                            <h1 className="text-center mb-0"> Whisperio </h1>
                        </div>
                        <form onSubmit={this.joinRoom}>
                            <div>
                                <input 
                                    name="name"
                                    type="text" 
                                    placeholder="Name" 
                                    className="form-control" 
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <input 
                                    name="room"
                                    type="text" 
                                    placeholder="Room" 
                                    className="form-control mt-2" 
                                    value={this.state.room}
                                    onChange={this.handleChange}
                                    required
                                />
                            </div>
                            <button 
                                className="btn btn-primary btn-block mt-3" 
                                type="submit"> 
                                    Join Now! 
                            </button>
                        </form>
                        <hr />
                        <p className="text-center"> 
                            <small> <i>
                                Developed by 
                                <a href="https://michaeljohnisip.netlify.com" target="_blank" rel="noopener noreferrer"> Michael Isip </a> 
                            </i></small>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Join