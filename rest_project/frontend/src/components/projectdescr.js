import React from 'react'
import { useParams } from 'react-router-dom'


const ProjectItem = ({ item }) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.project}</td>
            <td>{item.user}</td>
            <td>{item.title}</td>
            <td>{item.text}</td>
            <td>{item.date_created}</td>
            <td>{item.date_modified}</td>
            <td>{item.is_active}</td>
        </tr>
    )
}

const ProjectDescr = ({ todos }) => {
    var { id } = useParams()
    var filteredProjects = todos.filter((item) => item['project'] = parseInt(id))

    return (
        <table border="1">
            <thead></thead>
            <tfoot></tfoot>
            <tbody>
                <tr>
                    <th>id</th>
                    <th>Project</th>
                    <th>User</th>
                    <th>Title</th>
                    <th>Text</th>
                    <th>date_created</th>
                    <th>date_modified</th>
                    <th>is_active</th>
                </tr>
                {filteredProjects.map((item) => <ProjectItem item={item} />)}
            </tbody>
        </table>
    )
}
export default ProjectDescr
