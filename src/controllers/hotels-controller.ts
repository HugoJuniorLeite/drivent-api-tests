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
    return res.sendStatus(httpStatus.BAD_REQUEST);
}