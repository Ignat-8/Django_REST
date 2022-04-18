import React from 'react'
import { Link } from 'react-router-dom'


function objList(obj) {
    let sout = ''
    for (let i = 0; i < obj.length; i++) {
        sout += obj[i].id + ', '
    }
    return sout.slice(0, sout.length - 2)
}

// не работает, т.к. deleteProject передается как объект а не как функция
// function GetButton(obj, deleteProject) {
//     console.log(obj)
//     if (obj.obj.is_active == true) {
//         console.log(obj.obj.id)
//         return <button onClick={() => deleteProject(obj.obj.id)}>Delete</button>;
//     }
//     else {
//         return ''
//     }
// }

const ProjectsItem = ({ item, deleteProject, todos }) => {
    return (
        <tr key={item.id}>
            <td>{item.id}</td>
            <td>
                <Link to={`${item.id}`}>{item.name}</Link>
            </td>
            <td>{item.link}</td>
            <td>{objList(todos.filter((obj) => obj.project == item.id))}</td>
            <td>{item.is_active + ''}</td>
            <td><button onClick={() => deleteProject(item.id)}>Delete</button></td>
            {/* <td><GetButton deleteProject={deleteProject} obj={item} /></td> */}
        </tr >
    )
}

const ProjectsList = ({ projects, deleteProject, todos }) => {
    return (
        <table border="1">
            <thead></thead>
            <tfoot></tfoot>
            <tbody>
                <tr>
                    <th>project id</th>
                    <th>project name</th>
                    <th>link to project</th>
                    <th>id todos</th>
                    <th>is_active</th>
                    <th></th>
                </tr>
                {projects.map((item) => <ProjectsItem item={item} deleteProject={deleteProject} todos={todos} />)}
            </tbody>
        </table>
    )
}
export default ProjectsList
