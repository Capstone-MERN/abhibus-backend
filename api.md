# API Documentation

Credits: Template used from https://diemas.notion.site/API-Template-89b5fd4ec70a433088c83bbb9ceab4c6

# 1. To fetch all Cities

## Description

This endpoint fetches all the cities where bus service is available.

## Endpoints

### `GET /cities`

Returns a list of all cities where the bus service is available. 

### Response

Returns a JSON object with the following properties:
- `status`: The HTTP status code of the response.
- `message`: A message describing the status.
- `data`: An object containing the following properties:
  - `count`: The total number of cities where the bus service is available.
  - `results`: An array of city objects, each with the following properties:
    - `id`: The unique identifier of the city.
    - `city`: The name of the city.
    - `pin_code`: The pin code of the city.
    - `state_name`: The name of the state.
    - `state_code`: The state code of the state.

### Example

Request:

```
GET /cities/
```

Response:
```json
{
    "status": 200,
    "message": "success",
    "data": {
        "count": 50,
        "results": [
            {
                "id": 1,
                "city": "Hyderabad",
                "pin_code": "500016",
                "state_name": "Telangana",
                "state_code": "TG"
            },
            {
                "id": 2,
                "city": "Bangalore",
                "pin_code": "560001",
                "state_name": "Karnataka",
                "state_code": "KA"
            },
            ...
        ]
    }
}


``` 

## Errors

This API uses the following error codes:

- `404 Not Found`: The requested resource was not found.
```json
{
    "status": 404,
    "message": "Not Found",
    "error": "The requested resource was not found."
}
```
- `500 Internal Server Error`: An unexpected error occurred on the server.
```json
{
    "status": 500,
    "message": "Internal Server Error",
    "error": "An unexpected error occurred on the server."
}
```


# 2. To fetch all available Tours

## Description

This endpoint fetches all the available tours on that particular date from city1 to city2. 

## Endpoints

### `GET /buses/:city1_id/:city2_id/:date`

Returns a list of all the buses from city1 to city2 on that particular date. 

### Parameters

- `city1_id` : id of the departure city. 
- `city2_id`: id of the destination city
- `date`: departure date in UTC format. 

### Response

Returns a JSON object with the following properties:
- `status`: The HTTP status code of the response.
- `message`: A message describing the status.
- `data`: An object containing the following properties:
  - `count`: The total number of buses/tours available from city1 to city2.
  - `results`: An JSON object with the following properties:
    - `tours`: An array of JSON objects of the available tours.
      - `id`: Unique identifier of the tour
      - `travelDate`: Date of travel in UTC format.
      - `busId`: ,
      - `prices`: An array of JSON objects
            - `seatNumber`: Unique Identifier for the seat.
            - `price`: Price of the seat.
      - `min_price`: //compute this in the backend
    - `boarding points` : Stop points of city1.
    - `dropping points` : Stop points of city2. 

### Example

Request:

```
GET /buses/:1/:2/:2024-05-14T00:00:00Z
```

Response:
```json

{
  "status": 200,
  "message": "Success",
  "data": {
    "count": 2,
    "results": {
      "tours": [
        {
          "id": "1231",
          "travelDate": "2024-05-14T08:00:00Z",
          "busId": "4561",
          "prices": [
            {
              "seatNumber": "A1",
              "price": 1000
            },
            {
              "seatNumber": "A2",
              "price": 1500
            }
          ],
          "min_price":1000
        },
        {
          "id": "1232",
          "travelDate": "2024-05-15T10:00:00Z",
          "busId": "4562",
          "prices": [
            {
              "seatNumber": "B1",
              "price": 1200
            },
            {
              "seatNumber": "B2",
              "price": 1800
            }
          ],
          "min_price":1200
        }
      ],
      "boarding points": [
        {
          "stop_name": "Haralur",
          "stopId" : 11,
          "arrivalTime": "2024-05-14T07:30:00Z"
        },
        {
          "stop_name": "Indranagar",
          "stopId" : 12,
          "arrivalTime": "2024-05-14T07:45:00Z"
        }
      ],
      "dropping points": [
        {
          "stop_name": "Ameerpet",
          "stopId" : 21,
          "arrivalTime": "2024-05-14T09:30:00Z"
        },
        {
          "stop_name": "Bharat Nagar",
          "stopId" : 22,
          "arrivalTime": "2024-05-14T09:45:00Z"
        }
      ]
    }
  }
}


``` 

