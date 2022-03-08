import React from 'react'
import { Link } from 'react-router-dom'


const ProjectsItem = ({ item }) => {
    return (
        <tr>
            <td>
                <Link to={`${item.id}`}>{item.name}</Link>
            </td>
            <td>{item.link}</td>
            <td>{item.users}</td>
        </tr>
    )
}

const ProjectsList = ({ projects }) => {
    return (
        <table border="1">
            <thead></thead>
            <tfoot></tfoot>
            <tbody>
                <tr>
                    <th>name</th>
                    <th>link</th>
                    <th>users</th>
                </tr>
                {projects.map((item) => <ProjectsItem item={item} />)}
            </tbody>
        </table>
    )
}
export default ProjectsList
