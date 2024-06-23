import React, { useState, useContext, useEffect } from "react";
import UserHeader from "../UserHeader";
import UserRepoList from "../UserRepoList";
import { OctokitContext } from "../../contexts/OctokitContext";
import "./UserProfile.css";


const UserProfile = () => {
    const [profile, setProfile] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);

    const octokit = useContext(OctokitContext);

    useEffect(() => {
        const path = window.location.pathname.slice(1);
        const username = path ? path.split('/')[0] : null;

        if (!username) {
            setErrorMessage('No username provided in the URL...');
        }

        const fetchProfile = async () => {
            try {
                const { data } = await octokit.request(`GET /users/${username}`);
                setProfile(data);
            } catch (error) {
                if (error.status === 404) {
                    setErrorMessage(`We couldn't find the user ${username}...`);
                } else if (error.status === 401) {
                    setErrorMessage('Looks like your provided access token is unauthorized...');
                } else {
                    setErrorMessage('There was an error making your request...');
                }
            }
        };

        fetchProfile();
    }, [octokit]);

    if (errorMessage) {
        return (
            <h2>{errorMessage}</h2>
        );
    }

    return (
        <div className="profileContainer">
            <UserHeader profile={profile} />
            <UserRepoList username={profile.login} />
        </div>
    );
};

export default UserProfile;