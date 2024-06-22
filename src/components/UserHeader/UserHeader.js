import React from "react";
import './UserHeader.css';


const UserHeader = ({ profile }) => {
    if (!profile) return null;

    return (
        <header className="profileHeader">
            <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
                <img src={profile.avatar_url} alt="User Profile" />
                <h2 className="username">{profile.login}</h2>
            </a>
        </header>
    );
};

export default UserHeader;