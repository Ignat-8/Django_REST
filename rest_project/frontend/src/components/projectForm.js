import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'name': '',
            'link': '',
        }
    }

    handleSubmit(event) {
        this.props.newProject(
            this.state.name,
            this.state.link,
        )
        event.preventDefault() // запрещает выполнять действия по умолчанию
    }

    handleTextChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)} >
                <input type="text"
                    onChange={(event) => this.handleTextChange(event)}
                    name="name"
                    placeholder="project name"
                    value={this.state.name}
                />

                <input type="text"
                    onChange={(event) => this.handleTextChange(event)}
                    name="link"
                    placeholder="link to project"
                    value={this.state.link}
                />
                <input type="submit" value="save" />
            </form>
        )
    }
}

export default ProjectForm
