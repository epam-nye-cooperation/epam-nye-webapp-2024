# HPAPI-06 - Teszlek Süveg

## Mint belépett felhasználó szeretnék bekerülni egy Házba, hogy új dolgokat tanulhassak

### Pontszám: 3
### Szolgáltatás: [PUT /sorting-hat](http://localhost:5000/api-doc#/Sorting%20hat/assigment)
### Prioritás: magas

Ahhoz, hogy egy belépett felhasználó elsajíthassa bájitalok elkészítését vagy varázslatok használatát, be kell kerüljön egy Roxfort-i Házba. A Teszlek Süveg digitális (bár sokkal gagyibb) változata egy kérdőív segítségével dönti el, hogy a tanonc melyik házba kerüljön.  
A beosztást csak egyszer lehet elvégezni, de amíg a hallgató nincs beosztva, fel kell rá hívni a figyelmét az oldalon és lehetővé tenni az odajutást. Ha egy már korábban beosztott felhasználó látogatja meg ezt az oldalt, a kérdőív ne legyen látható és jelezzük felé, hogy már megtörtént a beosztása (és mutassuk a megfelelő házat is).  
A kérdőív 5 kérdésből áll, melyre egy vagy több válasz is kijelölhető. Mindegyik kérdésre egy-egy lista segítségével lehet válaszolni.

#### Bemeneti adatok
- Kedvenc színek
  - mező: color
  - típus: checkbox, több elem is választható
  - validáció:
    - legalább 1 szín választása kötelező
    - legfeljebb 3 szín jelölhető ki
  - választható értékek: 'Black', 'Blue', 'Bronze', 'Gold', 'Green', 'Scarlet', 'Silver', 'Yellow'
  - megjegyzés: a lista legyen rendezve név szerint (magyarosítás ajánlott, az elküldött értékek maradnak az eredeti nyelven)
  - magyar megfeleltetés: 'Fekete', Kék', 'Bronz', 'Arany', 'Zöld', 'Skarlátvörös', 'Ezüst', 'Sárga'
- Állat
  - mező: animal
  - típus: legördülő lista
  - validáció:
    - kötelező megadni
  - választható értékek: 'Badger', 'Eagle', 'Lion', 'Serpent'
  - megjegyzés: a lista legyen rendezve név szerint (magyarosítás ajánlott, az elküldött értékek maradnak az eredeti nyelven)
  - magyar megfeleltetés: 'Borz', 'Sas', 'Oroszlán', 'Kígyó'
- Elem
  - mező: element
  - típus: legördülő lista
  - validáció:
    - kötelező megadni
  - választható értékek: 'Fire', 'Air', 'Earth', 'Water'
  - megjegyzés: a lista legyen rendezve név szerint (magyarosítás ajánlott, az elküldött értékek maradnak az eredeti nyelven)
  - magyar megfeleltetés: 'Tűz', 'Levegő', 'Föld', 'Víz'
- Erények
  - mező: traits
  - típus: checkbox, több elem is választható
  - validáció:
    - legalább egy megadása kötelező
  - választható értékek:
    - "Acceptance" (Elfogadás)
    - "Ambition" (Ambíció)
    - "Bravery" (Félelmet nem ismerő)
    - "Chivalary" (Lovagiasság)
    - "Courage" (Bátorság)
    - "Creativity" (Kreativitás)
    - "Cunning" (Ravaszság)
    - "Daring" (Törödés)
    - "Determination" (Eltökéltség)
    - "Fairness" (Méltányosság)
    - "Hardworking" (Dolgosság)
    - "Inteligence" (Intelligencia)
    - "Just" (Igazság)
    - "Learning" (Tanulás)
    - "Loyalty" (Hűség)
    - "Modesty" (Szerénység)
    - "Nerve" (Mersz)
    - "Patience" (Türelem)
    - "Pride" (Büszkeség)
    - "Resourcefulness" (Találékonyság)
    - "Selfpreservation" (Önvédelem)
    - "Wisdom" (Bölcsesség)
    - "Wit" (Ész)
  - megjegyzés: a lista legyen rendezve név szerint (magyarosítás ajánlott, az elküldött értékek maradnak az eredeti nyelven)

#### Példa bemenet:
```
{
  "color": [
    "Gold",
    "Green",
    "Yellow"
  ],
  "animal": "Badger",
  "element": "Earth",
  "traits": [
    "Bravery",
    "Wisdom"
  ]
}
```

#### Sikeres beosztás:
200 OK státusz
```
{
  "userId": "ef9aac86-2e9b-4779-be02-7286f6e6c4d2",
  "email": "severus.snape@hogwarts.co.uk",
  "firstName": "Severus",
  "lastName": "Snape",
  "homeAddress": {
    "name": "Severus Snape",
    "country": "United Kingdom",
    "city": "Cokeworth",
    "street": "Spinner's End 7",
    "zip": "9GFF+GG"
  },
  "notificationAddress": {
    "name": "Severus Snape",
    "country": "United Kingdom",
    "city": "Cokeworth",
    "street": "Spinner's End 7",
    "zip": "9GFF+GG"
  },
  "house": "hufflepuff"
}
```

#### A szolgáltatás által visszajelzett hibák:
- 400 Bad request - a bevitt adatok érvénytelenek
- 401 Unauthorized - hiányzó, vagy érvénytelen token
- 409 Conflict - a tanuló már be van osztva