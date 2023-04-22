import { prisma } from "@/config";


async function getAllHotels() {

    return await prisma.hotel.findMany()
    
}


export default{
    getAllHotels,

}