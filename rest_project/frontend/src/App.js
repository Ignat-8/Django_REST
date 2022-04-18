import React from 'react';
// import logo from './logo.svg';
import './App.css';
import ProjectsList from './components/projects.js';
import ProjectDescr from './components/projectdescr.js';
import ProjectForm from './components/projectForm.js';
import UsersList from './components/users.js';
import TodosList from './components/todos.js';
import LoginForm from './components/LoginForm.js';
import TodoForm from './components/TodoForm.js';
import axios from 'axios';
import { //HashRouter, 
  BrowserRouter, Route, Routes, Link, useLocation
} from 'react-router-dom';


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
    let headers = {
      'Content-Type': 'application/json'
    }
    if (this.isAuth()) {
      headers['Authorization'] = 'Token ' + this.state.token
      headers['Accept'] = 'application/json; version=v2'
    }
    return headers
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

        // console.log(users)
        // console.log(projects)
        // console.log(todos)

        this.setState({
          'users': users,
          'projects': projects, //.filter((item) => item.is_active == 1)
          'todos': todos //.filter((item) => item.is_active == 1)
        })
      }))
      .catch(
        error => {
          console.log('get_data_error=', error);
          if (error == 'Error: Request failed with status code 401') {
            console.log(this.isAuth());
            this.setState({ 'token': '' });
          }
        }
      );
  }

  get_token(login, password) {
    axios
      .post('http://127.0.0.1:8000/api-token-auth/', { 'username': login, 'password': password })
      .then(response => {
        const token = response.data.token
        localStorage.setItem('token', token)
        this.setState({
          'token': token
        }, () => this.getData()) // передаем функцию внутрь чтобы она выполнилась после обновления состояния
        //this.getData() // так будет работать на не большом приложении, когда предыдущая функция успевает обновлять состояние
        console.log('get_token =', token)
      })
      .catch(
        error => {
          console.log('get_token_error =', error);
          if (error == 'Error: Request failed with status code 401') {
            this.setState({ 'token': '' });
          }
        }
      )
  }

  deleteProject(id) {
    const headers = this.getHeader()
    console.log('deleteProject_id =', id)

    axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, { headers })
      .then(response => {
        //обновляем данные, если хотим изменить статус при удалении
        this.getData()

        //отфильтровываем на странице удаленные данные
        // this.setState({
        //   'todos': this.state.todos.filter((item) => item.id !== id)
        // })
      }).catch(error => console.log(error))
  }

  newProject(name, link) {
    const headers = this.getHeader()
    const data = {
      name: name,
      link: link,
      is_active: 1
    }

    axios.post(`http://127.0.0.1:8000/api/projects/`, data, { headers })
      .then(response => {
        this.getData()
      }).catch(error => console.log(error))
  }

  changeProject(id, name, link) {
    console.log('project id =', id, ' is change!!!!!!!')
    const headers = this.getHeader()

    const data = {
      'name': name,
      'link': link,
    }

    axios.put(`http://127.0.0.1:8000/api/projects/${id}/`, data, { headers })
      .then(response => {
        this.getData()
      }).catch(error => console.log(error))
  }

  deleteTodo(id) {
    const headers = this.getHeader()
    console.log('deleteTodo_id =', id)

    axios.delete(`http://127.0.0.1:8000/api/todos/${id}`, { headers })
      .then(response => {
        //обновляем данные, если хотим изменить статус при удалении
        this.getData()

        //отфильтровываем на странице удаленные данные
        // this.setState({
        //   'todos': this.state.todos.filter((item) => item.id !== id)
        // })
      }).catch(error => console.log(error))
  }

  newTodo(project, user, title, text) {
    const headers = this.getHeader()
    const data = {
      project: project,
      user: user,
      title: title,
      text: text,
      is_active: 1
    }

    axios.post(`http://127.0.0.1:8000/api/todos/`, data, { headers })
      .then(response => {
        this.getData()
      }).catch(error => console.log(error))
  }

  logOut() {
    localStorage.setItem('token', '')
    this.setState({
      'token': ''
    }, () => this.getData())
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
              <li><Link to='/project/create'>Projects create</Link></li>
              <li><Link to='/todos'>Todos</Link></li>
              <li><Link to='/todo/create'>Todos create</Link></li>
              <li>
                {this.isAuth() ? <button onClick={() => this.logOut()}>Logout</button> : <Link to='/login'>Login</Link>}
              </li>
            </nav><br></br>
            <Routes>
              <Route exact path='/'
                element={<UsersList users={this.state.users} />}
              />
              <Route exact path='/login'
                element={<LoginForm
                  get_token={(login, password) => this.get_token(login, password)} />}
              />
              <Route exact path='/projects'
                element={<ProjectsList
                  projects={this.state.projects}
                  todos={this.state.todos}
                  deleteProject={(id) => this.deleteProject(id)}
                  changeProject={(id, name, link) => this.changeProject(id, name, link)} />}
              />
              <Route path='/projects/:id'
                element={<ProjectDescr
                  projects={this.state.projects}
                  todos={this.state.todos}
                  users={this.state.users} />}
              />
              <Route exact path='/project/create'
                element={<ProjectForm newProject={(name, link) => this.newProject(name, link)} />}
              />
              <Route exact path='/todos'
                element={<TodosList
                  todos={this.state.todos}
                  projects={this.state.projects}
                  users={this.state.users}
                  deleteTodo={(id) => this.deleteTodo(id)} />}
              />
              <Route exact path='/todo/create'
                element={<TodoForm
                  projects={this.state.projects}
                  users={this.state.users}
                  newTodo={(project, user, title, text) => this.newTodo(project, user, title, text)} />}
              />
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
