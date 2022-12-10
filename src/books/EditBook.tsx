import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { urlBooks } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import { convertBookToFormData } from "../utils/FormDataUtils";
import Loading from "../utils/Loading";
import BookForm from "./BookForm"
import { bookCreationDTO, booksPutGetDTO } from "./books.model";

export default function EditBook(){
    
    const {id}: any = useParams();
    const [book, setBook] = useState<bookCreationDTO>();
    const [bookPutGet, setBookPutGet] = useState<booksPutGetDTO>();
    const history = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
        axios.get(`${urlBooks}/PutGet/${id}`)
            .then((response: AxiosResponse<booksPutGetDTO>) => {
                const model: bookCreationDTO = {
                    title: response.data.book.title,
                    imageURL: response.data.book.poster,
                    description: response.data.book.description,
                    createdAt: new Date(response.data.book.createdAt),
                    createdBy:'k'
                };

                setBook(model);
                setBookPutGet(response.data);
            })
    }, [id]);

    async function edit(bookToEdit: bookCreationDTO){
        try {
            const formData = convertBookToFormData(bookToEdit);
            await axios({
                method: 'put',
                url: `${urlBooks}/${id}`,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            });
            history(`/book/${id}`);
        }
        catch (error){
            setErrors(error.response.data);
        }
    }


    return (
        <>
            <h3>Edit Movie</h3>
            <DisplayErrors errors={errors} />
            {book && bookPutGet ? <BookForm model={book}
                onSubmit={async values => await edit(values)}
                nonSelectedCategories={bookPutGet.nonSelectedCategories}
                selectedCategories={bookPutGet.selectedCategories}
                selectedAuthors={bookPutGet.authors}

            /> : <Loading />}
        </>
    )
}


