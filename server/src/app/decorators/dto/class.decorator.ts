import 'reflect-metadata';
export const Dto = () => (constructor: any) => {
    Reflect.defineMetadata('dto', 'dto', constructor)
}
