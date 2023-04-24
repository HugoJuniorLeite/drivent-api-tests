import { AuthenticatedRequest } from "@/middlewares";
import { InputHotelBody} from "@/protocols";
import hotelsService from "@/services/hotels-service";
import { error } from "console";
import { Response } from "express";
import httpStatus from "http-status";


export async function getAllHotels(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

     // const ticketId = Number(req.query.ticketId);
  
     if(!userId) return res.sendStatus(httpStatus.NOT_FOUND);
    try {

    const allHotels =   await hotelsService.getAllHotels(userId)
    if (!allHotels) {
        return res.sendStatus(httpStatus.NOT_FOUND)
    }
    return res.status(httpStatus.OK).send(allHotels);
        
    } catch (error) {

//        return res.sendStatus(httpStatus.NOT_FOUND);      
        if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
        if(error.name === "paymentRequired") return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }

    return res.sendStatus(httpStatus.PAYMENT_REQUIRED)

}

export async function getRooms(req: AuthenticatedRequest, res: Response) {

    const { userId } = req;
    const {hotelId} = req.params

    
    if(!hotelId){
        return res.sendStatus(httpStatus.NOT_FOUND)
    }

    try {

    const roomId =   await hotelsService.getRoomId(userId, +hotelId)
    return res.status(httpStatus.OK).send(roomId);
        
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
 
}