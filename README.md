
# STEPS TO DEPLOY THIS API

1. Clone repository
```bash
git clone https://github.com/volcanoxp/Reservation_Room.git
cd Reservation_Room
```

2. Execute the docker compose
```bash
docker-compose up -d
```

3. Start testing the APIs
```bash
curl http://localhost:3000/test
```

## Features

- **SQL database**: [PostgreSQL](https://www.postgresql.org/) object data modeling using [Sequelize](https://sequelize.org/)
- **Validation**: request data validation using [Joi](https://github.com/hapijs/joi)
- **CORS**: Cross-Origin Resource-Sharing enabled using [cors](https://github.com/expressjs/cors)
- **Docker support**
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv)  

### **API Description**

This api seeks to help manage hotel room reservations. You can also configure the number of rooms per floor of the hotel and the price of each room. Reservations are created indicating all personal data, the date of stay and how many days they will stay. There is also a functionality to quickly verify if a certain date there is availability of rooms. Reservations have three states which are pending, paid and cancelled, where the api ensures that the correct flow of these states is met.

Simple flow example:

- The client verifies that there is room availability in the hotel.
- Then start making the reservation.
- Finally the client makes the payment or can cancel the reservation.

### **API Endpoints**

List of available routes:

**Room routes**:\
`POST /room/` - create many room by floor\
`PATCH /room/:roomId/disable` - disable one room\
`PATCH /room/:roomId/price` - update price of room\
`GET /room/disponibility` - check availability room on a specific day\

**Reservation routes**:\
`POST /reservation/` - create new reservation\
`PATCH /reservation/:reservationId/canceled` - canceled reservation\
`PATCH /reservation/:reservationId/paid` - paid reservation\
`GET /reservation/identification/:identification` - check all reservations of client with number identifaction\


### **API POSTMAN DOCUMENTACION / EXAMPLES**

https://documenter.getpostman.com/view/11308127/VVBUxRnY