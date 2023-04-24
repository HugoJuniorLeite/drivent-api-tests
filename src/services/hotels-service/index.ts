import hotelsRepository from '@/repositories/hotels-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { notFoundError } from '@/errors';
import { paymentRequired } from '@/errors/payment-required-erro';
import enrollmentRepository from '@/repositories/enrollment-repository';

async function getAllHotels(userId: number) {
  const enrollmentId = await enrollmentRepository.findEnrollment(+userId);
  if (!enrollmentId) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollmentId.id);
  if (!ticket || !userId) throw notFoundError();

  if (ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel)
    throw paymentRequired();

  const result = await hotelsRepository.getAllHotels();
  if (!result) throw notFoundError();
  return result;
}

async function getRoomId(userId: number, hotelId: number) {
  const enrollmentId = await enrollmentRepository.findEnrollment(+userId);
  if (!enrollmentId) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollmentId.id);
  if (!ticket || !userId) throw notFoundError();

  if (ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel)
    throw paymentRequired();

  const result = await hotelsRepository.getRoomId(hotelId);
  if (!result) throw notFoundError();
  return result;
}

export default {
  getAllHotels,
  getRoomId,
};
