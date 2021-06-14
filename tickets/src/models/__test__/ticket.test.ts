import { Ticket } from '../ticket';

it('implements optimistic concurrency control', async () => {
  //create an instance of a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 3,
    userId: '123',
  });

  //save to db
  await ticket.save();

  //fetch twice
  const ticketone = await Ticket.findById(ticket.id);
  const tickettwo = await Ticket.findById(ticket.id);

  //make two seperate changes to the tickets we fetched
  ticketone!.set({ price: 10 });
  tickettwo!.set({ price: 15 });

  //save the first fetched ticket
  await ticketone!.save();

  //save the second fetched ticket (should have outdated version)
  expect.assertions(1); // expect to get into the catch
  try {
    await tickettwo!.save();
  } catch (err) {
    expect(err).toBeDefined();
  }
});

it('increments version number when saved', async () => {
  //create an instance of a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 3,
    userId: '123',
  });

  //save to db
  await ticket.save();
  expect(ticket.version).toEqual(0);

  await ticket.save();
  expect(ticket.version).toEqual(1);

  await ticket.save();
  expect(ticket.version).toEqual(2);
});
