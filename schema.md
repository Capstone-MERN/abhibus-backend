## Schema designs

### Users

```javascript
{
    id: Number,
    email: String,
    gender: enum("M", "F"),
    phoneNumber: String,
    name: String,
    dob: Number, // epoch time.
    password: String // Hashed password.
}
```

### City

```javascript
{
    id: Number, // unique
    city: String,
    state: String,
    stateCode: String,
    pincode: Number,
    stops: [
        {
            stopId: Number, // unique
            directions: String,
            name: String,
            latitude: Number,
            longitude: Number
        }
    ]
}
```

### Bus

```typescript
    {
        id: Number, // unique
        plateNumber: String,
        busType: enum('AC', 'NON_AC'),
        seatLayout: {
            lower_deck: [
                {
                    row: Number, // 1 based indexing
                    column: Number,
                    seatNumber: String,
                    seatType: enum('SLEEPER', 'SEATER', 'SEMI_SLEEPER')
                }
            ],
            upper_deck?: [
                {
                    row: Number, // 1 based indexing
                    column: Number,
                    seatNumber: String,
                    seatType: enum('SLEEPER', 'SEATER', 'SEMI_SLEEPER')
                }
            ]
        },
        partner: String,
        amenities: [ {icon: String, label: String} ],
    }
```

### Tour

This schema defines a travel from one source location to a destination location.

```javascript
{
    id: Number, // unique
    source: {
        cityId: Number, // Foreign Key pointing to City Schema
        stops: [
            {
                stopId: Number,
                arrivalTime: Number, // epoch time
            }
        ]
    },
    destination: {
        cityId: Number,
        stops: [
            {
                stopId: Number,
                arrivalTime: Number, // epoch time
            }
        ]
    },
    travelDate: Number,
    busId: Number, // Foreign key pointing to Bus Schema
    prices: [
        {
            seatNumber: String,
            price: Number,
        }
    ]
}
```

### Booking

```javascript
{
    bookingTime: Number, // epoch time
    bookedSeats: [
        {
            seatNumber: String,
            gender: enum("M", "F"),
            name: String,
            age: Number,
            paidPrice: Number
        }
    ],
    tourId: Number, // Foreign Key pointing to Tour schema
    userId: Number // Foreign key pointing to user Schema.
}
```
