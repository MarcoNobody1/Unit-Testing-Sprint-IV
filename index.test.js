const { Room, Booking } = require("./index.js");

describe("Tests para la clase de Room", () => {
  test("isOccupied es true cuando la habitacion esta ocupada en una fecha dada", () => {
    const room = {
      name: "Room1",
      rate: 150,
      discount: 10,
    };

    const booking1 = new Booking(
      "booking 1",
      "bok@bok.es",
      "2023-10-01",
      "2023-10-06",
      10,
      room
    );

    const booking2 = new Booking(
      "booking 2",
      "bok2@bok.es",
      "2023-10-07",
      "2023-10-15",
      10,
      room
    );

    const bookings = [booking1, booking2];

    const room1 = new Room(room.name, bookings, room.rate, room.discount);
    const isOccupied = room1.isOccupied("2023-10-05");
    expect(isOccupied).toBe(true);
  });
  test("isOccupied es false cuando la habitacion no esta ocupada en una fecha dada", () => {
    const room = {
      name: "Room1",
      rate: 150,
      discount: 10,
    };

    const booking1 = new Booking(
      "booking 1",
      "bok@bok.es",
      "2023-10-01",
      "2023-10-06",
      10,
      room
    );

    const booking2 = new Booking(
      "booking 2",
      "bok2@bok.es",
      "2023-10-07",
      "2023-10-15",
      10,
      room
    );

    const bookings = [booking1, booking2];

    const room1 = new Room(room.name, bookings, room.rate, room.discount);
    const isOccupied = room1.isOccupied("2023-10-17");
    expect(isOccupied).toBe(false);
  });
  test("isOccupied es booleano con cualquier dato", () => {
    const room = {
      name: "Room1",
      rate: 150,
      discount: 10,
    };

    const booking1 = new Booking(
      "booking 1",
      "bok@bok.es",
      "2023-10-01",
      "2023-10-06",
      10,
      room
    );

    const booking2 = new Booking(
      "booking 2",
      "bok2@bok.es",
      "2023-10-07",
      "2023-10-15",
      10,
      room
    );

    const bookings = [booking1, booking2];

    const room1 = new Room(room.name, bookings, room.rate, room.discount);
    const isOccupied = room1.isOccupied();
    const isOccupied2 = room1.isOccupied(3);
    const isOccupied3 = room1.isOccupied("hola buenas");
    expect(typeof isOccupied).toBe("boolean");
    expect(typeof isOccupied2).toBe("boolean");
    expect(typeof isOccupied3).toBe("boolean");
  });
  test("occupancyPercentage tiene que devolver 100 si todas las fechas pasadas al metodo están dentro del rango de bookings", () => {
    const room = {
        name: "Room1",
        rate: 150,
        discount: 10,
      };
  
      const booking1 = new Booking(
        "booking 1",
        "bok@bok.es",
        "2023-10-01",
        "2023-10-06",
        10,
        room
      );
  
      const booking2 = new Booking(
        "booking 2",
        "bok2@bok.es",
        "2023-10-07",
        "2023-10-15",
        10,
        room
      );
  
      const bookings = [booking1, booking2];

    const room1 = new Room("Room1", bookings, 150, 10);
    const percentage = room1.occupancyPercentage("2023-10-01", "2023-10-15");

    expect(percentage).toBe(100);
  });
});
