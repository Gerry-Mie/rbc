import { CONTROLLER_METADATA_KEY_PATH } from '../../constants/decorator-metadata-key';

export const Controller = (path: string) => (constructor: any) => {
    if (!path.startsWith('/')) {
        path = '/' + path
    }
    Reflect.defineMetadata(CONTROLLER_METADATA_KEY_PATH, path, constructor)
}
