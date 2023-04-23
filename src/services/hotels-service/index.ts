import hotelsRepository from "@/repositories/hotels-repository";
//import paymentsService from "../payments-service";
import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError } from "@/errors";

import { paymentRequired } from "@/errors/payment-required-erro";
import enrollmentRepository from "@/repositories/enrollment-repository";
//import ticketService from "../tickets-service";




async function getAllHotels(userId:number) {

 const enrollmentId = await enrollmentRepository.findEnrollment(+userId)
 if (!enrollmentId) throw notFoundError();

// console.log(enrollmentId.id,"enrollmentId")

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollmentId.id)
  if (!ticket || !userId) throw notFoundError();

  if(ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel ) throw paymentRequired() 


//  const ticket = await ticketsRepository.findTickeyById(ticketId.id);
 
 
//   const ticketType = await ticketsRepository.ticketTypeId(ticket.ticketTypeId)

// if(ticketType.isRemote === true) throw paymentRequired() 

// if(ticketType.includesHotel === false) throw paymentRequired()

// const enrollment = await enrollmentRepository.findById(ticket.enrollmentId);
// if (!enrollment) throw notFoundError();
 
// if (enrollment.userId !== userId) throw unauthorizedError();  

    const result =  await hotelsRepository.getAllHotels()
    console.log(result, "resultttttttttttttt");
    
    if(!result) throw notFoundError();

 return result
}


async function getRoomId(userId:number, hotelId:number)  {

 
   const enrollmentId = await enrollmentRepository.findEnrollment(+userId)
   if (!enrollmentId) throw notFoundError();
  
  // console.log(enrollmentId.id,"enrollmentId")
  
    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollmentId.id)
    if (!ticket || !userId)  throw notFoundError();
  
    if(ticket.status === "RESERVED" || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel ) throw paymentRequired() 
  
   
       const result =  await hotelsRepository.getRoomId(hotelId)
    if(!result) throw notFoundError();
       
    return result
   }
export default{
    getAllHotels,
    getRoomId
}