## Errors

This API uses the following error codes:

- `404 Not Found`: The requested resource was not found.
```json
{
    "status": 404,
    "message": "Not Found",
    "error": "The requested resource was not found."
}
```
- `500 Internal Server Error`: An unexpected error occurred on the server.
```json
{
    "status": 500,
    "message": "Internal Server Error",
    "error": "An unexpected error occurred on the server."
}
```

# 3. To fetch Seat Layout

## Description

This API fetches the seat layout of a bus. 

## Endpoints

### `GET /seat_layout/:bus_id`

Returns the seat layout of the bus. 

### Parameters

- `bus_id`: Unique identifier of the bus.

### Response

Returns a JSON object with the following properties:

- `status`: The HTTP status code of the response.
- `message`: A message describing the status.
- `data`: An object with the property:
  - `seatLayout`: An object containing the layout of the bus seats.
    - `lower_deck`: An array of seat objects, each with the following properties:
      - `row`: The row number of the seat.
      - `column`: The column number of the seat.
      - `seatNumber`: The unique identifier of the seat.
      - `seatType`: The type of the seat.
      - `price`: The price of the seat.
    - `upper_deck`: An array of seat objects, each with the following properties:
      - `row`: The row number of the seat.
      - `column`: The column number of the seat.
      - `seatNumber`: The unique identifier of the seat.
      - `seatType`: The type of the seat.
      - `price`: The price of the seat.

### Example

Request:

```
GET /seat_layout/:4562
```

Response:
```json
{
  "status": 200,
  "message": "Success",
  "data": {
    "seatLayout": {
      "lower_deck": [
        {
          "row": 1,
          "column": 1,
          "seatNumber": "A1",
          "seatType": "SEATER",
          "price": 1000
        },
        {
          "row": 1,
          "column": 2,
          "seatNumber": "A2",
          "seatType": "SEMI-SEATER",
          "price": 1500
        }
      ],
      "upper_deck": [
        {
          "row": 2,
          "column": 1,
          "seatNumber": "B1",
          "seatType": "SEATER",
          "price": 1200
        },
        {
          "row": 2,
          "column": 2,
          "seatNumber": "B2",
          "seatType": "SLEEPER",
          "price": 1800
        }
      ]
    }
  }
}

``` 

## Errors

This API uses the following error codes:

- `404 Not Found`: The requested resource was not found.
```json
{
    "status": 404,
    "message": "Not Found",
    "error": "The requested resource was not found."
}
```
- `500 Internal Server Error`: An unexpected error occurred on the server.
```json
{
    "status": 500,
    "message": "Internal Server Error",
    "error": "An unexpected error occurred on the server."
}
```

# 5. To book the seats

## Description

This is the private endpoint to book the selected seats. 

## Endpoints

### `POST /book_seats/`

Books the selected seats for the user.  

#### Request Headers

- `Authorization`: `Bearer <your-jwt-token>` 

#### Request Body

The request body should be in JSON format and contain the following properties:

- `busId`: The unique identifier of the bus for which the booking is being made.
- `travelDate`: The date of travel in UTC format.
- `seatList`: An array of objects, each representing a seat to be booked with the following properties:
  - `seatNumber`: The unique identifier of the seat.
  - `price`: The price of the seat.

### Example

Request:

```
GET /book_seats/
```

```json
{
  "busId": "4562",
  "travelDate": "2024-05-14T08:00:00Z",
  "seatList": [
    {
      "seatNumber": "A1",
      "price": 1000
    },
    {
      "seatNumber": "A2",
      "price": 1500
    }
  ],
}
```

