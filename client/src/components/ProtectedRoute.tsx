
import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import {useAuthState} from "../hooks/useAuthState";
import Spinner from "./Spinner";

/**
 * @desc confirm the url is active after register or login
 * @constructor
 */
const ProtectedRoute = () => {

	const {login, checkingStatus} = useAuthState();

	if (checkingStatus) {
		return <Spinner />
	}

	return login ? <Outlet /> : <Navigate to={'/login'} />
};

export default ProtectedRoute;
