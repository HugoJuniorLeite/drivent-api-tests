import { prisma } from "@/config";


async function getAllHotels() {

    return await prisma.hotel.findMany()
    
}


async function getRoomId(hotelId:number) {

    return await prisma.room.findMany({
        where: {hotelId: hotelId},
        include: {
            Hotel: true, //join
            
          }, 
    }
    )
    
}

export default{
    getAllHotels,
    getRoomId

}