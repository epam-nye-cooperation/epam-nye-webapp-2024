# WSA-13 - Megrendelés részletei

## Mint felhasználó szeretném megtekinteni a korábbi megrendelésemhez tartozó részletes információkat

### Pontszám: 2
### Szolgáltatás: [GET /orders/{orderId}](http://localhost:5000/api-doc#/Orders/OrderController_getOrderById)
### Prioritás: alacsony
### Előkövetelmények: [WSA-12 - Felhasználó megrendelései](./WSA-12.md)

Módosítsuk a felhasználó megrendelései oldalt, hogy azok részleteit meg tudjuk tekinteni. Ha a felhasználó a megfelelő gombra/ikonra kattint, nyissunk egy felugró ablakot, amiben leírjuk a megrendeléshez tartozó információkat.  
Az ablak tartalmazza a megrendelés állapotát (`status`), idejét (`createdAt`), a szállítási (`shippingAddress`) és számlázási (`billingAddress`) címet, a megrendelés össszértékét (`total`), valamint a megrendelt termékek listáját (`items`) az alábbi formában: a termék neve (`name`), egységára (`price`), megrendelt darabszám (`quantity`), a termékhez tartozó kép (`image`) és a részösszeg.  
A ablak legyen bezárható megfelelő gomb segítségével.  
Megjegyzés: a lekérdezést nem kötelező végrehajtani, megfelelő szervezéssel megoldható a meglévő lista elemének ésszerű felhasználásával.

#### Példa lekérdezés:
`http://localhost:5000/orders/97913e7c-c5fd-47f3-aed9-bcb306c8e7a7`

#### Példa válasz:
200 OK státusz
```
{
  "orderId": "97913e7c-c5fd-47f3-aed9-bcb306c8e7a7",
  "status": "new",
  "createdAt": "2024-05-01T21:30:43.529Z",
  "updatedAt": "2024-05-01T21:30:43.529Z",
  "comment": "A kapucsengő nem működik",
  "cancelReason": "string",
  "billingAddress": {
    "name": "President of U.S.A.",
    "country": "United States of America",
    "city": "Washington D.C.",
    "street": "1600 Pennsylvania Avenue NW",
    "zip": "20500 U.S.",
    "taxNumber": "12345678911"
  },
  "shippingAddress": {
    "name": "President of U.S.A.",
    "country": "United States of America",
    "city": "Washington D.C.",
    "street": "1600 Pennsylvania Avenue NW",
    "zip": "20500 U.S.",
    "phoneNumber": "+36201234567"
  },
  "total": 0,
  "items": [
    {
      "product": {
        "id": "447dd9cd-3f35-4a40-a6c5-0097bf50643c",
        "name": "iPhone 16 Pro Max",
        "image": "https://picsum.photos/640/480.jpg",
        "price": 1719.8,
        "rating": 4.1,
        "categories": [
          "Computers & Tablets"
        ],
        "stock": 10
      },
      "quantity": 0
    }
  ]
}
```

#### A szolgáltatás által visszajelzett hibák:
- 401 Unauthorized - hiányzó, vagy érvénytelen token
- 404 Not found - a megrendelés nem található