import React from 'react';

const User = ({ user, onEdit, onDelete }) => {
    return (
        <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.dob}</p>
            <button onClick={() => onEdit(user)}>Edit</button>
            <button onClick={() => onDelete(user.id)}>Delete</button>
        </div>
    );
};

export default User;
