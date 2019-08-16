import React, {Component} from 'react';
import axios from 'axios'

import Header from './components/Header/Header'
import Update from './components/Update/Update'
import Footer from './components/Footer/Footer'

import 'reset-css'
import './App.css'


class App extends Component {
  constructor(){
    super()

    this.state = {
      players: [],
      name: '',
      position: '',
      rating: '',
      img: ''
    }
  }

  componentDidMount(){
    axios.get('/api/players')
    .then(() => {
    this.getPlayers()
  })
    .catch(error => {
      console.log(error)
    })
  }

  addPlayers = (event) => {
    event.preventDefault()

    const {name, position, rating, img} = this.state
    const body = {
      name,
      position,
      rating,
      img
    }
    axios.post('api/players', body).then(res => {
      this.setState({
        players: res.data,
        name: '',
        position: '',
        rating: '',
        img: ''
      })
    })
  }
  clearInput = (req, res) => {
    this.setState({
      players: res.data,
      name: '',
      position: '',
      rating: '',
      img: '',
    })
  }
  getPlayers = () => {
    axios.get('/api/players').then((res) => {
      this.setState({
        players: res.data
      })
    })
  }
  updatePlayers = (data) => {
    this.setState({
      players: data
  })
  }
  deletePlayers = (data) => {
    this.setState({
      players: data
  })
  }
 

  render(){
    const mappedPlayers = this.state.players.map((players, i) => {
      return(
        <Update key={i} players={players} updatePlayers={this.updatePlayers} deletePlayers={this.deletePlayers} />
      )
    })
    return(
      <div className='project-container'>
        <Header />
        <div className="input-field">
          <label>Name</label>
          <input placeholder="Name here" type="text" value={this.state.name} onChange={(event) => this.setState({name: event.target.value})}/>
          
          <label>Position</label>
          <input placeholder="Position Here" type="text" value={this.state.position} onChange={(event) => this.setState({position: event.target.value})}/>

          <label>Rating</label>
          <input placeholder="Rating Here" type="text" value={this.state.rating} onChange={(event) => this.setState({rating: event.target.value})}/>

          <label>Image</label>
          <input placeholder="Image URL Here" type="text" value={this.state.img} onChange={(event) => this.setState({img: event.target.value})}/>

          <button className="button" onClick={this.addPlayers}>Submit</button>

          <button className="button" onClick={this.clearInput}>Clear</button>
        </div>
        <div className="card-container">
        {mappedPlayers}
        </div>
        <div className="footer-container">
        <Footer/>
        <Footer/>
        <Footer/>
        <Footer/>
        <Footer/>
        <Footer/>
        </div>

      </div>
    )
  }
}

export default App