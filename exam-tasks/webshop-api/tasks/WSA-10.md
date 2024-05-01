# WSA-10 - Kosár oldal

## Mint felhasználó, meg szeretném tekinteni a kosár tartalmát

### Pontszám: 2
### Szolgáltatás: [GET /products/list](http://localhost:5000/api-doc#/Products/getProductsById)
### Előkövetelmények [WSA-09 - Kosárba helyezés](./WSA-09.md)

Az oldalon jelenítsük meg a korábban kosárba helyezett termékeket, ehhez kérdezzük le a kosárban található azonosítókhoz tartozó termékeket a megadott szolgáltatás segítségével (ld. példa). A listában legyen látható a termék neve (`name`) a termék oldalára mutató linkkel, a termékhez tartozó képpel (`image`), a termék egységára (`price`), hány darab található a kosárban az adott elemből és hogy összesen az adott tétel mennyibe kerül.  
Ha felhasználó kosara üres, jelenítsük meg ennek megfelelő üzenetet. Legyen lehetőség egy és az összes termék eltávolítására a kosárból (kosár ürítése). Az oldalon legyen látható az összesen fizetendő összeg. Az oldalon legyen egy link a [megrendelés oldalra](./MD-11) (pl. Tovább a pénztárhoz).

#### Példa lekérdezés
http://localhost:5000/products/list?id=447dd9cd-3f35-4a40-a6c5-0097bf50643c&id=1e2f3b8c-1750-44f8-b349-68c5d63f62ff


#### Példa válasz
200 OK státuszkód
```
[
  {
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
  {
    "id": "1e2f3b8c-1750-44f8-b349-68c5d63f62ff",
    "name": "Esse sunt est proident",
    "image": "https://picsum.photos/640/480.jpg",
    "price": 2317.41,
    "rating": 2,
    "categories": [
      "vehicle-electronics-gps",
      "cellphones-accessories",
      "cameras-photo"
    ],
    "stock": 1
  }
]
```