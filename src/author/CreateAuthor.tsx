import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { urlAuthors } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import { convertAuthorToFormData } from "../utils/FormDataUtils";
import { authorCreationDTO } from "./author.model";
import AuthorForm from "./authorForm"

export default function CreateAuthor(){

    const [errors, setErrors] = useState<string[]>([]);
    const history = useNavigate();

    async function create(author: authorCreationDTO){
        try{
            const formData = convertAuthorToFormData(author);

            await axios({
                method: 'post',
                url: urlAuthors,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            });
            history('/author');
        }
        catch (error){
            if (error && error.response){
                setErrors(error.response.data);
            }
        }
    }

    return (
        <>
            <h3>Create Author</h3>
            <DisplayErrors errors={errors} />
            <AuthorForm model={{name: '', dateOfBirth: undefined}}
                onSubmit={async values => await create(values)}
            />
        </>
    )
}


