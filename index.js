class Room {
  constructor(name, bookings, rate, discount) {
    this.name = name;
    this.bookings = bookings;
    this.rate = rate;
    this.discount = discount;
  }
  isOccupied(date) {
    const myDate = new Date(date);

    for (let i = 0; i < this.bookings.length; i++) {
      const startDate = new Date(this.bookings[i].checkin);
      const endDate = new Date(this.bookings[i].checkout);

      if (myDate >= startDate && myDate <= endDate) {
        return true;
      }
    }

    return false;
  }

  occupancyPercentage(startingDate, endingDate) {
    const startDate = new Date(startingDate);
    const endDate = new Date(endingDate);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    let totalDaysInRange = 0;
    let occupiedDays = 0;

    for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
        
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


}

class Booking {
  constructor(name, email, checkin, checkout, discount, room) {
    this.name = name;
    this.email = email;
    this.checkin = checkin;
    this.checkout = checkout;
    this.discount = discount;
    this.room = room;
  }
}

module.exports = {
  Room,
  Booking,
};
