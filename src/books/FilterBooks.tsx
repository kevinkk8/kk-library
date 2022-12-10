import axios, { AxiosResponse } from "axios";
import { Field, Form, Formik } from "formik"
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { categDTO } from "../categories/categories.model";
import { urlBooks, urlCategories } from "../endpoints";
import Button from "../utils/Button";
import Pagination from "../utils/Pagination";
import BookList from "./BookList";
import { bookDTO } from "./books.model";

export default function FilterBooks(){
    
    const initialValues: filterBooksForm = {
        page:1,
        recordsPerPage: 10,
        title: '',
        categoryId: 0,
        BestSellers: false,
        TopBooks:false,
    }

    const [categories, setCategories] = useState<categDTO[]>([]);
    const [books, setBooks] = useState<bookDTO[]>([]);
    const history = useNavigate();
    const query = new URLSearchParams(useLocation().search);
    const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);

    useEffect(() => {

        if (query.get('title')){
            initialValues.title = query.get('title')!;
        }

        if (query.get('categoryId')){
            initialValues.categoryId = parseInt(query.get('categoryId')!, 10);
        }

        if (query.get('bestSellers')){
            initialValues.BestSellers = true;
        }

        if (query.get('topBooks')){
            initialValues.TopBooks = true;
        }

        if (query.get('page')){
            initialValues.page = parseInt(query.get('page')!, 10);
        }

        searchBooks(initialValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        axios.get(`${urlCategories}/all`)  
            .then((response: AxiosResponse<categDTO[]>) => {
                setCategories(response.data);
            })
    }, []);

    function searchBooks(values: filterBooksForm) {
        modifyURL(values);
        axios.get(`${urlBooks}/filter`, {params: values})
            .then((response: AxiosResponse<bookDTO[]>) => {
                const records = parseInt(response.headers['totalamountofrecords'] as string, 10);
                setTotalAmountOfPages(Math.ceil(records / values.recordsPerPage));
                setBooks(response.data);
            })
    }
    
    function modifyURL(values: filterBooksForm){
        const queryStrings: string[] = [];

        if (values.title){
            queryStrings.push(`title=${values.title}`);
        }

        if (values.categoryId !== 0){
            queryStrings.push(`categoryId=${values.categoryId}`);
        }

        if (values.BestSellers){
            queryStrings.push(`bestSellers=${values.BestSellers}`);
        }

        if (values.TopBooks){
            queryStrings.push(`topBooks=${values.TopBooks}`);
        }
    
        queryStrings.push(`page=${values.page}`);
        history(`/books/filter?${queryStrings.join('&')}`);
    }

    return (
        <>
            <h3>Filter Books</h3>
            <Formik initialValues={initialValues}
                onSubmit={values => {
                    values.page =1;
                    searchBooks(values)
                }}>
                
                {(formikProps)=> (
                    <><Form>
                        <div className="row gx-3 align-items-center">
                            <div className="col-auto">
                                <input type="text" className="form-control" id="title"
                                    placeholder="Book Title"
                                    {...formikProps.getFieldProps("title")} />
                            </div>
                            <div className="col-auto">
                                <select className="form-select"
                                    {...formikProps.getFieldProps("categoryId")}
                                >
                                    <option value="0">--Choose a category--</option>
                                    {categories.map(category => <option key={category.id}
                                        value={category.id}
                                    >{category.name}</option>)}
                                </select>
                            </div>
                            <div className="col-auto">
                                <div className="form-check">
                                    <Field className="form-check-input" id="topBooks"
                                        name="topBooks" type="checkbox" />
                                    <label className="form-check-label"
                                        htmlFor="topBooks">Top Books</label>
                                </div>
                            </div>
                            <div className="col-auto">
                            <div className="form-check">
                                    <Field className="form-check-input" id="bestSellers"
                                        name="bestSellers" type="checkbox" />
                                    <label className="form-check-label"
                                        htmlFor="bestSellers">Best Sellers</label>
                                </div>
                            </div>
                            <div className="col-auto">
                                <Button className="btn btn-primary"
                                    onClick={() => formikProps.submitForm()}
                                >Filter</Button>
                                <Button className="btn btn-danger ms-3"
                                    onClick={() => {
                                        formikProps.setValues(initialValues)
                                        searchBooks(initialValues);
                                    }}
                                >Clear</Button>
                            </div>
                        </div>
                    </Form><BookList books={books} />
                    
                    <Pagination 
                        totalAmountOfPages={totalAmountOfPages}
                        currentPage={formikProps.values.page}
                        onChange={newPage => {
                            formikProps.values.page = newPage;
                            searchBooks(formikProps.values)
                        }}
                        />
                    </>


                )}
            </Formik>
        </>
    )
}

interface filterBooksForm{
    page: number,
    recordsPerPage: number,
    title: string,
    categoryId: number,
    BestSellers: boolean,
    TopBooks: boolean
}