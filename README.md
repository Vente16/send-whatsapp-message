# SEND WHATSAPP MESSAGE API 🔥


## DESCRIPTION
Send a message to Whatsapp sending a number and a message with
whatsapp-web.js library


## Run the app

To deploy this project run

```bash
  yarn run dev
```

the app should run in localhost:3001

## API Reference

#### Get current time to indicate that the app is running

```http
  GET /
```

#### Get QR (this QR it will be used to connect WhatsApp)

```http
    GET /qr
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |


#### Send message to numbers

```http
    POST /lead
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `data`      | `array` | **Required**. this array recibes object with this structure  { message: "" , phone ""} |

#### Example
```json
    {
        "data": [
            {
                "message": "This is a message for testing",
                "phone": "***********"
            },
            {
                "message": "This is a message for testing",
                "phone": "********"
            }
        ]
    }
```

** NOTE: remember that each number must have country code which means for Colombia 57 then the number ** 


#### Response
```json
    {
       "responseExSave": {
            "status": 200,
            "message": "Messages have been sent successfully",
            "hasError": false
        }
    }
```

## Running the app with docker 🐳

#### 👉 build a image with this command
```bash
   docker build -t whatsapp-sender . 
```

#### 🚀 run the container
```bash
   docker run -d -p 80:3001 whatsapp-sender  
```




