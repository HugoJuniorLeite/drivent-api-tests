import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";


export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const ticketId = Number(req.query.ticketId);


    try {

    const allHotels =   await hotelsService.getAllHotels(userId, ticketId)
    return res.status(httpStatus.OK).send(allHotels);
        
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
 
}



export async function getRooms(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const ticketId = Number(req.query.ticketId);
    const hotelId = Number(req.params.hotelId)

    try {

    const roomId =   await hotelsService.getRoomId(userId, ticketId, hotelId)
    return res.status(httpStatus.OK).send(roomId);
        
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
 
}