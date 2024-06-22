import React, { createContext } from 'react';
import { Octokit } from '@octokit/rest';


const OctokitContext = createContext();

const OctokitProvider = ({ children }) => {
    const octokit = new Octokit({
        auth: process.env.REACT_APP_ACCESS_TOKEN
    });

    return (
        <OctokitContext.Provider value={octokit}>
            {children}
        </OctokitContext.Provider>
    );
};

export { OctokitProvider, OctokitContext };