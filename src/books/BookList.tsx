import IndividualBook from "./Book";
import { bookDTO} from "./books.model";
import './BookList.scss';
import GenericList from "../utils/GenericListComponent";

export default function BookList(props: bookListProps) {
    return(
        <GenericList list={props.books}>
                <div className="list">
                    {props.books?.map(book => <IndividualBook {...book} key={book.id} />)}
                </div>
        </GenericList>  );
    
}

interface bookListProps {
    books?: bookDTO[];
}