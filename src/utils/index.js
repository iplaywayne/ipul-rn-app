export { useAuth } from '../contexts'
export { useStore } from './store'

export { firebase, database, auth } from './firebase'
export { trimWWWString, wait } from './functions'

export const truncate = (val, size) => Object.keys(val).length > size ? val.slice(0, size) + '...' : val
