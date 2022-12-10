import { urlCategories } from "../endpoints";
import EditEntity from "../utils/EditEntity";
import { CategoryDTO, categDTO } from "./categories.model";
import CategoriesForm from "./CategoriesForm";

export default function EditCategory(){
    return (
        <>
            <EditEntity<CategoryDTO, categDTO> 
                url={urlCategories} entityName="Categories"
                indexURL="/categories"
            >
                {(entity, edit) =>
                    <CategoriesForm model={entity}
                    onSubmit={async value => {
                        await edit(value);
                    }}
                />
                }
            </EditEntity>
        </>
    )
}