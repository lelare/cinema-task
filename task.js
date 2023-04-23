let seats = [
  { number: 1, type: 'R', reserved: false },
  { number: 2, type: 'R', reserved: false },
  { number: 3, type: 'R', reserved: false },
  { number: 4, type: 'RD', reserved: false },
  { number: 5, type: 'RD', reserved: false },
  { number: 6, type: 'R', reserved: false },
];

let request = ['R', 'R', 'R', 'R'];

let unreservedSeats;
let stopRecursion;
let output = [];

// get unreserved seats
function getUnreservedSeats(arr) {
  return arr.filter((ticket) => ticket.reserved === false);
}

// reserve the seat
function reserveSeat(seat, i) {
  seat.reserved = true;
  output.push({ [request[i]]: seat.number });
  request.splice(i, 1);
}

// reserve seats with unique ticket types
seats.forEach((seat) => {
  if (seat.type.length === 1) {
    let matchedIndex = request.findIndex((rE) => seat.type === rE);

    if (matchedIndex !== -1) {
      reserveSeat(seat, matchedIndex);
    }
  }
});
// =====================================

// get unreserved seats
unreservedSeats = getUnreservedSeats(seats);

function recursion() {
  stopRecursion = true;

  unreservedSeats.forEach((seat, i) => {
    // match seat type with request elements(unique) that are left
    let matched = [...new Set(request)].filter((r) => seat.type.includes(r));

    if (matched.length > 1) {
      // if there are more than 1 matched seat types, then skip this element and go to the next iteration
      // return to this element during recursion
      stopRecursion = false;
      return;
    } else if (matched.length === 1) {
      let index = request.findIndex((r) => seat.type.includes(r));
      reserveSeat(seat, index);
    }
  });

  if (request.length > 0 && !stopRecursion) {
    recursion();
  } else if (request.length > 0 && stopRecursion) {
    // if there is an element in request, which does not suit to available seats, set "ERROR" to output
    output = 'ERROR';
  }
}

if (request.length > 0) {
  recursion();
}

console.log(output);
