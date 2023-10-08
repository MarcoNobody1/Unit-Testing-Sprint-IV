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
      const startDate = new Date(this.bookings[i].startDate);
      const endDate = new Date(this.bookings[i].endDate);

      if (myDate >= startDate && myDate <= endDate) {
        return true;
      }
    }
    return false;
  }


}

class Booking {
  constructor(name, email, checkin, checkout, discount, room) {
    this.name = name;
    this.email = email;
    this.checkin = checkin;
    this.checkout = checkout;
    this.discount = discount;
    this.room = {
      name,
      rate,
      discount,
    };
  }
}

module.exports = {
  Room,
  Booking,
};
