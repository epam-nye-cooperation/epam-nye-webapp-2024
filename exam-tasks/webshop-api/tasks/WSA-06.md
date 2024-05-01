# WSA-06 - Kezdőlap

## Mint látogató szeretném elérni a webshopot, hogy megismerjem a termékeket

### Pontszám: 1
### Szolgáltatás: [GET /products/categories](http://localhost:5000/api-doc#/Products/getCategories)
### Prioritás: Közepes

Az oldalra érkező látogatóknak mutassuk meg a termékkategóriákat, biztosítsunk lehetőséget a [belépésre](./WSA-01.md) és a [regisztrációra](./WSA-02.md). Belépett felhasználók érhessék el a profiljukat és megrendeléseiket.  
A kategóriákra történő kattintáskor navigáljunk el dedikált oldalakra, ahol az adott kategóriákhoz tartozó termékeket tekinthetik meg (ezen oldalak megvalósítása nem tartozik ennek a sztorinak a hatáskörébe, lásd [Terméklisták](./WSA-07.md)). A kategóriáknál jelenítsük meg a kategória nevét (`name`), a hozzá tartozó képet (`image`), valamint az elérhető termékek számát (`productCount`).

#### Lekérdezés
`http://localhost:5000/products/categories`

#### Válaszkód
200 OK
```
[
  {
    "id": "computers-tablets",
    "name": "Computers & Tablets",
    "image": "https://picsum.photos/400/400.jpg",
    "productCount": 9
  }
]
```

