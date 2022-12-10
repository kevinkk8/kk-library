import { urlAuthors } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import { convertAuthorToFormData } from "../utils/FormDataUtils";
import { authorCreationDTO, authorDTO } from "./author.model";
import AuthorForm from "./authorForm";

export default function EditAuthor(){

    function transform(author: authorDTO): authorCreationDTO {
        return {
            name: author.name,
            pictureUrl: author.picture,
            biography: author.biography,
            dateOfBirth: new Date(author.dateOfBirth)
        }
    }


    return (
        <EditEntity<authorCreationDTO, authorDTO> 
         url={urlAuthors} indexURL="/author" entityName="Author" 
         transformFormData={convertAuthorToFormData}
         transform={transform}
        >
            {(entity, edit) => 
                <AuthorForm 
                    model={entity}
                    onSubmit={async values => await edit(values)}
                />
            }
        </EditEntity>
    )
}