export interface AppIdType {
  id: string | number; // The default, flexible type that the host application will override
}
export type AppId = AppIdType['id'];

