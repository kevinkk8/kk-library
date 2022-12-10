import axios, { AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { urlBooks, urlRatings } from "../endpoints";
import Loading from "../utils/Loading";
import { bookDTO } from "./books.model";
import Button from "../utils/Button";
import customConfirm from "../utils/customConfirm";
import AlertContext from "../utils/AlertContext";
import Authorized from "../auth/Authorized";
import Ratings from "../utils/Ratings";
import Swal from "sweetalert2";

export default function BookDetails(){
    const { id }: any = useParams();
    const [book, setBook] = useState<bookDTO>();
    const customAlert = useContext(AlertContext);

    useEffect(() => {
        axios.get(`${urlBooks}/${id}`)
            .then((response: AxiosResponse<bookDTO>) => {
                response.data.createdAt = new Date(response.data.createdAt);
                setBook(response.data);
            })
    }, [id])


    function deleteBook(){
        axios.delete(`${urlBooks}/${id}`)
            .then(() => {
                customAlert();
            });
    }

    function handleRate(rate: number) {
        axios.post(urlRatings, { rating: rate, movieId: id }).then(() => {
            Swal.fire({ icon: 'success', title: 'Rating received' });
        })
    }

    return (
        book ? <div>
        <h2>{book.title} ({book.createdAt.getFullYear()})</h2>
        {book.categories?.map(category =>
            <Link key={category.id} style={{ marginRight: '5px' }}
                className="btn btn-primary btn-sm rounded-pill"
                to={`/books/filter?categoryId=${category.id}`}
            >{category.name}</Link>
        )} | {book.createdAt.toDateString()} 
           | Rating: <Ratings maximumValue={5} selectedValue={book.userVote} onChange={handleRate} />
            | Average Vote: {book.averageVote}
            <Authorized role="admin" authorized={<>
            
            <Link style={{ marginRight: '2rem', marginLeft: '75%' }} className="btn btn-info"
                to={`/books/edit/${book.id}`}
            >Edit</Link>
            <Button
            onClick={() => customConfirm(() => deleteBook())}
            className="btn btn-danger"
            ><Link to={'/'} >Delete</Link></Button>
        </>} />
        <div style={{ display: 'flex', marginTop: '1rem' }}>
            <span style={{ display: 'inline-block', marginRight: '1rem' }}>
                
                <img src={book.poster}
                    style={{ width: '225px', height: '315px' }}
                    alt="cover"
                />
            </span>
        </div> 

        {book.description ? <div style={{ marginTop: '1rem' }}>
            <h3>Description</h3>
            <div>
                <ReactMarkdown>{book.description}</ReactMarkdown>
            </div>
        </div> : null}

        {book.authors && book.authors.length > 0 ?
                <div style={{ marginTop: '1rem' }}>
                    <h3>Actors</h3>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {book.authors?.map(author =>
                            <div key={author.id} style={{ marginBottom: '2px' }}>
                                <img alt="pic" src={author.picture}
                                    style={{ width: '50px', verticalAlign: 'middle' }}
                                />
                                <span style={{
                                    display: 'inline-block',
                                    width: '200px',
                                    marginLeft: '1rem'
                                }}>{author.name}</span>
                                <span style={{
                                    display: 'inline-block',
                                    width: '45px'
                                }}>...</span>
                            </div>
                        )}
                    </div>
                </div> : null
            }

            
            
        
        </div> : <Loading />
    )
}