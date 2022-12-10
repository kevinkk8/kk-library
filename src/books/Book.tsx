import { bookDTO } from "./books.model";
import './Book.css'
import { Link } from "react-router-dom";


export default function IndividualBook(props: bookDTO){
    
    const bookLink = () => `/book/${props.id}`
    
    return (
        <div className="book">
            <Link to={bookLink()}>
                <img alt="cover" src={props.poster} height={'300px'} width={"225px"}/>
            </Link>
            <p>
                <Link to={bookLink()}>{props.title}</Link>
            </p>
            

        </div>
    );
}