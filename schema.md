## Data for Bus Schema

```json
const busTypes = ["AC", "NON_AC"];
const seatTypes = ["SLEEPER", "SEATER", "SEMI_SLEEPER"];

[
  {
    "id": 1,
    "plateNumber": "ABC123",
    "busType": busTypes[0], // AC
    "seatLayout": {
      "lower_deck": [
        { "row": 1, "column": 1, "seatNumber": "1A", "seatType": seatTypes[0] },
        { "row": 1, "column": 2, "seatNumber": "1B", "seatType": seatTypes[1] },
        { "row": 2, "column": 1, "seatNumber": "2A", "seatType": seatTypes[2] },
        { "row": 2, "column": 2, "seatNumber": "2B", "seatType": seatTypes[0] }
      ],
      "upper_deck": []
    },
    "partner": "Orange Travels",
    "amenities": [
      { "icon": "wifi", "label": "WiFi Available" },
      { "icon": "charging", "label": "Charging Ports" }
    ]
  },
  {
    "id": 2,
    "plateNumber": "DEF456",
    "busType": busTypes[1], // NON_AC
    "seatLayout": {
      "lower_deck": [
        { "row": 1, "column": 1, "seatNumber": "1A", "seatType": seatTypes[1] },
        { "row": 1, "column": 2, "seatNumber": "1B", "seatType": seatTypes[1] },
        { "row": 2, "column": 1, "seatNumber": "2A", "seatType": seatTypes[0] },
        { "row": 2, "column": 2, "seatNumber": "2B", "seatType": seatTypes[2] }
      ],
      "upper_deck": [
        { "row": 1, "column": 1, "seatNumber": "1C", "seatType": seatTypes[0] },
        { "row": 1, "column": 2, "seatNumber": "1D", "seatType": seatTypes[1] },
        { "row": 2, "column": 1, "seatNumber": "2C", "seatType": seatTypes[2] },
        { "row": 2, "column": 2, "seatNumber": "2D", "seatType": seatTypes[0] }
      ]
    },
    "partner": "Verma Travels",
    "amenities": [
      { "icon": "wifi", "label": "WiFi Available" },
    ]
  },
  {
    "id": 3,
    "plateNumber": "CBA456",
    "busType": busTypes[0], //AC
    "seatLayout": {
      "lower_deck": [
        { "row": 1, "column": 1, "seatNumber": "1A", "seatType": seatTypes[1] },
        { "row": 1, "column": 2, "seatNumber": "1B", "seatType": seatTypes[1] },
        { "row": 2, "column": 1, "seatNumber": "2A", "seatType": seatTypes[0] },
        { "row": 2, "column": 2, "seatNumber": "2B", "seatType": seatTypes[2] }
      ],
      "upper_deck": [
        { "row": 1, "column": 1, "seatNumber": "1C", "seatType": seatTypes[0] },
        { "row": 1, "column": 2, "seatNumber": "1D", "seatType": seatTypes[1] },
        { "row": 2, "column": 1, "seatNumber": "2C", "seatType": seatTypes[2] },
        { "row": 2, "column": 2, "seatNumber": "2D", "seatType": seatTypes[0] }
      ]
    },
    "partner": "SM Travels",
    "amenities": [
      { "icon": "wifi", "label": "WiFi Available" },
    ]
  },
  {
    "id": 4,
    "plateNumber": "ZYZ321",
    "busType": busTypes[0], //AC
    "seatLayout": {
      "lower_deck": [
        { "row": 1, "column": 1, "seatNumber": "1A", "seatType": seatTypes[1] },
        { "row": 1, "column": 2, "seatNumber": "1B", "seatType": seatTypes[1] },
        { "row": 2, "column": 1, "seatNumber": "2A", "seatType": seatTypes[0] },
        { "row": 2, "column": 2, "seatNumber": "2B", "seatType": seatTypes[2] }
      ],
      "upper_deck": [
        { "row": 1, "column": 1, "seatNumber": "1C", "seatType": seatTypes[0] },
        { "row": 1, "column": 2, "seatNumber": "1D", "seatType": seatTypes[1] },
        { "row": 2, "column": 1, "seatNumber": "2C", "seatType": seatTypes[2] },
        { "row": 2, "column": 2, "seatNumber": "2D", "seatType": seatTypes[0] }
      ]
    },
    "partner": "A1 Travels",
    "amenities": [
      { "icon": "wifi", "label": "WiFi Available" },
    ]
  },
  {
    "id": 5,
    "plateNumber": "XY1234",
    "busType": busTypes[1], // NON_AC
    "seatLayout": {
      "lower_deck": [
        { "row": 1, "column": 1, "seatNumber": "1A", "seatType": seatTypes[1] },
        { "row": 1, "column": 2, "seatNumber": "1B", "seatType": seatTypes[1] },
        { "row": 2, "column": 1, "seatNumber": "2A", "seatType": seatTypes[0] },
        { "row": 2, "column": 2, "seatNumber": "2B", "seatType": seatTypes[2] }
      ],
      "upper_deck": [
        { "row": 1, "column": 1, "seatNumber": "1C", "seatType": seatTypes[0] },
        { "row": 1, "column": 2, "seatNumber": "1D", "seatType": seatTypes[1] },
        { "row": 2, "column": 1, "seatNumber": "2C", "seatType": seatTypes[2] },
        { "row": 2, "column": 2, "seatNumber": "2D", "seatType": seatTypes[0] }
      ]
    },
    "partner": "DS Travels",
    "amenities": [
      { "icon": "wifi", "label": "WiFi Available" },
    ]
  }

];
```

