export const Controller = (path: string) => (constructor: any) => {
    if (!path.startsWith('/')) {
        path = '/' + path
    }
    Reflect.defineMetadata('path', path, constructor)
}
