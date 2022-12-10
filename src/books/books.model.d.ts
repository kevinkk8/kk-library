import { authorBookDTO, authorDTO } from "../author/author.model";
import { categDTO } from "../categories/categories.model";

export interface bookDTO {
    id: number,
    title: string,
    poster:string,
    description?:string,
    createdAt: Date,
    createdBy: string,
    categories: categDTO[],
    authors: authorBookDTO[],
    userVote: number,
    averageVote: number;
};

export interface bookCreationDTO {
    title: string,
    poster?:string,
    image?: File,
    imageURL?:string,
    description?:string,
    createdAt?: Date,
    createdBy?: string,
    author?: authorDTO[],
    authorsId?: number[];
    categoriesIds?: number[],
    authors?: authorBookDTO[];
};

export interface PageDTO {
    bestSellers?: bookDTO[];
    topBooks?: bookDTO[];
}

export interface bookPostGetDTO {
    categories: categDTO[];
}

export interface booksPutGetDTO {
    book: bookDTO,
    selectedCategories: categDTO[],
    nonSelectedCategories: categDTO[],
    authors: authorBookDTO[];
}