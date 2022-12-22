import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllUsers } from '../Slice/userSlice';
function UserList() {

    const users = useSelector(selectAllUsers);
    
    const renderedUsers = users.map(user=>{
        
        return(
        <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
        </li>

        )
    })
    
    return (<>
        <h1>Users</h1>
        <ul>{renderedUsers}</ul>
    </>);
}

export default UserList;