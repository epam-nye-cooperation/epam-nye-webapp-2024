# WSA-15 - Termékek keresése

## Mint felhasználó szeretnék a termékek között keresni, hogy megtaláljam a nekem megfelelőt

### Pontszám: 2
### Szolgáltatás: [GET /products](http://localhost:5000/api-doc#/Products/searchProducts)
### Prioritás: alacsony
### Előkövetelmények: [WSA-07 - Terméklisták](./WSA-07.md)

Minden oldalon legyen elérhető egy mező, amibe egy kifejezést elküldve átkerülhetünk a keresés oldalra, ahol megkapjuk a találati listát. A listát legyen lehetőségünk tovább szűkíteni értékhatárra (minimum és/vagy maximum), aszerint, hogy készleten van-e az adott termék, milyen értékelést kapott (minimum, maximum). Az oldalon a [terméklistákon](./WSA-07.md) megtalálható elrendezést kövessük, azaz rácsszerkezetben egy oldalon maximum 6 elem legyen megtalálható, legyen rendezhető és lapozható. Az alapértelmezett rendezés legyen az értékelés szerinti csökkenő sorrend (legjobb legelöl)
A szolgáltatás által elfogadott további query paraméterek:
- `query`: keresőkifejezés, szöveges érték
- `minPrice`: minimum ár, opcionális érték, csak szám
- `maxPrice`: maximum ár, opcionális érték, csak szám
- `inStock`: készleten van-e, opcionális; boolean érték (true: csak készleten lévők, false: nincsenek készleten, undefined: figyelmen kívül hagyás)
- `minRate`: legalább ilyen átlagértékelése legyen (szám); opcionális
- `maxRate`: legfeljebb ilyen átlágértékelésű termákek (szám); opcionális

#### Példa lekérdezés:
`http://localhost:5000/products?query=lorem&maxPrice=2000&orderBy=price.DESC&offset=0&limit=6`
(olyan elemek, amik lorem kifejezést tartalmazzák, legfeljebb 2000 creditbe kerülnek, ár szerint csökkenő sorrendben rendezve)

#### Példa eredmény:
200 OK státusz
```
{
  "data": [
    {
      "id": "0f602f36-76fc-4fb3-a5ed-fd9cb5c0cf09",
      "name": "Et voluptate magna mollit anim",
      "image": "https://picsum.photos/640/480.jpg",
      "price": 1901.94,
      "rating": 1,
      "categories": [
        "vehicle-electronics-gps",
        "video-games-consoles"
      ],
      "stock": 9
    },
    {
      "id": "d2f2dff5-9599-4c48-8c08-621766b58a7a",
      "name": "Fugiat magna",
      "image": "https://picsum.photos/640/480.jpg",
      "price": 1884.77,
      "rating": 5,
      "categories": [
        "vehicle-electronics-gps",
        "cameras-photo"
      ],
      "stock": 4
    },
    {
      "id": "9f20b45c-6e33-4fb9-8bea-37a3c63e7af7",
      "name": "Laboris dolore",
      "image": "https://picsum.photos/640/480.jpg",
      "price": 1771.56,
      "rating": 2,
      "categories": [
        "cellphones-accessories",
        "computers-tablets",
        "vehicle-electronics-gps"
      ],
      "stock": 9
    },
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
      "id": "bd0b11cc-cd6b-4220-afbd-c0f7a80af07c",
      "name": "Voluptate aliqua",
      "image": "https://picsum.photos/640/480.jpg",
      "price": 1712.74,
      "rating": 2,
      "categories": [
        "vehicle-electronics-gps",
        "tv-audio-surveillance",
        "computers-tablets"
      ],
      "stock": 1
    },
    {
      "id": "d96b57ac-ca28-4466-8e06-6924fa680719",
      "name": "Aliquip et pariatur",
      "image": "https://picsum.photos/640/480.jpg",
      "price": 1435.04,
      "rating": 1,
      "categories": [
        "cellphones-accessories"
      ],
      "stock": 7
    }
  ],
  "total": 11
}
```

#### A szolgáltatás által visszajelzett hibák:
- 400 Bad request - valamely paraméter hibás értékeket tartalmaz