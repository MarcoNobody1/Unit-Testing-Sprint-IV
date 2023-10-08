const { Room, Booking } = require("./index.js");

describe("Is room occupied?", () => {
  test("isOccupied es false cuando la habitacion esta ocupada en una fecha dada", () => {
    const bookings = [
      { startDate: "2023-10-02", endDate: "2023-10-06" },
      { startDate: "2023-10-08", endDate: "2023-10-12" },
    ];

    const room1 = new Room("Room1", bookings, 150, 10);
    const isOccupied = room1.isOccupied("2023-10-05");
    expect(isOccupied).toBe(true);
  })

});
