import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthorList from './components/author.js';
import UserList from './components/user.js';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'authors': [],
      'users': []
    }
  }

  componentDidMount() {
    axios.all(
      [axios.get('http://127.0.0.1:8000/api/authors/'),
      axios.get('http://127.0.0.1:8000/api/users/')])
      .then(axios.spread((response_authors, response_users) => {
        const authors = response_authors.data
        const users = response_users.data
        this.setState({
          'authors': authors,
          'users': users
        })
      }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <div>Menu</div>
        <div>
          <p>_________________________________________________________</p>
        </div>
        <div>
          <p><b>Таблица авторов</b></p>
          <AuthorList authors={this.state.authors} />
        </div>
        <div>
          <p>_________________________________________________________</p>
        </div>
        <div>
          <p><b>Таблица пользователей</b></p>
          <UserList users={this.state.users} />
        </div>
        <div>
          <p>_________________________________________________________</p>
        </div>
        <div>footer</div>
      </div>
    )
  }
}

export default App;
