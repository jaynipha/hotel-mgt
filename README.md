    THIS APP IS CONNECTED TO MONGODB ONLINE
    YOU NEED POSTMAN TO TEST IT OUT

> Simple demonstration of Creating , Reading, Updating and Deleting Api data from MongoDb

## Prerequisite:

npm/nodejs latest version
REST Client Extension for Visual Studio OR POSTMAN

## Technologies used:

### 1. Backend

- Nodejs
- ExpressJs
- MongoDb

### 2. For Api testing

- Rest Client

## Dependency install

```
npm install --save
```

Dependencies are:

> express, cors, nodemon, mongoose, dotenv, helmet

## Run Project

```
npm run start
```

Or

```
nodemon app.js
```

## Rest Client Api testing (POSTMAN)

### Reading API ENDPOINTS

```rest
### NOTE THAT YOU MUST USE THE BEARER TOKEN TO AUTHENTICATE THE API BEFORE ANYTHING WILL WORK...
first step


```

### sign up as an admin so you can have access to all the API

POST http://localhost:4000/api/v1/auth/sign-up
the schema model for signing up is:
"firstName"
"lastName"
"email"
"password"
"role" = "admin"

once you have signed up, you can use the email and password to sign in using this link below:
POST http://localhost:4000/api/v1/auth/sign-in

Note that if you sign in as a guest, you can't add, edit or delete room types.

```
a unique token will be generated for you. copy that token without the " " and use it for the next api which is
getting all room types with the link below.

GET ALL ROOM TYPES
GET http://localhost:4000/api/v1/rooms-types
go to authorization and click bearer token, paste the unique token that was generated for you previously as an admin and hit postman. this will show you all room types available in our database.


```

### CREATE OR ADD ROOM-TYPE AS AN ADMIN.

POST http://localhost:4000/api/v1/rooms-types

as an admin, you can add a new room-type by using this:
"name":

ALL OUR ROOM TYPES HAVE A VALID OBJECT ID. our room-types include executive suites, single rooms, etc.
each of these room types have room numbers under them. the executive suites have 4 rooms numbered(1,2,3,4)

```
### to create a room under the room-types we have:

use this schema format
POST http://localhost:4000/api/v1/rooms
"name":"VI",
    "roomType":"63f26340f55f852026e96ea3",(this is the id of a room type you created)
    "price": 41500
} this will create a new room under one of our major room types.
```

```

### UPDATE A ROOM-TYPE BY ID

PATCH http://localhost:4000/api/v1/edit-room-type/:ID

put any room-type id after the slash and THEN GO TO BODY and change the room-type name to any name of your choice.

it will be updated in our database as long as you put your bearer token and you're authorized as an admin

```

```

### DELETE A ROOM-TYPE BY ID

DELETE http://localhost:4000/api/v1/delete-room-type/:ID

put any room-type id after the slash and hit send. it will be deleted from our database as long as you put your bearer token and you're authorized as an admin.

```

```

### UPDATE ROOM ITSELF

http://localhost:4000/api/v1/rooms/:ID
put any room-type id after the slash and hit send. it will be updated from our database as long as you put your bearer token and you're authorized as an admin.

```

```

```

N/B:EVERY ROOM TYPE HAS ROOMS UNDER IT. FOR INSTANCE, OUR SINGLE ROOMS HAVE ROOM 1, 2, 3,4 etc

### SEARCH QUERY

SEARCH QUERY HAS FOUR POSSIBLE SEARCH FRATURES

(NAME, ROOMTYPE MIN PRICE AND MAX PRICE)

http://localhost:4000/api/v1/rooms

```

add one of the search parameters to the key and input a valid value.

for instance: Name- room 1, 2, 3, 4(my rooms are named according to numbers)
room type - input the valid object id of the ROOM TYPE NOT  ROOM ID BUT THE ROOM TYPE ID.
min price- 10,000
maxprice- 170000
it will return the valid data if you search properly

```

```

```

# hotel-mgt
