const { Room, Booking } = require("./index.js");

describe("Is room occupied?", () => {
  test("isOccupied es true cuando la habitacion esta ocupada en una fecha dada", () => {
    const bookings = [
      { startDate: "2023-10-02", endDate: "2023-10-06" },
      { startDate: "2023-10-08", endDate: "2023-10-12" },
    ];

    const room1 = new Room("Room1", bookings, 150, 10);
    const isOccupied = room1.isOccupied("2023-10-05");
    expect(isOccupied).toBe(true);
  }),
    test("occupancyPercentage tiene que devolver 100 si todas las fechas pasadas al metodo están dentro del rango de bookings", () => {
      const bookings = [
        { startDate: "2023-10-01", endDate: "2023-10-07" },
        { startDate: "2023-10-08", endDate: "2023-10-15" },
      ];

      const room2 = new Room("Room2", bookings, 150, 10);
      const percentage = room2.occupancyPercentage("2023-10-01", "2023-10-15");

      expect(percentage).toBe(100);
    });
});
