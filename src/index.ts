interface RoomInterface {
  name: string;
  bookings: Booking[];
  rate: number;
  discount: number;
}

class Room implements RoomInterface {
  name;
  bookings;
  rate;
  discount;

  constructor(
    name: string,
    bookings: Booking[],
    rate: number,
    discount: number
  ) {
    this.name = name;
    this.bookings = bookings;
    this.rate = rate;
    this.discount = discount;
  }
  isOccupied(date: string | Date): boolean {
    const myDate: Date = new Date(date);

    for (let i = 0; i < this.bookings.length; i++) {
      const startDate: Date = new Date(this.bookings[i].checkin);
      const endDate: Date = new Date(this.bookings[i].checkout);

      if (myDate >= startDate && myDate <= endDate) {
        return true;
      }
    }

    return false;
  }

  occupancyPercentage(startingDate: string | Date, endingDate: string | Date):number {
    const startDate = new Date(startingDate);
    const endDate = new Date(endingDate);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    let totalDaysInRange = 0;
    let occupiedDays = 0;

    for (
      let currentDate = startDate;
      currentDate <= endDate;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      totalDaysInRange++;

      let isOccupied = false;

      for (const booking of this.bookings) {
        const bookingStartDate = new Date(booking.checkin);
        const bookingEndDate = new Date(booking.checkout);
        bookingStartDate.setHours(0, 0, 0, 0);
        bookingEndDate.setHours(23, 59, 59, 999);

        if (currentDate >= bookingStartDate && currentDate <= bookingEndDate) {
          isOccupied = true;
          break;
        }
      }

      if (isOccupied) {
        occupiedDays++;
      }
    }

    if (totalDaysInRange === 0) {
      return 0;
    }

    const percentage = (occupiedDays / totalDaysInRange) * 100;

    return parseFloat(percentage.toFixed(1));
  }

  static totalOccupancyPercentage(rooms:Room[], startDate: string | Date, endDate: string | Date):number {
    if (
      !Array.isArray(rooms) ||
      rooms.every((room) => !(room instanceof Room))
    ) {
      return 0;
    }

    function countDays(startDate: Date, endDate: Date):number {
      const oneDay = 24 * 60 * 60 * 1000;
      return Math.round(Math.abs((startDate.getTime() - endDate.getTime()) / oneDay)) + 1;
    }

    let totalOccupiedDays = 0;
    let totalDaysInRange = countDays(new Date(startDate), new Date(endDate));

    if (totalDaysInRange === 0) {
      return 0;
    }

    rooms.forEach((room) => {
      totalOccupiedDays += room.occupancyPercentage(startDate, endDate);
    });

    const percentage = (totalOccupiedDays / rooms.length).toFixed(1);

    return parseFloat(percentage);
  }

  static availableRooms(rooms:Room[], startDate: string | Date, endDate: string | Date):Room[] | [] {
    let availableRooms:Room[] = [];
    const startingDate:Date = new Date(startDate);
    const endingDate:Date = new Date(endDate);

    if (
      startingDate > endingDate ||
      !startingDate ||
      !endingDate
    ) {
      return [];
    }

    for (const room of rooms) {
      let available:boolean = true;
      startingDate.setHours(0, 0, 0, 0);
      endingDate.setHours(23, 59, 59, 999);

      for (
        let currentDate:Date = startingDate;
        currentDate <= endingDate;
        currentDate.setDate(currentDate.getDate() + 1)
      ) {
        if (room.isOccupied(currentDate)) {
          available = false;
          break;
        }
      }

      if (available) {
        availableRooms.push(room);
      }
    }

    return availableRooms;
  }
}

interface BookingInterface {
  name: string;
  email: string;
  checkin: string | Date;
  checkout: string | Date;
  discount: number;
  room: Room;
}
class Booking implements BookingInterface {
  name;
  email;
  checkin;
  checkout;
  discount;
  room;

  constructor(
    name: string,
    email: string,
    checkin: string | Date,
    checkout: string | Date,
    discount: number,
    room: Room
  ) {
    this.name = name;
    this.email = email;
    this.checkin = checkin;
    this.checkout = checkout;
    this.discount = discount;
    this.room = room;
  }

  getFee() {
    const roomDiscount = this.room.discount / 100;
    const roomRate = this.room.rate;
    const bookingDiscount = this.discount / 100;

    if (
      typeof this.room.discount !== "number" ||
      typeof this.discount !== "number"
    ) {
      return roomRate;
    } else {
      const rateMinusRoomDiscount = roomRate - roomDiscount * roomRate;

      const realRate =
        rateMinusRoomDiscount - bookingDiscount * rateMinusRoomDiscount;

      return realRate;
    }
  }
}

module.exports = {
  Room,
  Booking,
};
