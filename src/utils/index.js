export { useAuth } from '../contexts'
export { useStore } from './store'

export { firebase, database, auth } from './firebase'
export { default as MediaService } from './media/MediaService'
export { trimWWWString, wait } from './functions'

export const truncate = (val, size) => val.length > size ? val.slice(0, size) + '...' : val
