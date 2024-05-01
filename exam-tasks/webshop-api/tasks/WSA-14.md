# WSA-13 - Megrendelés visszamondása

## Mint regisztrált felhasználó szeretném visszamondani a korábbi megrendelésemet

### Pontszám: 2
### Szolgáltatás: [DELETE /orders/{orderId}](http://localhost:5000/api-doc#/Orders/OrderController_cancelOrder)
### Prioritás: Alacsony
### Előkövetelmények: [WSA-12 - Felhasználó megrendelései](./WSA-12.md)

Ha egy felhasználó szeretné visszamondani egy megrendelését, ezt megteheti amíg annak státusza `new` (új) - más esetben ne engedélyezzük a funkciót. Biztosítsuk ezt a lehetőséget a felhasználó megrendelés lista oldalán egy megfelelő gombbal.  
Ha a felhasználó a gombra kattint, egy felugró ablakban kérjünk megerősítést, hogy biztosan törölni akarja-e a megrendelést, és biztosítsunk lehetőséget arra, hogy egy szöveges mezőben megindokolja - a mező kitöltése kötelező.
Amennyiben ezt jóváhagyja, küldjünk megfelelő kérést a szervernek és sikeres válasz esetén frissítsük a megrendelések listáját. Hiba esetén adjunk kezeljük azt annak megfelelően.

#### Példa lekérdezés
`DELETE /orders/97913e7c-c5fd-47f3-aed9-bcb306c8e7a7`
```
{
  "reason": "mégsem szeretném megrendelni"
}
```

#### Példa válasz
202 ACCEPTED státusz
```
{
  "orderId": "97913e7c-c5fd-47f3-aed9-bcb306c8e7a7",
  "status": "cancelled",
  "createdAt": "2024-04-07T21:33:36.618Z",
  "updatedAt": "2024-05-01T21:32:18.429Z",
  "comment": "A csengő nem működik",
  "cancelReason": "mégsem szeretném megrendelni",
  "billingAddress": {
    "name": "President of U.S.A.",
    "country": "United States of America",
    "city": "Washington D.C.",
    "street": "1600 Pennsylvania Avenue NW",
    "zip": "20500 U.S."
  },
  "shippingAddress": {
    "name": "President of U.S.A.",
    "country": "United States of America",
    "city": "Washington D.C.",
    "street": "1600 Pennsylvania Avenue NW",
    "zip": "20500 U.S.",
    "phoneNumber": "+36201234567"
  },
  "items": [
    {
      "product": {
        "id": "447dd9cd-3f35-4a40-a6c5-0097bf50643c",
        "name": "Aute nisi amet",
        "image": "https://picsum.photos/640/480.jpg",
        "price": 1719.8,
        "rating": 1,
        "categories": [
          "computers-tablets",
          "cameras-photo",
          "tv-audio-surveillance"
        ],
        "stock": 11
      },
      "quantity": 5
    }
  ],
  "total": 8599
}
```

#### A szolgáltatás által visszajelzett hibák:
- 400 Bad request - hiányzó indoklás
- 401 Unauthorized - hiányzó, vagy érvénytelen token
- 404 Not found - a megrendelés nem található
- 409 Conflict - a megrendelés már nem módosítható