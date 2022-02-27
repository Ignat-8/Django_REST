import React from 'react'

const ProjectItem = ({ project }) => {
    return (
        <tr>
            <td>{project.name}</td>
            <td>{project.link}</td>
            <td>{project.users}</td>
        </tr>
    )
}

const ProjectList = ({ projects }) => {
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
                {projects.map((project) => <ProjectItem project={project} />)}
            </tbody>
        </table>
    )
}
export default ProjectList
