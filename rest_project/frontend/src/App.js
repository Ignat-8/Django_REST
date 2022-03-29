import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProjectsList from './components/projects.js';
import ProjectDescr from './components/projectdescr.js';
import UsersList from './components/users.js';
import TodosList from './components/todos.js';
import LoginForm from './components/LoginForm.js';
import axios from 'axios';
import { HashRouter, BrowserRouter, Route, Routes, Link, useLocation } from 'react-router-dom';


const NotFound = () => {
  let location = useLocation()
  return (
    <div>
      Page {location.pathname} not found
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'projects': [],
      'todos': [],
      'token': ''
    }
  }

  isAuth() {
    return !!this.state.token
  }

  getHeader() {
    if (this.isAuth()) {
      return {
        'Authorization': 'Token ' + this.state.token
      }
    }
    return {}
  }

  getData() {
    let headers = this.getHeader()
    axios.all(
      [axios.get('http://127.0.0.1:8000/api/users/', { headers }),
      axios.get('http://127.0.0.1:8000/api/projects/', { headers }),
      axios.get('http://127.0.0.1:8000/api/todos/', { headers })])
      .then(axios.spread((users_, project_, todo_) => {
        const users = users_.data
        const projects = project_.data
        const todos = todo_.data

        console.log(users)
        console.log(projects)
        console.log(todos)

        this.setState({
          'users': users,
          'projects': projects,
          'todos': todos
        })
      }))
      .catch(error => console.log('get_data_error=', error));
  }

  get_token(login, password) {
    axios
      .post('http://127.0.0.1:8000/api-token-auth/', { 'username': login, 'password': password })
      .then(response => {
        const token = response.data.token
        localStorage.setItem('token', token)
        this.setState({
          'token': token
        }) // передаем функцию внутрь чтобы она выполнилась после обновления состояния
        this.getData() // так будет работать на не большом приложении, когда предыдущая функция успевает обновлять состояние
        console.log('get_token =', token)
      })
      .catch(error => console.log('get_token_error =', error))
  }

  logOut() {
    localStorage.setItem('token', '')
    this.setState({
      'token': ''
    }, this.getData())
    console.log('logout token =', this.state.token)
  }

  componentDidMount() {
    let token = localStorage.getItem('token')

    this.setState({
      'token': token
    }, this.getData()) // передаем функцию внутрь чтобы она выполнилась после обновления состояния
    console.log('componentDidMount, token=', token)
  }

  render() {
    return (
      <div>
        <div>Menu</div>
        <div>
          <BrowserRouter>
            <nav>
              <li><Link to='/'>Users</Link></li>
              <li><Link to='/projects'>Projects</Link></li>
              <li><Link to='/todos'>Todos</Link></li>
              <li>
                {this.isAuth() ? <button onClick={() => this.logOut()}>Logout</button> : <Link to='/login'>Login</Link>}
              </li>
            </nav><br></br>
            <Routes>
              <Route exact path='/' element={<UsersList users={this.state.users} />} />
              <Route exact path='/login' element={<LoginForm get_token={(login, password) => this.get_token(login, password)} />} />
              <Route exact path='/projects' element={<ProjectsList projects={this.state.projects} />} />
              <Route path='/projects/:id' element={<ProjectDescr todos={this.state.todos} />} />
              <Route exact path='/todos' element={<TodosList todos={this.state.todos} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
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
