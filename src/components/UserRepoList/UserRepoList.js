import React, { useState, useEffect, useContext, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { OctokitContext } from "../../contexts/OctokitContext";
import star from '../../assets/star.svg';
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
            {
                filteredRepos.length === 0 ?
                (<h2>Couldn't find any repos</h2>) :
                (
                    <InfiniteScroll
                        dataLength={repos.length}
                        next={() => setPage((currentPage) => currentPage + 1)}
                        hasMore={hasMoreRepos}
                        loader={<h4>Loading...</h4>}
                        scrollableTarget="repoListContainer"
                    >
                    <ul>
                        {filteredRepos.map((repo) => (
                            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                <li key={repo.id}>
                                    <span><h4>{repo.name}</h4><h4><img src={star} alt="Stars" className="star" />: {repo.stargazers_count}</h4></span>
                                    <span><p>{repo.description}</p><code>{repo.language}</code></span>
                                </li>
                            </a>
                        ))}
                    </ul>
                </InfiniteScroll>)
            }
        </div>
    );
};

export default UserRepoList;