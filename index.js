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

    const totalDaysInRange = (endDate - startDate) / (24 * 60 * 60 * 1000) + 1;

    let occupiedDays = 0;

    
    for (let i = startDate; i <= endDate; i.setDate(i.getDate() + 1)) {
      if (this.isOccupied(i)) {
        occupiedDays++;
      }
    }

    const percentage = (occupiedDays / totalDaysInRange) * 100;
    
    return percentage;
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
