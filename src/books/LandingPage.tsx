import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { urlBooks } from "../endpoints";
import AlertContext from "../utils/AlertContext";
import BookList from "./BookList";
import { PageDTO } from "./books.model";

export default function LandingPage(){

  const [books, setBooks] = useState<PageDTO>({});

  useEffect(() => {
    loadData();
  });

  function loadData() {
    axios.get(urlBooks).then((response: AxiosResponse<PageDTO>) => {
      setBooks(response.data);
    })
  }
    return (
      <AlertContext.Provider value={() => {
        loadData();
      }}>

        <BookList books = {books.topBooks} />
        </AlertContext.Provider>
    )
}