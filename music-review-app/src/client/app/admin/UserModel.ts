/*
    User Model which contains the structure of user object
*/
export interface UserModel{
    email:string
    role?:string,
    updated_date?: Date;
}