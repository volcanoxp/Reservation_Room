


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
- **Environment variables**: using [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env#readme)

### API Endpoints

List of available routes:

**Room routes**:\
`POST /room/` - create many room by floor\
`PATCH /room/:roomId/disable` - disable one room\
`PATCH /room/:roomId/price` - update price of room\


**Reservation routes**:\
`POST /reservation/` - create new reservation\
`PATCH /reservation/:reservationId/canceled` - canceled reservation\
`PATCH /reservation/:reservationId/paid` - paid reservation\
`GET /reservation/identification/:identification` - check all reservations of client with number identifaction\