import prismaClient from "../../prisma";

interface ProductRequest{
    category_id: string;
}

class MontaCardapio{
    async execute({category_id}: ProductRequest){

        const montaCardapio = await prismaClient.product.findMany({
            where:{
                category_id: category_id
            }, orderBy: {
                name: 'asc',
            }
        })

        return montaCardapio;

    }
}

export {MontaCardapio}