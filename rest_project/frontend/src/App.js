import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProjectList from './components/project.js';
import UserList from './components/user.js';
import TodoList from './components/todo.js';
import axios from 'axios';


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
          <p>_________________________________________________________</p>
        </div>
        <div>
          <p><b>Таблица пользователей</b></p>
          <UserList users={this.state.users} />
        </div>
        <div>
          <p>_________________________________________________________</p>
        </div>
        <div>
          <p><b>Таблица проектов</b></p>
          {/* <ProjectList projects={this.state.projects} /> */}
        </div>
        <div>
          <p>_________________________________________________________</p>
        </div>
        <div>
          <p><b>Таблица todo</b></p>
          {/* <TodoList todos={this.state.todos} /> */}
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
