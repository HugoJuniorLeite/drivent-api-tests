import hotelsRepository from "@/repositories/hotels-repository";
import paymentsService from "../payments-service";




async function getAllHotels(userId:number, ticketId:number) {

 const isPayments = await paymentsService.getPaymentByTicketId(+ticketId, +userId) 
 const isTicket = await paymentsService.verifyTicketAndEnrollment(+ticketId, +userId)

    const result =  await hotelsRepository.getAllHotels()

    console.log(isPayments, "isPayments")
    console.log(isTicket, "isTicket")
    console.log(result, "result")
     
 return result
}



export default{

    getAllHotels
}