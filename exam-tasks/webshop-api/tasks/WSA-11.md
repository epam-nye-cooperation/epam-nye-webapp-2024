# WSA-11 - Megrendelés oldal

## Mint felhasználó szeretném megrendelni a kosárba helyezett termékeket.

### Pontszám: 3
### Szolgáltatás: [POST /orders](http://localhost:5000/api-doc#/Orders/OrderController_createOrder)
### Prioritás: közepes
### Előkövetelmények [WSA-01 - Belépés](./WSA-01.md), [WSA-02 - Regisztráció](./WSA-02.md), [WSA-03 - Profil és kilépés](./WSA-03.md), [WSA-10 - Kosár oldal](./WSA-10.md)

Ha a felhasználó még nem jelentkezett be, mutassuk meg neki a belépés formot és egy linket a regisztrációhoz. Belépett felhasználók esetén mutassun egy formot a felhasználó által megadott számlázási és szállítási adatokkal. Az adatokat legyen lehetőség módosítani. Az oldalon legyen látható a kosár összértéke (fizetendő összeg). Ha a kosár nem tartalmaz elemeket, irányítsik át a [kosár oldalra](./WSA-10.md). Az oldal alján legyen lehetőség egy megjegyzés hozzáadására (`comment`), és a formot ne lehessen elküldeni addig, amíg az elemek hibát tartalmaznak vagy a felhasználó nem fogadta el a felhasználási feltételeket (checkbox).  
A form elküldése és a sikeres visszajelzés után, ürítsük a kosár tartalmát és irányítsák át a felhasználót, ahol köszönjük meg a vásárlást és adjunk lehetőséget a megrendelés részletes adatainak megtekintésére.  

#### Példa bemeneti adat:
```
{
  "comment": "A csengő nem működik",
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
  "items": [
    {
      "productId": "447dd9cd-3f35-4a40-a6c5-0097bf50643c",
      "quantity": 5
    }
  ]
}
```

#### Példa kimenet
201 Created státusz
```
{
  "orderId": "8f280076-b4ff-447e-b120-d9c5f3f04d41",
  "status": "new",
  "createdAt": "2024-05-01T16:36:18.329Z",
  "updatedAt": "2024-05-01T16:36:18.329Z",
  "comment": "A csengő nem működik",
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
  "total": null,
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
        "stock": 1
      },
      "quantity": 5
    }
  ]
}
```