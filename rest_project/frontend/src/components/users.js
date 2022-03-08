import React from 'react'

const UserItem = ({ item }) => {
    return (
        <tr>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
            <td>{item.birthday_year}</td>
            <td>{item.email}</td>
            <td>{item.date_joined}</td>
            <td>{item.is_staff}</td>
            <td>{item.is_active}</td>
        </tr>
    )
}

const UsersList = ({ users }) => {
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
                {users.map((item) => <UserItem item={item} />)}
            </tbody>
        </table>
    )
}
export default UsersList
