import React from 'react'
import { Link } from 'react-router-dom'


function objList(obj) {
    let sout = ''
    for (let i = 0; i < obj.length; i++) {
        sout += obj[i].id + ', '
    }
    return sout.slice(0, sout.length - 2)
}

function handleTextChange(event) {
    console.log(event)
}

const ProjectItem = ({ item, todos, deleteProject, changeProject }) => {
    return (
        <tr>
            <td><Link to={`${item.id}`}>{item.id}</Link></td>
            <td><input type="text"
                onChange={(event) => handleTextChange(event)}
                name="name"
                placeholder="project name"
                value={item.name}
            /></td>
            <td><input type="text"
                onChange={(event) => handleTextChange(event)}
                name="link"
                placeholder="project name"
                value={item.link}
            /></td>
            <td>{objList(todos.filter((obj) => obj.project == item.id && (obj.is_active + '') == 'true'))}</td>
            <td>{item.is_active + ''}</td>
            <td><button onClick={() => deleteProject(item.id)}>Delete</button></td>
            <td><button onClick={() => changeProject(item.id)}>Change</button></td>
        </tr>
    )
}

const ProjectsList = ({ projects, todos, deleteProject, changeProject }) => {
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
                    <th>change project</th>
                </tr>
                {projects.map((item) =>
                    <ProjectItem
                        key={item.id}
                        item={item}
                        todos={todos}
                        deleteProject={deleteProject}
                        changeProject={changeProject}
                    />)}
            </tbody>
        </table>
    )
}

export default ProjectsList
