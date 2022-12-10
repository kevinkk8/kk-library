import { authorCreationDTO } from "../author/author.model";
import { bookCreationDTO } from "../books/books.model";

export function convertAuthorToFormData(author: authorCreationDTO): FormData{
    const formData = new FormData();

    formData.append('name', author.name);

    if (author.biography){
        formData.append('biography', author.biography);
    }

    if (author.dateOfBirth){
        formData.append('dateOfBirth', formatDate(author.dateOfBirth))
    }

    if (author.picture){
        formData.append('picture', author.picture);
    }

    return formData;
}

export function convertBookToFormData(book: bookCreationDTO){
    const formData = new FormData();

    formData.append('title', book.title);

    if (book.description){
        formData.append('description', book.description);
    }

    if (book.createdAt){
        formData.append('createdAt', formatDate(book.createdAt));
    }

    if (book.createdBy){
        formData.append('createdBy', book.createdBy);
    }

    if (book.image){
        formData.append('poster', book.image);
    }

    formData.append('categoriesId', JSON.stringify(book.categoriesIds));
    formData.append('authors', JSON.stringify(book.authors));

    return formData;
}

function formatDate(date: Date){
    date = new Date(date);
    const format = new Intl.DateTimeFormat("en", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const [
        {value: month},,
        {value: day},,
        {value: year}
    ] = format.formatToParts(date);

    return `${year}-${month}-${day}`;
}