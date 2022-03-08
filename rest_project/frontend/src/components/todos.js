import React from 'react'

const TodoItem = ({ item }) => {
    return (
        <tr>
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

const TodosList = ({ todos }) => {
    return (
        <table border="1">
            <thead></thead>
            <tfoot></tfoot>
            <tbody>
                <tr>
                    <th>Project</th>
                    <th>User</th>
                    <th>Title</th>
                    <th>Text</th>
                    <th>date_created</th>
                    <th>date_modified</th>
                    <th>is_active</th>
                </tr>
                {todos.map((item) => <TodoItem item={item} />)}
            </tbody>
        </table>
    )
}
export default TodosList
