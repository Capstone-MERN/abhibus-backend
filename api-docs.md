# API docs for abhibus Backend

## Get all cities

- GET `/cities`

#### Response

```javascript
{
  cities: [
    {
      cityId: Number,
      cityName: String,
      state: String,
    },
  ];
}
```

## Fetch the tours

- POST `/tours`

#### Request

```javascript
{
    sourceCityId: Number,
    destinationCityId: Number,
    date: Number, // epoch time
}
```

#### Response

```javascript
{
    sourceCity: String,
    destinationCity: String,
    boardingPoints: [
        {
            stopId: Number,
            directions: String,
            name: String
        }
    ],
    droppingPoints: [
        {
            stopId: Number,
            directions: String,
            name: String
        }
    ],
    tours: [
        {
            busId: Number,
            tourId: Number,
            busType: String, // AC | NON-AC
            busPartner: String,
            amenities: [{ icon: String, label: String }],
            startTime: Number, // epoch time
            endTime: Number, // epoch time
            duration: String,
            availableSeats: Number,
            minPrice: Number,
            maxPrice: Number,
            sourceStops: [
                {
                    stopId: Number,
                    arrivalTime: Number // epoch time
                }
            ],
            destinationStops: [
                {
                    stopId: Number,
                    arrivalTime: Number // epoch time
                }
            ]
        }
    ]
}
```

source: B1, B2, B3, B4
destination: D1, D2, D3, D4

Bus1 : { B1, 8:45AM }, {B3, 10:30AM}, { B4, 11:00AM }

Bus2 : {B3: 4:30AM }, {B4 : 5:30AM}

## Get Seat layout

- GET `bus/layout?busId=2929&tourId=37388`

#### Response

```javascript
{
  layout: {
    upperDeck: [
      {
        row: Number,
        column: Number,
        seatNumber: String,
        seatType: String, // SEATER | SLEEPER | SEMI_SLEEPER
        gender?: "F" | "M",// only if the seat is booked
        price: Number,
      },
    ],
    lowerDeck: [
       {
        row: Number,
        column: Number,
        seatNumber: String,
        seatType: String, // SEATER | SLEEPER | SEMI_SLEEPER
        gender?: "F" | "M", // only if the seat is booked
        price: Number
      },
    ]
  }
}
```

#### Error

- When busId/tourId is invalid
- `404` Not found bus/tour.

## Booking

- Only loggedin users can perform this action.

- POST `/book`

#### Request Headers

```json
{
  "Authorization": "Bearer: ${token}"
}
```

#### Request Body

```javascript
{
    tourId: Number,
    seats: [
        {
            seatNumber: Number,
            name: String,
            gender: enum("M", "F"),
            age: Number
        }
    ]
}
```

### Errors

#### UnAuthorized `401`

```javascript
{
  message: "Unauthorized";
}
```

#### Tour not found `404`

```javascript
{
  message: "The tour is not found";
}
```

#### Seat is unavilable `400`

```javascript
{
  message: "One or more seats are unavilable";
}
```

If two users are booking concurrently.
t = 5s => Amith Booked UL1 seat
t = 6s => Dhruv trying book UL1, UL2, UL3 seat

## Signup

- POST `/auth/signup`

#### Request Body

```javascript
  {
    name: String,
    email: String,
    phoneNumber: String,
    gender: enum('M','F'),
    dob: Number,
    password:String
  }
```

#### Response

- Status code `201`

```javascript
{
  message: "Signup success";
}
```

### Error

#### Bad request `400`

```json
{
  "message": "Invalid request"
}
```

## Login

- POST `/auth/login`

#### Request Body

```javascript
{
  "email": String,
  "password": String
}
```

#### Response

- Status code `200`

```javascript
{
  message: "Login Successful",
  data: {
    token: String
  }
}
```

### Error

#### Bad request `400`

```json
{
  "message": "Invalid request"
}
```

#### UnAuthorized `401`

```javascript
{
  message: "Unauthorized";
}
```
