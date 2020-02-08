import React, { useState, useEffect } from 'react';
import './list.css';
import Loader from '../Loader/Loader';

const List = (props) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`https://randomuser.me/api/?page=${props.pageNo}&results=6`)
        .then(resp => resp.json())
        .then(data => {
            setUsers(users => [...users, ...data.results]);
            setLoading(false);
        })
        .catch(error => console.log("error: ", error))
    }, [props.pageNo])

    const deleteUser = (uuid) => {
        let userList = users.filter(user => (
            user.login.uuid !== uuid
        ));
        setUsers(userList);
    }
    return ( 
        <>
            {!loading ?
                <div>
                    {users.map(user => {
                        return (
                            <div
                                key={user.login.uuid}
                                className="usercard"
                                style={{ backgroundColor: user.gender === "female" ? '#de3d7b' : '#4356c4' }}>
                                <button className="link" onClick={() => deleteUser(user.login.uuid)}>x</button>
                                <img src={user.picture.large} alt="profile" className="profile" />
                                <span className="name">{user.name.first}  {user.name.last}</span>
                                <p>{user.email}</p>
                            </div>
                        )
                    })}
                </div> : <Loader/>}  
        </>
     );
}
 
export default List;