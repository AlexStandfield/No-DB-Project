import React, {Component} from 'react'
import axios from 'axios'
import './Update.css'

export default class Update extends Component {
    constructor(){
        super()
        
        this.state = {
            edit: false,
            editName: '',
            editPosition: '',
            editRating: ''
        }
    }
    toggle = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    inputName = (val) => {
        this.setState({
            editName: val
        })
    }
    inputPosition = (val) => {
        this.setState({
            editPosition: val
        })
    }
    inputRating = (val) => {
        this.setState({
            editRating: val
        })
    }

    updatePlayers = (id) => {
        const updatedPlayers = {
            name: this.state.editName,
            position: this.state.editPosition,
            rating: this.state.editRating
        }
        console.log(updatedPlayers)
        axios.put(`/api/players/${id}`, updatedPlayers)
        .then(res => {
            console.log(res.data)
            this.props.updatePlayers(res.data)
            this.toggle()
        })
    }
    deletePlayer = () => {
        axios.delete(`/api/players/${this.props.players.id}`)
        .then(res => {
            this.props.deletePlayers(res.data)
            if(this.state.edit){
                this.toggle()
            }
        })
    }
    

    render(){
        console.log(this.state)
        return(
            <div className="info-display">
                {!this.state.edit
                ?
                (<div className="player-cards">
                    <img src={this.props.players.img} alt="Player Picture"/>
                    <h3 className="player-name">Name: {this.props.players.name}</h3>
                    <h3 className="player-position">Position: {this.props.players.position}</h3>
                    <h3 className="player-rating">Rating: {this.props.players.rating}</h3>
                    <button className="edit" onClick={this.toggle}>Edit</button>
                    <button className="delete" onClick={() => this.deletePlayer(this.props.players.id)}>Delete</button>
                </div> )
                :
                (<div className="player-cards">
                    <img></img>
                    <input placeholder="Edit Name" onChange={(e) => this.inputName(e.target.value)} value={this.state.editName}/>
                    <input placeholder="Edit Position" onChange={(e) => this.inputPosition(e.target.value)} value={this.state.editPosition}/>
                    <input placeholder="Edit Rating" onChange={(e) => this.inputRating(e.target.value)}value={this.state.editRating}/>
                    <button className="edit" onClick={() => this.updatePlayers(this.props.players.id)}>Done</button>
                    <button className="delete" onClick={() => this.deletePlayer(this.props.players.id)}>Delete</button>
                </div> )
            }

            </div>
        )
    }
}