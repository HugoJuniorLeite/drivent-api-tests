import hotelsRepository from "@/repositories/hotels-repository";
import paymentsService from "../payments-service";
import ticketsRepository from "@/repositories/tickets-repository";
import { notFoundError, unauthorizedError } from "@/errors";

import { paymentRequired } from "@/errors/payment-required-erro";
import enrollmentRepository from "@/repositories/enrollment-repository";
import { log } from "console";




async function getAllHotels(userId:number) {

console.log('aaaaaaaaaaa');

 //  const isTicket = await paymentsService.verifyTicketAndEnrollment(+ticketId, +userId)

const enrollmentId = await enrollmentRepository.findEnrollment(+userId)


const ticketId = await ticketsRepository.findTicketByEnrollmentId(enrollmentId.id)


 const ticket = await ticketsRepository.findTickeyById(ticketId.id);
 if (!ticket) throw notFoundError();
 
 if(ticket.status === "RESERVED" ) throw paymentRequired() 
 
  const ticketType = await ticketsRepository.ticketTypeId(ticket.ticketTypeId)

if(ticketType.isRemote === true) throw paymentRequired() 

if(ticketType.includesHotel === false) throw paymentRequired()

// const enrollment = await enrollmentRepository.findById(ticket.enrollmentId);
// if (!enrollment) throw notFoundError();

// if (enrollment.userId !== userId) throw unauthorizedError();  



  // const isPayments = await paymentsService.getPaymentByTicketId(+ticketId, +userId) 
   

    const result =  await hotelsRepository.getAllHotels()

 //   console.log(isPayments, "isPayments")
   // console.log(isTicket, "isTicket")
  //  console.log(result, "result")
     
 return result
}


async function getRoomId(userId:number, ticketId:number, hotelId:number)  {

    const isPayments = await paymentsService.getPaymentByTicketId(+ticketId, +userId) 
    const isTicket = await paymentsService.verifyTicketAndEnrollment(+ticketId, +userId)
   
    
       const result =  await hotelsRepository.getRoomId(hotelId)
   
       console.log(isPayments, "isPayments")
       console.log(isTicket, "isTicket")
       console.log(result, "result")
        
    return result
   }


export default{

    getAllHotels,
    getRoomId
}