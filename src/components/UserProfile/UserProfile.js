import React from "react";
import UserHeader from "../UserHeader";
import UserRepoList from "../UserRepoList";
import "./UserProfile.css";


const UserProfile = () => {
    const profile = {
        'login': 'd-esposito',
        'html_url': 'https://github.com/d-esposito/',
        'avatar_url': 'https://avatars.githubusercontent.com/u/55059460?v=4'
    };

    return (
        <div className="profileContainer">
            <UserHeader profile={profile}/>
            <UserRepoList username={profile.login}/>
        </div>
    );
};

export default UserProfile;