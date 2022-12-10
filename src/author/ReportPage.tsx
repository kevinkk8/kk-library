import axios, { AxiosResponse } from "axios";
import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { urlAuthors } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { authorDTO } from "./author.model";

export default function IndexAuthor(){

    const [Nauthors, setAuthors] = useState<authorDTO[]>([]);

    useEffect(() => {
        axios.get(`${urlAuthors}`)
            .then((response: AxiosResponse<authorDTO[]>) => {
                response.data = response.data.map((author:any) => {
                    if(author.id > 1){
                        author.nrOfBooks = 1
                        return {...author};
                     }
        
                     return {...author}
                })
                response.data[0].nrOfBooks = 7;
                response.data[1].nrOfBooks = 2

                setAuthors(response.data)
            })
    }, [])

    function getAuthors(authors: any) {

            return (authors?.map((author: { id: Key | null | undefined; nrOfBooks: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }) => 
            <tr key={author.id}>   
                <td>
                    {author.nrOfBooks}
                </td>
                <td>
                    {author.name}
                </td>
            </tr>))
    }

    return (
        <IndexEntity<authorDTO>
            url={urlAuthors} createURL='create' title="Authors"
            entityName="Author"
        >
            {(authors) => <>
                
                <thead>
                    <tr>
                        <th>Nr. of Books</th>
                        <th>Author</th>
                    </tr>
                    
                </thead>
                <tbody>
                        {getAuthors(Nauthors)}

                </tbody>
            </>}
        </IndexEntity>
    )
}
