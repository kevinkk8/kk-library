//import { Typeahead } from '../utils/Typeahead'
import { authorBookDTO } from '../author/author.model'
import {  ReactElement, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { urlBooks } from '../endpoints';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';


export default function TypeAheadauthors(props: typeAheadauthorsProps) {

    const [authors, setAuthors] = useState<authorBookDTO[]>([]);
    const firstAuthor = authors[0];
    const [isLoading, setIsLoading] = useState(false);
    const selected: authorBookDTO[] = [];

    const [draggedElement, setDraggedElement] = useState<authorBookDTO | undefined>(undefined);

    function handleDragStart(author: authorBookDTO){
        setDraggedElement(author);
    }

    function handleDragOver(author: authorBookDTO){
        if (!draggedElement){
            return;
        }

        if (author.id !== draggedElement.id){
            const draggedElementIndex = props.authors.findIndex(x => x.id === draggedElement.id);
            const authorIndex = props.authors.findIndex(x => x.id === author.id);

            const authors = [...props.authors];
            authors[authorIndex] = draggedElement;
            authors[draggedElementIndex] = author;
            props.onAdd(authors);
        }
    }

    function handleSearch(query: string){
        setIsLoading(true);
        axios.get(`${urlBooks}/searchByName/${query}`)
        .then((response: AxiosResponse<authorBookDTO[]>) => {
            setAuthors(response.data);
            setIsLoading(false);
        })
    }

    return (
        <div className="mb-3">
            <label>{props.displayName}</label>
            <AsyncTypeahead 
                id="typeahead"
                onChange={(authors) => {
                    if (props.authors.findIndex(x => x.id === firstAuthor.id) === -1){
                        props.onAdd([...props.authors, firstAuthor]);
                    }}}
                options={authors}
                labelKey={(author: { name: any; }) => author.name }
                filterBy={() => true}
                isLoading={isLoading}
                onSearch={handleSearch}
                placeholder="Write the name of the author..."
                minLength={1}
                flip={true}
                selected={selected}
                renderMenuItemChildren={(author: { picture: string | undefined; name: string }) => (
                    <>
                        <img alt="author" src={author.picture} 
                            style={{
                                height: '64px',
                                marginRight: '10px',
                                width: '64px'
                            }}
                        />
                        <span>{author.name}</span>
                    </>
                )}
            />

            <ul className="list-group">
                {props.authors.map(author => 
                <li key={author.id}
                    draggable={true}
                    onDragStart={() => handleDragStart(author)}
                    onDragOver={() => handleDragOver(author)}
                    className="list-group-item list-group-item-action" >

                    {props.listUI(author)} 
                    <span className="badge badge-primary badge-pill pointer text-dark"
                    style={{marginLeft: '0.5rem'}}
                    onClick={() => props.onRemove(author)}
                    >X</span>
                    </li>)}
            </ul>

            
        </div>
    )
}



interface typeAheadauthorsProps {
    displayName: string;
    authors: authorBookDTO[];
    onAdd(authors: authorBookDTO[]): void;
    onRemove(author: authorBookDTO): void;
    listUI(author: authorBookDTO): ReactElement;
}