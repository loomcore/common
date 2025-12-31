export interface IAppIdType {
  id: string | number; // The default, flexible type that the host application will override
}
export type AppIdType = IAppIdType['id'];

