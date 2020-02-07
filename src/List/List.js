import React, { useState, useEffect } from 'react';
import './list.css';

const List = (props) => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(props.pageNo)

    useEffect(() => {
        fetch(`https://randomuser.me/api/?page=${page}&results=6`)
            .then(resp => resp.json())
            .then(data => {
                setUsers([...users, ...data.results]);
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
                                key={user.name.first}
                                className="usercard"
                                style={{ backgroundColor: user.gender === "female" ? '#de3d7b' : '#4356c4' }}>
                                <button className="link" onClick={() => deleteUser(user.login.uuid)}>x</button>
                                <img src={user.picture.large} alt="profile" className="profile" />
                                <span className="name">{user.name.first}  {user.name.last}</span>
                                <p>{user.email}</p>
                            </div>
                        )
                    })}
                </div> : <div>loading</div>}  
            {/* <button onClick={showMore} className="showMore">Show more</button> */}
        </>
     );
}
 
export default List;