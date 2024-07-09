// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import User from './User';

// const UserList = () => {
//     const [users, setUsers] = useState([]);

//     useEffect(() => {
//         // axios.get('https://jsonplaceholder.typicode.com/users')
//         axios.get('http://localhost:8000')
//             .then(response =>setUsers(response.data))
//             .catch(error => console.log(error));
//     }, []);

//     return (
//         <div>
//             <h1>User List</h1>
//             {users.map(user => (
//                 <User key={user.id} user={user} />
//             ))}
//         </div>
//     );
// };

// export default UserList;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import User from './User';
import UserForm from './UserForm';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:8000/users');
        setUsers(response.data);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsEditing(true);
    };

    const handleDelete = async (userId) => {
        await axios.delete(`http://localhost:8000/users/${userId}`);
        fetchUsers();
    };

    const handleSave = () => {
        fetchUsers();
        setIsEditing(false);
        setSelectedUser(null);
    };

    return (
        <div>
            <h1>User List</h1>
            {isEditing && <UserForm user={selectedUser} onSave={handleSave} />}
            {!isEditing && (
                <div>
                    {users.map(user => (
                        <User key={user.id} user={user} onEdit={handleEdit} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserList;
