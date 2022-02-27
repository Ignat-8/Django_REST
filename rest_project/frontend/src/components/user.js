import React from 'react'

const UserItem = ({ user }) => {
    return (
        <tr>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.birthday_year}</td>
            <td>{user.email}</td>
            <td>{user.date_joined}</td>
            <td>{user.is_staff}</td>
            <td>{user.is_active}</td>
        </tr>
    )
}

const UserList = ({ users }) => {
    return (
        <table border="1">
            <thead></thead>
            <tfoot></tfoot>
            <tbody>
                <tr>
                    <th>First name</th>
                    <th>Last Name</th>
                    <th>Birthday year</th>
                    <th>email</th>
                    <th>date_joined</th>
                    <th>is_staff</th>
                    <th>is_active</th>
                </tr>
                {users.map((user) => <UserItem user={user} />)}
            </tbody>
        </table>
    )
}
export default UserList
