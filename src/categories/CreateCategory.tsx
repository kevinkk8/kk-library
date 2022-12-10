import axios from "axios";
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import { urlCategories } from "../endpoints";
import DisplayErrors from "../utils/DisplayErrors";
import { CategoryDTO } from "./categories.model";
import CategoriesForm from "./CategoriesForm";

export default function CreateCategory(){

    const history = useNavigate();
    const [errors, setErrors] = useState<string[]>([]);

    async function create(category : CategoryDTO){
        try{
            await axios.post(urlCategories, category);
            history('/categories')
        }
        catch(error){
            if (error & error.response){
                setErrors(error.response.data);
                }
        }
    }
    return (
        <>
            <h3>Create Category</h3>
            <DisplayErrors errors={errors} />
            <CategoriesForm model={{name: '', priority:'', createdAt: new Date(),
    createdBy:'Kevin'}} onSubmit={async value=>{
            await create(value)
        }} />
        </>
    )
}