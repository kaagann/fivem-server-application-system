import React, { Children } from 'react';

import {Navigate} from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';
import { REDIRECT_PATH } from '../utils/routes';

const ProdectedRoute = ({children}) => {
    const {user} = UserAuth();

    if (!user) {
        return <Navigate to="/"></Navigate>
    }


    return children
}

export default ProdectedRoute