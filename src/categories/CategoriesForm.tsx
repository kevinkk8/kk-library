import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import Button from "../utils/Button";
import * as Yup from 'yup';
import TextField from "../forms/TextField";
import { CategoryDTO } from "./categories.model";

export default function CategoriesForm(props: categoryProps){
    return (
        <Formik initialValues={props.model}
        onSubmit={props.onSubmit}
        
        validationSchema={Yup.object({
            name: Yup.string().required('This field is required').firstLetterUppercase()
        })}
        
        >
            {(formikProps) => (
                <Form>
                    <TextField field="name" displayName="Name"/>
                    
                    <TextField field="priority" displayName="Priority"/>
                    <Button disabled ={formikProps.isSubmitting} type="submit" >Save</Button>
                    <Link className="btn btn-secondary" to='/categories'>Cancel</Link>
                </Form>
            )}
        
        </Formik>
    )
}

interface categoryProps {
    model: CategoryDTO,
    onSubmit(values:  CategoryDTO, action: FormikHelpers<CategoryDTO>): void
}