import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";


export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

     // const ticketId = Number(req.query.ticketId);
  
    // if(!ticketId) return res.sendStatus(httpStatus.NOT_FOUND);
    try {

    const allHotels =   await hotelsService.getAllHotels(userId)
    return res.status(httpStatus.OK).send(allHotels);
        
    } catch (error) {
        
        if(error.name === "notFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
        
    }
    return res.sendStatus(httpStatus.PAYMENT_REQUIRED)

}

export async function getRooms(req: AuthenticatedRequest, res: Response) {

    const { userId } = req;
    const hotelId = Number(req.params.hotelId)

    try {

    const roomId =   await hotelsService.getRoomId(userId, hotelId)
    return res.status(httpStatus.OK).send(roomId);
        
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
 
}