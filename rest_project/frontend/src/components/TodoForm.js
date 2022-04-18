import React from 'react'

class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'project': '',
            'user': '',
            'title': '',
            'text': '',
        }
    }

    handleSubmit(event) {
        this.props.newTodo(
            this.state.project,
            this.state.user,
            this.state.title,
            this.state.text,
        )
        event.preventDefault() // запрещает выполнять действия по умолчанию
    }

    handleSelectChange(event) {
        // для случая множественного выбора в <Select>
        // let items = []
        // for (let i = 0; i < event.target.selectedOptions.length; i++) {
        //     items.push(parseInt(event.target.selectedOptions.item(i).value))
        // }

        // this.setState({
        //     [event.target.name]: items
        // })

        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleTextChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <select
                    name="project"
                    defaultValue="select project"
                    onChange={(event) => this.handleSelectChange(event)} >
                    <option selected disabled>select project</option>
                    {this.props.projects.map((project) =>
                        <option value={project.id}>
                            {project.name}
                        </option>)
                    }
                </select>
                <select
                    name="user"
                    defaultValue="select user"
                    onChange={(event) => this.handleSelectChange(event)}>
                    <option selected disabled>select user</option>
                    {this.props.users.map((user) =>
                        <option value={user.id}>
                            {user.first_name}
                        </option>)
                    }
                </select>
                <input
                    type="text"
                    onChange={(event) => this.handleTextChange(event)}
                    name="title"
                    placeholder="todo title"
                    value={this.state.title}
                />
                <input
                    type="text"
                    onChange={(event) => this.handleTextChange(event)}
                    name="text"
                    placeholder="todo text"
                    value={this.state.text}
                />
                <input type="submit" value="save" />
            </form>
        )
    }
}

export default TodoForm
