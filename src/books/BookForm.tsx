import { Form, Formik, FormikHelpers } from "formik";
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import { categDTO } from "../categories/categories.model";
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import MultipleSelector, { multipleSelectorModel } from "../forms/MultipleSelector";
import TextField from "../forms/TextField";
import Button from "../utils/Button";
import { bookCreationDTO } from "./books.model";
import TypeAheadAuthors from "../forms/TypeAheadAuthor";
import { useState } from "react";
import { authorBookDTO } from "../author/author.model";
import MarkdownField from "../forms/MarkdownField";
import CheckboxField from "../forms/CheckboxField";

export default function BookForm(props: bookFormProps) {

    const [selectedCategories, setSelectedCategories] = useState(mapToModel(props.selectedCategories));
    const [nonSelectedCategories, setNonSelectedCategories] =
        useState(mapToModel(props.nonSelectedCategories));

    function mapToModel(items: { id: number, name: string }[]): multipleSelectorModel[] {
        return items.map(item => {
            return { key: item.id, value: item.name }
        })
    }

    const [selectedAuthors, setSelectedAuthors] = useState(props.selectedAuthors);

    return(
        <Formik 
        initialValues={props.model}
        onSubmit={(values, actions) => {
            values.categoriesIds = selectedCategories.map(item => item.key);
            values.authors = selectedAuthors;
            props.onSubmit(values, actions)}}
        validationSchema={Yup.object({
            title: Yup.string().required('This field is required').firstLetterUppercase()
        })} >

            {(formikProps) => (
                <Form>

                    <TextField displayName="Title" field="title" />
                    <CheckboxField displayName="Best Seller" field="bestSellers" />
                    <CheckboxField displayName="Top Book" field="topBooks" />
                    <DateField displayName="Release Date" field="releaseDate" />
                    <ImageField displayName="Poster" field="image"
                        imageURL={props.model.imageURL}
                    /> 

                    <MarkdownField displayName="description" field="description" />

                    <MultipleSelector
                        displayName="Categories"
                        nonSelected={nonSelectedCategories}
                        selected={selectedCategories}
                        onChange={(selected, nonSelected) => {
                            setSelectedCategories(selected);
                            setNonSelectedCategories(nonSelected);
                        }}
                    />

                    <TypeAheadAuthors displayName="Authors" authors={selectedAuthors} 
                    onAdd={Authors => {
                        setSelectedAuthors(Authors);
                     }}
                     onRemove={author => {
                        const authors = selectedAuthors.filter(x => x !== author);
                        setSelectedAuthors(authors);
                    }}
                    listUI={(author: authorBookDTO) => 
                        <>
                           {author.name} <span placeholder="Author" 
                               onChange={e => {
                                   const index = selectedAuthors.findIndex(x => x.id === author.id);
   
                                   const authors = [...selectedAuthors];
                                   authors[index].name = e.currentTarget.innerHTML ;
                                   setSelectedAuthors(authors);
                               }} />
                        </>
                       }

                    /> 

                    <Button disabled={formikProps.isSubmitting}
                        type='submit'>Save</Button>
                    <Link className="btn btn-secondary" to="/">Cancel</Link>

                </Form>
            )}           
        </Formik>
    )
}

interface bookFormProps {
    model: bookCreationDTO;
    onSubmit(values: bookCreationDTO, actions: FormikHelpers<bookCreationDTO>): void;
    selectedCategories: categDTO[];
    nonSelectedCategories: categDTO[];
    selectedAuthors: authorBookDTO[];
}
