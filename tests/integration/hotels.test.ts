import faker from '@faker-js/faker';
import { TicketStatus } from '@prisma/client';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import {
  createEnrollmentWithAddress,
  createUser,
  createTicketType,
  createTicket,
  createPayment,
  generateCreditCardData,
} from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import { prisma } from '@/config';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /hotels', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/hotels');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {

    it('should respond with status 404 when given ticket doesnt exist', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createEnrollmentWithAddress(user);

      const response = await server.get('/payments?ticketId=1').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

  //   it('should respond with status 404 when given ticket doesnt exist', async () => {
  //     const user = await createUser();
  //     const token = await generateValidToken(user);
  //     await createEnrollmentWithAddress(user);
  //    const ticketType = await createTicketType();

  //     const ticket = 0;


  // //    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

  //    const response = await server.get(`/payments?ticketId=0`).set('Authorization', `Bearer ${token}`);
     
  //     expect(response.status).toEqual(httpStatus.NOT_FOUND);
  //   });

    // it('should respond with status 401 when user doesnt own given ticket', async () => {
    //   const user = await createUser();
    //   const token = await generateValidToken(user);
    //   await createEnrollmentWithAddress(user);
    //   const ticketType = await createTicketType();

    //   const otherUser = await createUser();
    //   const otherUserEnrollment = await createEnrollmentWithAddress(otherUser);
    //   const ticket = await createTicket(otherUserEnrollment.id, ticketType.id, TicketStatus.RESERVED);

    //   const response = await server.get(`/payments?ticketId=${ticket.id}`).set('Authorization', `Bearer ${token}`);
    //   console.log(ticket)
    //   expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    // });

    it('should respond with status 402 when ticket is not paid', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketType();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

      const payment = await createPayment(ticket.id, ticketType.price);

      const response = await server.get(`/payments?ticketId=${ticket.id}`).set('Authorization', `Bearer ${token}`);


      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual({
        id: expect.any(Number),
        ticketId: ticket.id,
        value: ticketType.price,
        cardIssuer: payment.cardIssuer,
        cardLastDigits: payment.cardLastDigits,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      
      
      });

      
    });

    it('should respond with status 404 when user doesnt have an enrollment yet', async () => {
        const token = await generateValidToken();
  
        const response = await server.get('/tickets').set('Authorization', `Bearer ${token}`);
  
        expect(response.status).toEqual(httpStatus.NOT_FOUND);
      });
  
      it('should respond with status 404 when user doesnt have a ticket yet', async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        await createEnrollmentWithAddress(user);
  
        const response = await server.get('/tickets').set('Authorization', `Bearer ${token}`);
  
        expect(response.status).toEqual(httpStatus.NOT_FOUND);
      });
  
      


  });
});


