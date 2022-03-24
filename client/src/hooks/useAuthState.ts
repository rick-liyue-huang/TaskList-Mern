
import {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../app/store";


/**
 * @desc confirm the client page can be active after register or login
 */
export const useAuthState = () => {
	const [login, setLogin] = useState(false);
	const [checkingStatus, setCheckingStatus] = useState(true);


	const {user} = useSelector((state: RootState) => state.auth);

	useEffect(() => {

		if (user) {
			setLogin(true);
		}
		else {
			setLogin(false)
		}
		setCheckingStatus(false);
	}, [user]);

	return {login, checkingStatus}
}


