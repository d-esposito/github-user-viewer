import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import './UserRepoList.css';


const UserRepoList = ({ username }) => {
    const [searchString, setSearchString] = useState("");
    const [repos, setRepos] = useState([{
                'id': 1,
                'name': 'hello-world',
                'description': 'This is your first repo!',
                'stargazers_count': 800,
                'language': 'JavaScript'
            },
            {
                'id': 2,
                'name': 'another-repo',
                'description': 'This is your second repo!',
                'stargazers_count': 790,
                'language': 'C#'
            },
            {
                'id': 3,
                'name': 'agi',
                'description': 'Taking over the world with this one',
                'stargazers_count': 666,
                'language': 'Just an actual Brain'
            },
            {
                'id': 4,
                'name': 'orva-app',
                'description': 'Stolen code (shh don\'t tell anyone)',
                'stargazers_count': 42,
                'language': 'Node.JS'
            }]);
    const [filteredRepos, setFilteredRepos] = useState([]);

    useEffect(() => {
        const filtered = repos.filter((repo) =>
            repo.name.toLowerCase().includes(searchString.toLowerCase()) ||
            repo.description.toLowerCase().includes(searchString.toLowerCase())
        );
        setFilteredRepos(filtered);
    }, [searchString, repos]);

    return (
        <div className="repoListContainer">
            <input
                type="text"
                placeholder="Search Repositories..."
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
            />
            <InfiniteScroll
                dataLength={repos.length}
                loader={<h4>Loading...</h4>}
            >
                <ul>
                    {filteredRepos.map((repo) => (
                        <li key={repo.id}>
                            <span><h4>{repo.name}</h4><h6>Stars: {repo.stargazers_count}</h6></span>
                            <span><p>{repo.description}</p><code>{repo.language}</code></span>
                        </li>
                    ))}
                </ul>
            </InfiniteScroll>
        </div>
    );
};

export default UserRepoList;