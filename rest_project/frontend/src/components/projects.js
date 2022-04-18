import React from 'react'
import { Link } from 'react-router-dom'


class ProjectList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: props.projects,
            todos: props.todos,
        }
    }

    objList(obj) {
        let sout = ''
        for (let i = 0; i < obj.length; i++) {
            sout += obj[i].id + ', '
        }
        return sout.slice(0, sout.length - 2)
    }

    ProjectDelete(project_id) {
        this.state.projects[project_id - 1].is_active = 'false'
        this.props.deleteProject(
            this.state.projects[project_id - 1].id
        )
    }

    ProjectNameChange(event, project_id) {
        this.state.projects[project_id - 1].name = event.target.value
        this.props.changeProject(
            project_id, this.state.projects[project_id - 1].name, this.state.projects[project_id - 1].link
        )
    }

    ProjectLinkChange(event, project_id) {
        this.state.projects[project_id - 1].link = event.target.value
        this.props.changeProject(
            project_id, this.state.projects[project_id - 1].name, this.state.projects[project_id - 1].link
        )
    }

    ProjectItem(project) {
        return (
            <tr key={project.id}>
                <td><Link to={`${project.id}`}>{project.id}</Link></td>
                <td><input type="text"
                    onChange={(event) => this.ProjectNameChange(event, project.id)}
                    name={'project_' + project.id}
                    value={this.state.projects[project.id - 1].name}
                /></td>
                <td><input type="text"
                    onChange={(event) => this.ProjectLinkChange(event, project.id)}
                    name={'lnk_' + project.link}
                    value={this.state.projects[project.id - 1].link}
                /></td>
                <td>{this.objList(this.state.todos.filter((obj) => obj.project == project.id && (obj.is_active + '') == 'true'))}</td>
                <td>{this.state.projects[project.id - 1].is_active + ''}</td>
                <td><button onClick={() => this.ProjectDelete(project.id)}>Delete</button></td>
            </tr>
        )
    }

    render() {
        return (
            <table border="1">
                <thead></thead>
                <tfoot></tfoot>
                <tbody>
                    <tr>
                        <th>Project_id</th>
                        <th>Project name</th>
                        <th>Link</th>
                        <th>list of todos</th>
                        <th>is_active</th>
                        <th>delete project</th>
                    </tr>
                    {this.state.projects.map((project) => this.ProjectItem(project))}
                </tbody>
            </table>
        )
    }
}

export default ProjectList
