import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { categDTO } from "../categories/categories.model";
import { urlBooks } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import { convertBookToFormData } from "../utils/FormDataUtils";
import Loading from "../utils/Loading";
import BookForm from "./BookForm";
import { bookCreationDTO, bookPostGetDTO } from "./books.model";

export default function CreateBook(){
    const [nonSelectedCategories, setNonSelectedCategories] = useState<categDTO[]>([]);
    
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<string[]>([]);
    const history = useNavigate();

    useEffect(() => {
        axios.get(`${urlBooks}/postget`)
            .then((response: AxiosResponse<bookPostGetDTO>) => {
                setNonSelectedCategories(response.data.categories);
                setLoading(false);
            })
    }, [])

    async function create(book: bookCreationDTO){
        try{
            const formData = convertBookToFormData(book);
            const response = await axios({
                method: 'post',
                url: urlBooks,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            })
            
            history(`/book/${response.data}`);

        } catch(error){
            setErrors(error.response.data);
        }
    }

    return (
        <>
            <h3>Create Book</h3>
            <DisplayErrors errors={errors} />
            {loading ? <Loading /> :
                <BookForm model={{ title: '', createdBy: 'k' }}
                onSubmit={async values => {await create(values)}}
                nonSelectedCategories={nonSelectedCategories}
                selectedCategories={[]}
                selectedAuthors={[]} />}
        </>
    )
}