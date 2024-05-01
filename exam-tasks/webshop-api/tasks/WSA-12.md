# WSA-12 - Felhasználó megrendelései

## Mint regisztrált felhasználó, szeretném látni a korábbi megrendeléseimet

### Pontszám: 1
### Szolgáltatás: [GET /orders](http://localhost:5000/api-doc#/Orders/OrderController_getOrders)
### Prioritás: alacsony
### Előkövetelmények: [WSA-11 - Megrendelés oldal](./HPAPI-11.md)

Az oldal csak belépett felhasználók számára érhető el, ellenkező esetben irányítsuk a felhasználót a beléptető oldalra. Az oldal célja listázni a felhasználó megrendeléseit időrendi sorrendben - a legújabb kerüljön a sor legelejére (kliens oldali rendezés szükséges). A megrendelések listájában legyen látható a megrendelés időpontja, az aktuális státusz, a megrendelés összege, valamint a szállítási és számlázási cím neve, ország, irányítószám, város és utca.  
A megrendelés állapotai:
- `new`: Új megrendelés
- `accepted`: Elfogadva
- `fulfilled`: Teljesítve
- `cancelled`: Visszamondva
Ha a felhasználónak még nem volt megrendelése, legyen annak megfelelő üzenet megjelenítve az oldalon.

#### Példa lekérdezés:
`http://localhost:5000/orders`

#### Példa válasz:
200 OK Státusz
[
  {
    "orderId": "97913e7c-c5fd-47f3-aed9-bcb306c8e7a7",
    "status": "new",
    "createdAt": "2024-04-07T21:33:36.618Z",
    "updatedAt": "2024-04-07T21:33:36.618Z",
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
          "stock": 6
        },
        "quantity": 5
      }
    ],
    "total": 8599
  }
]

#### A szolgáltatás által visszajelzett hibák:
- 401 Unauthorized - hiányzó, vagy érvénytelen token