import {getCountFromServer, collection} from 'firebase/firestore'
import { useEffect, useState } from 'react';
import ResponseType from '../../types/ResponseType';
import { firestore } from '../../firebase';

type CountType = ResponseType<number>
const useCollectionCount = (col: string) => {
    const [state, setState] = useState<CountType>({loading: true, data: 0, error: false})
    useEffect(()=> {
        getCountFromServer(collection(firestore, col))
            .then(value=>setState({loading: false, data: value.data().count, error: false}))
            .catch(()=>setState({loading: false, data: 0, error: true}))
    },[])
    return state
}

export default useCollectionCount;
