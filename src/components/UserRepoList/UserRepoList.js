import React, { useState, useEffect, useContext, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { OctokitContext } from "../../contexts/OctokitContext";
import './UserRepoList.css';


const UserRepoList = ({ username }) => {
    const [searchString, setSearchString] = useState("");
    const [repos, setRepos] = useState([]);
    const [filteredRepos, setFilteredRepos] = useState([]);
    const octokit = useContext(OctokitContext);

    const fetchRepos = useCallback(async () => {
        const { data } = await octokit.request(`GET /users/${username}/repos`);
        setRepos(data);
    }, [octokit, username]);

    useEffect(() => {
        fetchRepos();
    }, [fetchRepos]);

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