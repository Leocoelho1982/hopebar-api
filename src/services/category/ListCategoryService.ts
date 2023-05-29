import prismaClient from "../../prisma";

class ListCategoryService{
    async execute(){
        const category = await prismaClient.category.findMany({
            select:{
                id: true,
                name: true,
            }, orderBy: {
                name: 'asc', 
            }
        })

        return category;

    }

}

export {ListCategoryService}