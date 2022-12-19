import {useEffect, useState} from 'react';
import {doc, getDoc, DocumentData} from 'firebase/firestore'
import {firestore} from '../../firebase';
import ResponseType from '../../types/ResponseType';


type ResType = ResponseType<null | DocumentData>
const useGetByDocId = (docId: string): ResType => {

    const [state, setState] = useState<ResType>({loading: true, error: false, data: null})

    useEffect(() => {
        const docRef = doc(firestore, 'members/' + docId)

        getDoc(docRef).then(res => {
            let data = null
            if (res.exists()) {
                data = res.data()
            }

            setState({loading: false, data, error: false})
        })
    }, [])
    return state;
}

export default useGetByDocId;
