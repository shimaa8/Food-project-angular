
export interface IUserTable {
    pageNumber: number,
    pageSize: number,
    totalNumberOfRecords: number,
    totalNumberOfPages: number
    data: IUser[]
}
export interface IUser {

    id: number;
    userName: string;
    email: string;
    country: string;
    phoneNumber: string;
    imagePath: string;
    group: IGroup;
    creationDate: string;
    modificationDate: string;


}

export interface IGroup {
    id: number;
    name: string;
    creationDate: string;
    modificationDate: string;

}