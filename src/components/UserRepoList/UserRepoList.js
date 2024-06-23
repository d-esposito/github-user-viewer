import React, { useState, useEffect, useContext, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { OctokitContext } from "../../contexts/OctokitContext";
import './UserRepoList.css';


const NUM_REPOS_PER_REQUEST = 30;

const UserRepoList = ({ username }) => {
    const [searchString, setSearchString] = useState("");
    const [page, setPage] = useState(1);
    const [hasMoreRepos, setHasMoreRepos] = useState(true);
    const [repos, setRepos] = useState([]);
    const [filteredRepos, setFilteredRepos] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const octokit = useContext(OctokitContext);

    const fetchRepos = useCallback(async () => {
        try {
            const { data } = await octokit.request(`GET /users/${username}/repos`, {
                per_page: NUM_REPOS_PER_REQUEST,
                page: page,
            });
            setRepos((currentRepos) => {
                const newRepos = data.filter(
                    (repo) => !currentRepos.some((r) => r.id === repo.id)
                );
                return [...currentRepos, ...newRepos];
            });

            if(data.length < NUM_REPOS_PER_REQUEST) {
                setHasMoreRepos(false);
            } else {
                setHasMoreRepos(true);
            }
        } catch (error) {
            setErrorMessage(`There was an error when retrieving the user's repos...`);
        }
    }, [octokit, username, page]);

    useEffect(() => {
        fetchRepos();
    }, [fetchRepos]);

    useEffect(() => {
        const filtered = repos.filter((repo) =>
            repo.name?.toLowerCase().includes(searchString.toLowerCase()) ||
            repo.description?.toLowerCase().includes(searchString.toLowerCase())
        );
        setFilteredRepos(filtered);
    }, [searchString, repos]);

    if (errorMessage) {
        return (<h2>{errorMessage}</h2>);
    }

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
                next={() => setPage((currentPage) => currentPage + 1)}
                hasMore={hasMoreRepos}
                loader={<h4>Loading...</h4>}
                scrollableTarget="repoListContainer"
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