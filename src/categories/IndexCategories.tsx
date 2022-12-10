import { urlCategories } from "../endpoints";
import IndexEntity from "../utils/IndexEntity";
import { categDTO } from "./categories.model";

export default function IndexCategories(){
    
    return (
        <>
            <IndexEntity<categDTO>
                url={urlCategories} createURL="create" title="Categories"
                entityName="Categoreis"
            >
                {(categories, buttons) =>
                    <>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories?.map(category =>
                                <tr key={category.id}>
                                    <td>
                                        {buttons(`edit/${category.id}`, category.id)}
                                    </td>
                                    <td>
                                        {category.name}
                                    </td>
                                </tr>)}
                        </tbody>
                    </>}

            </IndexEntity>
        </>
    )
}