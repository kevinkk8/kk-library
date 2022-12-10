import { ReactElement } from "react";
import Loading from "./Loading";

export default function GenericList(props: listProps){
    if(!props.list){
        if(props.loadingUI){
            return props.loadingUI;
        }
        return <Loading/>
    }
    else if (props.list.length === 0){
        if(props.emptyListUI){
            return props.emptyListUI;
        }
        return <>No books</>
    }
    else{
        return props.children;
    }
}

interface listProps {
    list: any;
    loadingUI?: ReactElement;
    emptyListUI?: ReactElement;
    children: ReactElement;
}