### Data for Cities

```javascript
[
  {
    id: 1,
    city: "Indore",
    pin_code: 10001,
    state_name: "MadhyaPradesh",
    state_code: "MP",
  },
  {
    id: 2,
    city: "Bhopal",
    pin_code: 10001,
    state_name: "MadhyaPradesh",
    state_code: "MP",
  },
  {
    id: 3,
    city: "Narmadapuram",
    pin_code: 10001,
    state_name: "MadhyaPradesh",
    state_code: "MP",
  },
  {
    id: 4,
    city: "Jabalpur",
    pin_code: 10001,
    state_name: "MadhyaPradesh",
    state_code: "MP",
  },
  {
    id: 5,
    city: "Hyderabad",
    pin_code: 10001,
    state_name: "Telangana",
    state_code: "NA",
  },
  {
    id: 6,
    city: "Bangalore",
    pin_code: 10001,
    state_name: "Karnataka",
    state_code: "KA",
  },
  {
    id: 7,
    city: "Chennai",
    pin_code: 10001,
    state_name: "Karnataka",
    state_code: "TN",
  },
  {
    id: 8,
    city: "Mumbai",
    pin_code: 10001,
    state_name: "Maharashtra",
    state_code: "MH",
  },
  {
    id: 9,
    city: "Pune",
    pin_code: 10001,
    state_name: "Maharashtra",
    state_code: "MH",
  },
  {
    id: 10,
    city: "Chandigarh",
    pin_code: 10001,
    state_name: "Punjab",
    state_code: "PB",
  },
  {
    id: 11,
    city: "Shimla",
    pin_code: 10001,
    state_name: "HimachalPradesh",
    state_code: "HP",
  },
];
```

### Data for TourPlace

```Javascript

const tourPlaces = [
  {
    cityId: 1,
    stops: [
      {
        stopId: 101,
        arrivalTime: 1621094400
      },
      {
        stopId: 102,
        arrivalTime: 1621101600
      },
      {
        stopId: 103,
        arrivalTime: 1621112400
      },
      {
        stopId: 104,
        arrivalTime: 1621112400
      },
      {
        stopId: 105,
        arrivalTime: 1621112400
      }
    ]
  },
  {
    cityId: 2,
    stops: [
      {
        stopId: 201,
        arrivalTime: 1621108800
      },
      {
        stopId: 202,
        arrivalTime: 1621119600
      },
      {
        stopId: 203,
        arrivalTime: 1621130400
      }
    ]
  },
  {
    cityId: 3,
    stops: [
      {
        stopId: 301,
        arrivalTime: 1621108800
      },
      {
        stopId: 302,
        arrivalTime: 1621119600
      },
      {
        stopId: 303,
        arrivalTime: 1621130400
      }
    ]
  },
  {
    cityId: 4,
    stops: [
      {
        stopId: 401,
        arrivalTime: 1621108800
      },
      {
        stopId: 402,
        arrivalTime: 1621119600
      },
      {
        stopId: 403,
        arrivalTime: 1621130400
      }
    ]
  },
  {
    cityId: 5,
    stops: [
      {
        stopId: 501,
        arrivalTime: 1621108800
      },
      {
        stopId: 502,
        arrivalTime: 1621119600
      },
      {
        stopId: 503,
        arrivalTime: 1621130400
      }
    ]
  },
  {
    cityId: 6,
    stops: [
      {
        stopId: 601,
        arrivalTime: 1621108800
      },
      {
        stopId: 602,
        arrivalTime: 1621119600
      },
      {
        stopId: 603,
        arrivalTime: 1621130400
      }
    ]
  },
  {
    cityId: 7,
    stops: [
      {
        stopId: 701,
        arrivalTime: 1621108800
      },
      {
        stopId: 702,
        arrivalTime: 1621119600
      },
      {
        stopId: 703,
        arrivalTime: 1621130400
      }
    ]
  },
  {
    cityId: 8,
    stops: [
      {
        stopId: 801,
        arrivalTime: 1621108800
      },
      {
        stopId: 802,
        arrivalTime: 1621119600
      },
      {
        stopId: 803,
        arrivalTime: 1621130400
      }
    ]
  },
  {
    cityId: 9,
    stops: [
      {
        stopId: 901,
        arrivalTime: 1621108800
      },
      {
        stopId: 902,
        arrivalTime: 1621119600
      },
      {
        stopId: 903,
        arrivalTime: 1621130400
      }
    ]
  },
  {
    cityId: 10,
    stops: [
      {
        stopId: 1001,
        arrivalTime: 1621108800
      },
      {
        stopId: 1002,
        arrivalTime: 1621119600
      },
      {
        stopId: 1003,
        arrivalTime: 1621130400
      }
    ]
  },
  {
    cityId: 11,
    stops: [
      {
        stopId: 1101,
        arrivalTime: 1621108800
      },
      {
        stopId: 1102,
        arrivalTime: 1621119600
      },
      {
        stopId: 1103,
        arrivalTime: 1621130400
      }
    ]
  },

];

module.exports = tourPlaces;

```
