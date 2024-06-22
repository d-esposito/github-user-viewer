import React, { useState, useContext, useEffect } from "react";
import UserHeader from "../UserHeader";
import UserRepoList from "../UserRepoList";
import { OctokitContext } from "../../contexts/OctokitContext";
import "./UserProfile.css";


const UserProfile = () => {
    const [profile, setProfile] = useState({});

    const octokit = useContext(OctokitContext);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await octokit.request("GET /users/torvalds");
                setProfile(data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, [octokit]);

    return (
        <div className="profileContainer">
            <UserHeader profile={profile}/>
            <UserRepoList username={profile.login}/>
        </div>
    );
};

export default UserProfile;