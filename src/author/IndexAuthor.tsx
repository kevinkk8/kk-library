import { urlAuthors } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { authorDTO } from "./author.model";

export default function IndexAuthor(){
    return (
        <IndexEntity<authorDTO>
            url={urlAuthors} createURL='create' title="Authors"
            entityName="Author"
        >
            {(authors, buttons) => <>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {authors?.map(author => <tr key={author.id}>
                        <td>
                            {buttons(`edit/${author.id}`, author.id)}
                        </td>
                        <td>
                            {author.name}
                        </td>
                    </tr>)}
                </tbody>
            </>}
        </IndexEntity>
    )
}