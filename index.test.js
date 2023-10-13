const { Room, Booking } = require("./index.js");

describe("Tests para la clase de Room", () => {
  test("isOccupied es true cuando la habitacion esta ocupada en una fecha dada", () => {
    const room = {
      name: "Room1",
      rate: 15000,
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
      rate: 15000,
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
      rate: 15000,
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
    const isOccupied2 = room1.isOccupied(10);
    const isOccupied3 = room1.isOccupied("hola mundo");
    expect(typeof isOccupied).toBe("boolean");
    expect(typeof isOccupied2).toBe("boolean");
    expect(typeof isOccupied3).toBe("boolean");
  });
  test("occupancyPercentage devuelve 100 si todas las fechas pasadas al metodo están dentro del rango de bookings", () => {
    const room = {
      name: "Room1",
      rate: 15000,
      discount: 10,
    };

    const booking1 = new Booking(
      "booking 1",
      "bok@bok.es",
      "2023-09-01",
      "2023-09-15",
      10,
      room
    );

    const booking2 = new Booking(
      "booking 2",
      "bok2@bok.es",
      "2023-09-16",
      "2023-09-30",
      10,
      room
    );

    const bookings = [booking1, booking2];

    const room1 = new Room(room.name, bookings, room.rate, room.discount);
    const percentage = room1.occupancyPercentage("2023-09-01", "2023-09-30");

    expect(percentage).toBe(100);
  });
  test("occupancyPercentage devuelve un porcentaje exacto (36.9% en este caso) al porcentaje de ocupacion que tiene el rango de fechas que pasas al metodo", () => {
    const room = {
      name: "Room1",
      rate: 15000,
      discount: 10,
    };

    const booking1 = new Booking(
      "booking 1",
      "bok@bok.es",
      "2023-09-01",
      "2023-09-15",
      10,
      room
    );

    const booking2 = new Booking(
      "booking 2",
      "bok2@bok.es",
      "2023-09-16",
      "2023-09-30",
      10,
      room
    );

    const booking3 = new Booking(
      "booking 2",
      "bok2@bok.es",
      "2023-10-01",
      "2023-10-15",
      10,
      room
    );

    const bookings = [booking1, booking2, booking3];

    const room1 = new Room(room.name, bookings, room.rate, room.discount);
    const percentage = room1.occupancyPercentage("2023-08-01", "2023-11-30");

    expect(percentage).toBe(36.9);
  });
  test("occupancyPercentage devuelve 50 si si el rango de fechas pasadas al metodo ocupan el 50% de los bookings", () => {
    const room = {
      name: "Room1",
      rate: 15000,
      discount: 10,
    };

    const booking1 = new Booking(
      "booking 1",
      "bok@bok.es",
      "2023-09-01",
      "2023-09-15",
      10,
      room
    );

    const booking2 = new Booking(
      "booking 2",
      "bok2@bok.es",
      "2023-09-16",
      "2023-09-30",
      10,
      room
    );

    const bookings = [booking1, booking2];

    const room1 = new Room(room.name, bookings, room.rate, room.discount);
    const percentage = room1.occupancyPercentage("2023-09-01", "2023-10-30");

    expect(percentage).toBe(50);
  });
  test("occupancyPercentage devuelve 0 si todas las fechas pasadas al metodo no están dentro del rango de bookings", () => {
    const room = {
      name: "Room1",
      rate: 15000,
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
    const percentage = room1.occupancyPercentage("2023-10-16", "2023-10-25");

    expect(percentage).toBe(0);
  });
  test("occupancyPercentage devuelve 0 si las fechas pasadas al metodo son erroneas", () => {
    const room = {
      name: "Room1",
      rate: 15000,
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
    const percentage = room1.occupancyPercentage("2023-10-15", "2023-10-05");

    expect(percentage).toBe(0);
  });

  test("totalOccupancyPercentage devuelve 50 si las fechas pasadas al metodo ocupan el 50% del rango", () => {
    const roomA = {
      name: "roomA",
      rate: 15000,
      discount: 10,
    };

    const booking1 = new Booking(
      "booking 1",
      "bok@bok.es",
      "2023-09-01",
      "2023-09-06",
      10,
      roomA
    );

    const booking2 = new Booking(
      "booking 2",
      "bok2@bok.es",
      "2023-09-07",
      "2023-09-15",
      10,
      roomA
    );

    const bookingsA = [booking1, booking2];

    const roomB = {
      name: "roomB",
      rate: 15000,
      discount: 10,
    };

    const booking3 = new Booking(
      "booking 3",
      "bok@bok.es",
      "2023-09-16",
      "2023-09-22",
      10,
      roomB
    );

    const booking4 = new Booking(
      "booking 4",
      "bok2@bok.es",
      "2023-09-23",
      "2023-09-30",
      10,
      roomB
    );

    const bookingsB = [booking3, booking4];

    const room1 = new Room(roomA.name, bookingsA, roomA.rate, roomA.discount);
    const room2 = new Room(roomB.name, bookingsB, roomB.rate, roomB.discount);

    const roomArray = [room1, room2];

    const percentage = Room.totalOccupancyPercentage(
      roomArray,
      "2023-09-01",
      "2023-09-30"
    );

    expect(percentage).toBe(50);
  });
  test("totalOccupancyPercentage devuelve un porcentaje exacto (12.4% en este caso) al porcentaje de ocupacion total del rango de fechas pasadas", () => {
    const roomA = {
      name: "roomA",
      rate: 15000,
      discount: 10,
    };

    const booking1 = new Booking(
      "booking 1",
      "bok@bok.es",
      "2023-09-01",
      "2023-09-06",
      10,
      roomA
    );

    const booking2 = new Booking(
      "booking 2",
      "bok2@bok.es",
      "2023-09-07",
      "2023-09-15",
      10,
      roomA
    );

    const bookingsA = [booking1, booking2];

    const roomB = {
      name: "roomB",
      rate: 15000,
      discount: 10,
    };

    const booking3 = new Booking(
      "booking 3",
      "bok@bok.es",
      "2023-09-16",
      "2023-09-22",
      10,
      roomB
    );

    const booking4 = new Booking(
      "booking 4",
      "bok2@bok.es",
      "2023-09-23",
      "2023-09-30",
      10,
      roomB
    );

    const bookingsB = [booking3, booking4];

    const room1 = new Room(roomA.name, bookingsA, roomA.rate, roomA.discount);
    const room2 = new Room(roomB.name, bookingsB, roomB.rate, roomB.discount);

    const roomArray = [room1, room2];

    const percentage = Room.totalOccupancyPercentage(
      roomArray,
      "2023-09-01",
      "2023-12-30"
    );

    expect(percentage).toBe(12.4);
  });
  test("totalOccupancyPercentage devuelve 100 si las fechas pasadas al metodo ocupan el 100% del rango", () => {
    const roomA = {
      name: "roomA",
      rate: 15000,
      discount: 10,
    };

    const booking1 = new Booking(
      "booking 1",
      "bok@bok.es",
      "2023-09-01",
      "2023-09-06",
      10,
      roomA
    );

    const booking2 = new Booking(
      "booking 2",
      "bok2@bok.es",
      "2023-09-07",
      "2023-09-15",
      10,
      roomA
    );

    const bookingsA = [booking1, booking2];

    const roomB = {
      name: "roomB",
      rate: 15000,
      discount: 10,
    };

    const booking3 = new Booking(
      "booking 3",
      "bok@bok.es",
      "2023-09-01",
      "2023-09-06",
      10,
      roomB
    );

    const booking4 = new Booking(
      "booking 4",
      "bok2@bok.es",
      "2023-09-07",
      "2023-09-15",
      10,
      roomB
    );

    const bookingsB = [booking3, booking4];

    const room1 = new Room(roomA.name, bookingsA, roomA.rate, roomA.discount);
    const room2 = new Room(roomB.name, bookingsB, roomB.rate, roomB.discount);

    const roomArray = [room1, room2];

    const percentage = Room.totalOccupancyPercentage(
      roomArray,
      "2023-09-01",
      "2023-09-15"
    );

    expect(percentage).toBe(100);
  });
  test("totalOccupancyPercentage devuelve 0 si las fechas pasadas al metodo están fuera del rango", () => {
    const roomA = {
      name: "roomA",
      rate: 15000,
      discount: 10,
    };

    const booking1 = new Booking(
      "booking 1",
      "bok@bok.es",
      "2023-09-01",
      "2023-09-06",
      10,
      roomA
    );

    const booking2 = new Booking(
      "booking 2",
      "bok2@bok.es",
      "2023-09-07",
      "2023-09-15",
      10,
      roomA
    );

    const bookingsA = [booking1, booking2];

    const roomB = {
      name: "roomB",
      rate: 15000,
      discount: 10,
    };

    const booking3 = new Booking(
      "booking 3",
      "bok@bok.es",
      "2023-09-16",
      "2023-09-22",
      10,
      roomB
    );

    const booking4 = new Booking(
      "booking 4",
      "bok2@bok.es",
      "2023-09-23",
      "2023-09-30",
      10,
      roomB
    );

    const bookingsB = [booking3, booking4];

    const room1 = new Room(roomA.name, bookingsA, roomA.rate, roomA.discount);
    const room2 = new Room(roomB.name, bookingsB, roomB.rate, roomB.discount);

    const roomArray = [room1, room2];

    const percentage = Room.totalOccupancyPercentage(
      roomArray,
      "2023-10-01",
      "2023-10-15"
    );

    expect(percentage).toBe(0);
  });
  test("totalOccupancyPercentage devuelve 0 si los datos pasados son cualquier otro dato erroneo", () => {
    const fakeData = ["hola", "mundo"];

    const percentage = Room.totalOccupancyPercentage(fakeData, "hola", "mundo");
    const percentage1 = Room.totalOccupancyPercentage({}, [], "2023-10-15");
    const percentage2 = Room.totalOccupancyPercentage(
      "hola",
      "2023-10-15",
      "mundo"
    );
    const percentage3 = Room.totalOccupancyPercentage(
      fakeData,
      "2023-10-01",
      "2023-10-15"
    );

    expect(percentage).toBe(0);
    expect(percentage1).toBe(0);
    expect(percentage2).toBe(0);
    expect(percentage3).toBe(0);
  });
  test("availableRooms devuelve las rooms que están dentro del rango disponible", () => {
    const roomA = {
      name: "roomA",
      rate: 15000,
      discount: 10,
    };


    const booking1 = new Booking(
      "booking 1",
      "bok@bok.es",
      "2023-09-01",
      "2023-09-06",
      10,
      roomA
    );

    const booking2 = new Booking(
      "booking 2",
      "bok2@bok.es",
      "2023-09-08",
      "2023-09-09",
      10,
      roomA
    );

    const booking3 = new Booking(
      "booking 2",
      "bok2@bok.es",
      "2023-09-11",
      "2023-09-15",
      10,
      roomA
    );

    const bookingsA = [booking1, booking2, booking3];

    const roomB = {
      name: "roomB",
      rate: 15000,
      discount: 10,
    };

    const booking4 = new Booking(
      "booking 3",
      "bok@bok.es",
      "2023-09-15",
      "2023-09-22",
      10,
      roomB
    );

    const booking5 = new Booking(
      "booking 4",
      "bok2@bok.es",
      "2023-09-23",
      "2023-09-30",
      10,
      roomB
    );

    const bookingsB = [booking4, booking5];

    const room1 = new Room(roomA.name, bookingsA, roomA.rate, roomA.discount);
    const room2 = new Room(roomB.name, bookingsB, roomB.rate, roomB.discount);

    const roomArray = [room1, room2];

    const availables = Room.availableRooms(
      roomArray,
      "2023-09-07",
      "2023-09-10"
    );

    expect(availables).toEqual([room2]);
  });
  test("availableRooms devuelve todas las rooms si el rango que compruebas esta fuera de las reservas hechas", () => {
    const roomA = {
      name: "roomA",
      rate: 15000,
      discount: 10,
    };

    const booking1 = new Booking(
      "booking 1",
      "bok@bok.es",
      "2023-09-01",
      "2023-09-03",
      10,
      roomA
    );

    const booking2 = new Booking(
      "booking 2",
      "bok2@bok.es",
      "2023-09-04",
      "2023-09-08",
      10,
      roomA
    );

    const bookingsA = [booking1, booking2];

    const roomB = {
      name: "roomB",
      rate: 15000,
      discount: 10,
    };

    const booking3 = new Booking(
      "booking 3",
      "bok@bok.es",
      "2023-09-15",
      "2023-09-22",
      10,
      roomB
    );

    const booking4 = new Booking(
      "booking 4",
      "bok2@bok.es",
      "2023-09-23",
      "2023-09-30",
      10,
      roomB
    );

    const bookingsB = [booking3, booking4];

    const room1 = new Room(roomA.name, bookingsA, roomA.rate, roomA.discount);
    const room2 = new Room(roomB.name, bookingsB, roomB.rate, roomB.discount);

    const roomArray = [room1, room2];

    const availables = Room.availableRooms(
      roomArray,
      "2023-09-09",
      "2023-09-14"
    );

    expect(availables).toEqual([room1, room2]);
  });
  test("availableRooms no devuelve nada si en el rango de fechas las habitaciones estan ocupadas", () => {
    const roomA = {
      name: "roomA",
      rate: 15000,
      discount: 10,
    };

    const booking1 = new Booking(
      "booking 1",
      "bok@bok.es",
      "2023-09-01",
      "2023-09-03",
      10,
      roomA
    );

    const booking2 = new Booking(
      "booking 2",
      "bok2@bok.es",
      "2023-09-04",
      "2023-09-08",
      10,
      roomA
    );

    const bookingsA = [booking1, booking2];

    const roomB = {
      name: "roomB",
      rate: 15000,
      discount: 10,
    };

    const booking3 = new Booking(
      "booking 3",
      "bok@bok.es",
      "2023-09-15",
      "2023-09-22",
      10,
      roomB
    );

    const booking4 = new Booking(
      "booking 4",
      "bok2@bok.es",
      "2023-09-23",
      "2023-09-30",
      10,
      roomB
    );

    const bookingsB = [booking3, booking4];

    const room1 = new Room(roomA.name, bookingsA, roomA.rate, roomA.discount);
    const room2 = new Room(roomB.name, bookingsB, roomB.rate, roomB.discount);

    const roomArray = [room1, room2];

    const availables = Room.availableRooms(
      roomArray,
      "2023-09-01",
      "2023-09-30"
    );

    expect(availables).toEqual([]);
  });
  test("availableRooms devuelve el array de rooms entero si el rango de fechas pasado esta al reves, o es erroneo", () => {
    const roomA = {
      name: "roomA",
      rate: 15000,
      discount: 10,
    };

    const booking1 = new Booking(
      "booking 1",
      "bok@bok.es",
      "2023-09-01",
      "2023-09-03",
      10,
      roomA
    );

    const booking2 = new Booking(
      "booking 2",
      "bok2@bok.es",
      "2023-09-04",
      "2023-09-08",
      10,
      roomA
    );

    const bookingsA = [booking1, booking2];

    const roomB = {
      name: "roomB",
      rate: 15000,
      discount: 10,
    };

    const booking3 = new Booking(
      "booking 3",
      "bok@bok.es",
      "2023-09-15",
      "2023-09-22",
      10,
      roomB
    );

    const booking4 = new Booking(
      "booking 4",
      "bok2@bok.es",
      "2023-09-23",
      "2023-09-30",
      10,
      roomB
    );

    const bookingsB = [booking3, booking4];

    const room1 = new Room(roomA.name, bookingsA, roomA.rate, roomA.discount);
    const room2 = new Room(roomB.name, bookingsB, roomB.rate, roomB.discount);

    const roomArray = [room1, room2];

    const availables = Room.availableRooms(
      roomArray,
      "2023-12-30",
      "2023-06-01"
    );

    const availables2 = Room.availableRooms(roomArray, "hello", "world");

    expect(availables).toEqual([]);
    expect(availables2).toEqual([]);
  });
});

describe("Tests para la clase de Booking", () => {
  test("getFee devuelve una factura (en centimos) con los dos descuentos aplicados", () => {
    const room = {
      name: "Room1",
      rate: 15000,
      discount: 10,
    };

    const booking = new Booking(
      "Booking1",
      "bok@bok.es",
      "2023-10-01",
      "2023-10-06",
      10,
      room
    );

    const realFee = booking.getFee();

    expect(realFee).toBe(12150);
  });

  test("getFee devuelve una factura (en centimos) con solo el descuento de la room aplicado", () => {
    const room = {
      name: "Room1",
      rate: 15000,
      discount: 50,
    };

    const booking = new Booking(
      "Booking1",
      "bok@bok.es",
      "2023-10-01",
      "2023-10-06",
      0,
      room
    );

    const realFee = booking.getFee();

    expect(realFee).toBe(7500);
  });
  test("getFee devuelve una factura (en centimos) con solo el descuento del booking aplicado", () => {
    const room = {
      name: "Room1",
      rate: 15000,
      discount: 0,
    };

    const booking = new Booking(
      "Booking1",
      "bok@bok.es",
      "2023-10-01",
      "2023-10-06",
      25,
      room
    );

    const realFee = booking.getFee();

    expect(realFee).toBe(11250);
  });
  test("getFee devuelve siempre un numero", () => {
    const room = {
      name: "Room1",
      rate: 15000,
      discount: 100,
    };

    const booking = new Booking(
      "Booking1",
      "bok@bok.es",
      "2023-10-01",
      "2023-10-06",
      100,
      room
    );

    const room1 = {
      name: "Room1",
      rate: 15000,
      discount: "hello",
    };

    const booking1 = new Booking(
      "Booking1",
      "bok@bok.es",
      "2023-10-01",
      "2023-10-06",
      "world",
      room1
    );

    const realFee = booking.getFee();
    const realFee2 = booking1.getFee();

    expect(typeof realFee).toBe("number");
    expect(typeof realFee2).toBe("number");


  });
  test("getFee devuelve el precio original si los discounts aplicados no son numeros", () => {

    const room = {
      name: "Room1",
      rate: 15000,
      discount: "hello",
    };

    const booking = new Booking(
      "Booking1",
      "bok@bok.es",
      "2023-10-01",
      "2023-10-06",
      "world",
      room
    );

    const realFee = booking.getFee();

    expect(realFee).toBe(15000);
  });
});
