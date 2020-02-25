import React, { useState, useEffect } from 'react';
import './list.css';
import Loader from '../Loader/Loader';

const List = () => {
    const [userDetails, setUserDetails] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [error, setError] = useState("")
    const [since, setSince] = useState(22020)

    useEffect(() => {
        async function getUsers() {
            let usersList = await fetch(`https://api.github.com/users?page=${page}&per_page=6&since=${since}`)
            .then(resp => resp.json())
            .then(data => {
                return data;
            })
                .catch(error => setError(error))
            
            await usersList.map(user => {
                return (
                    fetch(`https://api.github.com/users/${user.login}`)
                        .then(resp => resp.json())
                        .then(data => {
                            setUserDetails(userDetails => [...userDetails, data])
                        })
                        .catch(error => setError(error))
                )
            })
            setLoading(false);
        }
        getUsers();
    }, [page, since])

    const deleteUser = (id) => {
        let userList = userDetails.filter(user => (
            user.id !== id
        ));
        setUserDetails(userList);
    }
    return ( 
        <>
            {!loading ?
                (
                    !error ?
                    <div>
                        {userDetails.map(user => {
                            return (
                                <div
                                    key={user.id}
                                    className="usercard"
                                    style={{ backgroundColor: user.followers > 10 ? '#de3d7b' : '#4356c4' }}
                                >
                                    <button className="link" onClick={() => deleteUser(user.id)}>x</button>
                                    <span className="username name">{user.login}</span>
                                    <img src={user.avatar_url} alt="profile" className="profile" />
                                    <span className="name">{user.name ? user.name : "User"}</span>
                                    <div className="details">
                                        <span className="repo">Public Repos : {user.public_repos}</span>
                                        <span className="repo">Followers : {user.followers}</span>
                                        <span className="repo">Following : {user.following}</span>
                                    </div>      
                                    <a href={user.html_url} className="gitUrl">Check on Github</a>
                                </div>
                            )
                        })}
                            <button
                                onClick={() => {
                                    setPage(page + 1)
                                    setSince(since => since + 6)
                                }}
                                className="showMore">Show more</button>
                        </div> : <p>{error}</p>
                )
                 : <Loader />}  
        </>
     );
}
 
export default List;