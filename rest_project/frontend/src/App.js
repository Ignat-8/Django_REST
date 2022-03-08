import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProjectsList from './components/projects.js';
import ProjectDescr from './components/projectdescr.js';
import UsersList from './components/users.js';
import TodosList from './components/todos.js';
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
      'todos': []
    }
  }

  componentDidMount() {
    axios.all(
      [axios.get('http://127.0.0.1:8000/api/users/'),
      axios.get('http://127.0.0.1:8000/api/projects/'),
      axios.get('http://127.0.0.1:8000/api/todos/')])
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
      .catch(error => console.log(error));
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
            </nav><br></br>
            <Routes>
              <Route exact path='/' element={<UsersList users={this.state.users} />} />
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
