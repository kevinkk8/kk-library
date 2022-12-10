import IndexUsers from "../../auth/IndexUsers";
import Login from "../../auth/Login";
import Register from "../../auth/Register";
import CreateAuthor from "../../author/CreateAuthor";
import EditAuthor from "../../author/EditAuthor";
import IndexAuthor from "../../author/IndexAuthor";
import ReportPage from "../../author/ReportPage";
import BookDetails from "../../books/BookDetails";
import CreateBook from "../../books/CreateBook";
import EditBook from "../../books/EditBook";
import FilterBooks from "../../books/FilterBooks";
import LandingPage from "../../books/LandingPage";
import CreateCategory from "../../categories/CreateCategory";
import EditCategory from "../../categories/EditCategory";
import IndexCategories from "../../categories/IndexCategories";
import RedirectToMainPage from "../RedirectToMainPage";

const routes = [
    {path: '/categories', component: IndexCategories, isAdmin:true},
    {path: '/categories/create', component: CreateCategory, isAdmin:true},
    {path: '/categories/edit/:id', component: EditCategory, isAdmin:true},

    {path: '/author', component: IndexAuthor, isAdmin:true},
    {path: '/author/create', component: CreateAuthor, isAdmin:true},
    {path: '/author/edit/:id', component: EditAuthor, isAdmin:true},

    {path: '/books/filter', component: FilterBooks},
    {path: '/books/create', component: CreateBook, isAdmin:true},
    {path: '/books/edit/:id', component: EditBook, isAdmin:true},
    {path: '/book/:id', component: BookDetails},

    {path: '/register', component: Register},
    {path: 'books/reportPage', component: ReportPage, isAdmin:true},
    {path: '/login', component: Login},
    {path: '/users', component: IndexUsers, isAdmin:true},
    {path: '/', component: LandingPage},
    {path: '*', component: RedirectToMainPage}
];

export default routes;