import React from 'react'
import { useParams } from 'react-router-dom'


const ProjectItem = ({ item, project, users }) => {
    return (
        <tr>
            <td>{item.project}</td>
            <td>{project[0].name}</td>
            <td>{item.id}</td>
            <td>{item.user}</td>
            <td>{users.filter((el) => el['id'] == item.user)[0].first_name}</td>
            <td>{item.title}</td>
            <td>{item.text}</td>
            <td>{item.date_created}</td>
            <td>{item.date_modified}</td>
            <td>{item.is_active + ''}</td>
        </tr>
    )
}

const ProjectDescr = ({ todos, projects, users }) => {
    var { id } = useParams()
    var filteredTodos = todos.filter((item) => item['project'] == parseInt(id))
    var filteredProjects = projects.filter((item) => item['id'] == parseInt(id))

    return (
        <table border="1">
            <thead></thead>
            <tfoot></tfoot>
            <tbody>
                <tr>
                    <th>Project_id</th>
                    <th>Project name</th>
                    <th>Todo_id</th>
                    <th>User_id</th>
                    <th>User name</th>
                    <th>Todo Title</th>
                    <th>Todo Text</th>
                    <th>Todo date_created</th>
                    <th>Todo date_modified</th>
                    <th>Todo_is_active</th>
                </tr>
                {filteredTodos.map((item) =>
                    <ProjectItem
                        key={item.id}
                        item={item}
                        project={filteredProjects}
                        users={users}
                    />)}
            </tbody>
        </table>
    )
}
export default ProjectDescr
