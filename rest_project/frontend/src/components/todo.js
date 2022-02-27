import React from 'react'

const TodoItem = ({ todo }) => {
    return (
        <tr>
            <td>{todo.project}</td>
            <td>{todo.user}</td>
            <td>{todo.text}</td>
            <td>{todo.date_created}</td>
            <td>{todo.date_modified}</td>
            <td>{todo.is_active}</td>
        </tr>
    )
}

const TodoList = ({ todos }) => {
    return (
        <table border="1">
            <thead></thead>
            <tfoot></tfoot>
            <tbody>
                <tr>
                    <th>Project</th>
                    <th>User</th>
                    <th>Text</th>
                    <th>date_created</th>
                    <th>date_modified</th>
                    <th>is_active</th>
                </tr>
                {todos.map((todo) => <TodoItem todo={todo} />)}
            </tbody>
        </table>
    )
}
export default TodoList