Response:
```json
{
  "status": 200,
  "message": "Booking successful",
  "data": {
    "bookingTime": "2024-05-14T08:00:00Z",
    "bookedSeats": [
      {
        "seatNumber": "LB1",
        "gender": "M",
        "name": "John Doe",
        "age": 25,
        "paidPrice": 1000
      },
      {
        "seatNumber": "LB3",
        "gender": "F",
        "name": "Jane Smith",
        "age": 25,
        "paidPrice": 1500
      }
    ],
    "tourId": 1232,
    "userId": 122
  }
}

``` 

## Errors

This API uses the following error codes:
- `401 Unauthorized` : The JWT Token is broken, expired or missing.

```json
{
    "status" : 401,
    "message" : "Unauthorized",
    "error": "JWT Token is invalid."
}
```
- `404 Not Found`: The requested resource was not found.
```json
{
    "status": 404,
    "message": "Not Found",
    "error": "The requested resource was not found."
}
```
- `500 Internal Server Error`: An unexpected error occurred on the server.
```json
{
    "status": 500,
    "message": "Internal Server Error",
    "error": "An unexpected error occurred on the server."
}
```

# 6. Signup 

## Description

This is an api to let the user sign up. 

## Endpoints

### `POST /signup`

### Request Body

- `username`: The unique username of the user.
- `password`: The password for the user account.
- `email`: The email address of the user.
- `name`: The full name of the user.


### Response
Returns a JSON object with the following properties:

- `status`: The HTTP status code of the response.
- `message`: A message describing the status.
- `data`: An object with the property:
  - `userId`: Unique identifier for the user.
  - `username`: User's unique username. 
  - `email`: Email of the user.
  - `name`: Name of the user

Request:
```
POST /signup
```
```json
{
  "username": "johndoe",
  "password": "securepassword123",
  "email": "johndoe@example.com",
  "name": "John Doe"
}
```
Response:

```json
{
  "status": 201,
  "message": "User successfully registered",
  "data": {
    "userId": "user123",
    "username": "johndoe",
    "email": "johndoe@example.com",
    "name": "John Doe"
  }
}
``` 

## Errors

- `404 Not Found`: The requested resource was not found.
```json
{
    "status": 404,
    "message": "Not Found",
    "error": "The requested resource was not found."
}
```
- `500 Internal Server Error`: An unexpected error occurred on the server.
```json
{
    "status": 500,
    "message": "Internal Server Error",
    "error": "An unexpected error occurred on the server."
}
```

# 7. Login 

## Description

This is an api to let the user login. 

## Endpoints

### `POST /login`

### Request Body

- `username`: The unique username of the user.
- `password`: The password for the user account.

### Response
Returns a JSON object with the following properties:

- `status`: The HTTP status code of the response.
- `message`: A message describing the status.
- `data`: An object with the property:
  - `token`: jwt token
  - `user`:
    - `userId`: Unique identifier for the user.
    - `username`: User's unique username. 
    - `email`: Email of the user.
    - `name`: Name of the user

Request:
```
POST /signup
```
```json
{
  "username": "johndoe",
  "password": "securepassword123",
}
```
Response:

```json
{
  "status": 200,
  "message": "Login successful",
  "data": {
    "token": "jwt-token",
    "user": {
      "userId": "user123",
      "username": "johndoe",
      "email": "johndoe@example.com",
      "name": "John Doe"
    }
  }
}

``` 

## Errors
- `401 Unauthorized`: The username or password is incorrect.
```json
{
  "status": 401,
  "message": "Unauthorized: Incorrect username or password"
}

```
- `404 Not Found`: The requested resource was not found.
```json
{
    "status": 404,
    "message": "Not Found",
    "error": "The requested resource was not found."
}
```
- `500 Internal Server Error`: An unexpected error occurred on the server.
```json
{
    "status": 500,
    "message": "Internal Server Error",
    "error": "An unexpected error occurred on the server."
}
```