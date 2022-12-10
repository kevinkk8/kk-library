export interface authorDTO{
    id: number;
    name: string;
    biography: string;
    dateOfBirth: Date;
    picture: string;
    nrOfBooks: number | 1;
}

export interface authorCreationDTO{
    name:string,
    dateOfBirth?:Date,
    picture?:File,
    pictureUrl?: string, //existing image
    biography?: string
}

export interface authorBookDTO{
    id:number;
    name:string;
    picture:string;
}