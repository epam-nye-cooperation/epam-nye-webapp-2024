# WSA-07 - Terméklisták

## Mint látogató szeretném megtekinteni a kategóriákban található termékeket

### Pontok: 3
### Szolgáltatások: [GET /products](http://localhost:5000/api-doc#/Products/searchProducts), [GET /products/categories](http://localhost:5000/api-doc#/Products/getCategories)
### Prioritás: Közepes

A feladat egy olyan oldal elkészítése, ahol az adott kategóriához tartozó termékeket tudjuk megtekinteni. Az oldalon jelenjenek meg azok a termékek, amik az megadott kategóriába tartoznak. Az oldal rendelkezzen dedikált url címmel, az oldal frissítésekor a korábban látott elemek térjenek vissza (a kiválasztott rendezéssel és oldalszámmal együtt). Az oldal címe legyen az adott kategória neve (lekérés pl: `http://localhost:5000/products/categories?id=cameras-photos`).  
A lista rácsszerkezetben jelenjen meg, egy sorban **3** termék, egy oldalon maximum **6** termék legyen megtalálható. Az egyes termékeknél legyen látható a termék neve (`name`), ára (`price`), rendelhető-e (`stock` > 0), a termékhez tartozó kép (`image`) és az adott termék értékelés egy csillagban elhelyezve. Ha az adott kategóriában több, mint 6 termék található, az oldal legyen lapozható.  
Az oldal elemeit tudjuk rendezni név, ár vagy értékelés szerint növekvő vagy csökkenő sorrendben.  
A szolgáltatáshoz szükséges paraméterek:
- `categories`: kategória azonosítója
- `orderBy`: rendezés iránya (name.ASC/name.DESC/price.ASC/price.DESC/rating.ASC/rating.DESC)
- `offset`: lapozás; kiindulási érték, célszerűen növelve az oldalon megtalálható elemek számával lapozáskor
- `limit`: lapozás; az oldalon megtalálható elemek száma

#### Lekérés példa:
`http://localhost:5000/products?categories=cameras-photos&orderBy=name.ASC&offset=0&limit=6`

#### Lekérdezés eredménye:
200 OK státusz
```
{
  "data": [
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
  ],
  "total": 5
}
```
