import {useAppDispatch} from './index';
import {useEffect} from 'react';
import {set_selected_nav_item} from '../store/slice/navbar.slice';
import {LinkId} from '../types/links';

const useNavSelector = (id: LinkId) => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		dispatch(set_selected_nav_item(id))
	}, []);

}

export default useNavSelector;
