import { prisma } from "@/config";


async function getAllHotels() {

    return await prisma.hotel.findMany()
    
}


async function getRoomId(hotelId:number) {

    return prisma.hotel.findFirst({
        where: {
          id: hotelId,
        },
        include: {
          Rooms: true,
        }
      });
    
}

export default{
    getAllHotels,
    getRoomId

}