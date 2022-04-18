import React from 'react'

const TodoItem = ({ item, deleteTodo, projects, users }) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{projects.filter((obj) => obj.id == parseInt(item.project))[0].name}</td>
            <td>{users.filter((obj) => obj.id == parseInt(item.user))[0].first_name}</td>
            <td>{item.title}</td>
            <td>{item.text}</td>
            <td>{item.date_created}</td>
            <td>{item.date_modified}</td>
            <td>{item.is_active + ''}</td>
            <td><button onClick={() => deleteTodo(item.id)}>Delete</button></td>
        </tr>
    )
}

const TodosList = ({ todos, deleteTodo, projects, users }) => {
    return (
        <table border="1">
            <thead></thead>
            <tfoot></tfoot>
            <tbody>
                <tr>
                    <th>todo_id</th>
                    <th>Project name</th>
                    <th>User</th>
                    <th>Title</th>
                    <th>Text</th>
                    <th>date_created</th>
                    <th>date_modified</th>
                    <th>is_active</th>
                    <th></th>
                </tr>
                {todos.map((item) =>
                    <TodoItem key={item.id}
                        item={item}
                        deleteTodo={deleteTodo}
                        projects={projects}
                        users={users}
                    />)}
            </tbody>
        </table>
    )
}
export default TodosList
