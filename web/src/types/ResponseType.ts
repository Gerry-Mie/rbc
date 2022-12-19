import {DocumentData} from 'firebase/firestore'

interface ResponseType<T = DocumentData[]> {
    loading: boolean,
    error: boolean,
    data: T
}

export default ResponseType
