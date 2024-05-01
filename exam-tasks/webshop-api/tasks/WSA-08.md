# WSA-08 - Termékek

## Mint felhasználó, szeretném megtekinteni a termék részletes adatait.

### Pontok: 2
### Szolgáltatások: [GET /products](http://localhost:5000/api-doc#/Products/searchProducts), [GET /products/categories](http://localhost:5000/api-doc#/Products/getCategories)
### Prioritás: közepes
### Előkövetelmény: [Terméklisták](./WSA-07.md)

A termék rendelkezzen saját oldallal, amit a megfelelő url címmel tudunk elérni (az oldal frissítésekor újból legyenek láthatóak a termék adatai). Az oldal címe legyen a termék neve (`name`), az oldalon jelenjen meg a termék leírása (`description`), a hozzá tartozó kép (`image`), a termék értékelése (`rating`) 5 csillag mellett és hogy hány darab van raktáron (`stock`).  
Az oldal alján legyen elérhető link a termékhez tartozó kategóriákhoz (`categories`), kis méretű képekkel, illetve a kategória nevével (lekérdezés pl. `/products/categories?id=computers-tablets&id=cameras-photo&id=tv-audio-surveillance`)  
Amennyiben az adott termékhez tartozó lekérdezés hibát ad visszza, jelenítsük meg a szükséges információkat és biztosítsunk linket a kezdőlapra.  

#### Lekérdezés
`http://localhost:5000/products/447dd9cd-3f35-4a40-a6c5-0097bf50643c`

#### Válasz
200 OK státusz
```
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
  "stock": 6,
  "ratings": {
    "5c837fa6-3bf6-4e74-ab3a-80b996081d64": 1
  },
  "description": "Magna excepteur tempor culpa occaecat sunt duis occaecat ea reprehenderit do pariatur magna qui. Esse sunt deserunt minim reprehenderit irure dolor enim velit elit dolor cillum proident anim deserunt. Ut Lorem dolore aliquip proident nostrud ea sint adipisicing. Amet amet deserunt culpa sint magna qui eiusmod laboris amet dolor labore.\r\n"
}
```

#### A szolgáltatás által visszajelzett hibák:
400 Bad request - hibás termékazonosító
404 Not found - a keresett termék nem található