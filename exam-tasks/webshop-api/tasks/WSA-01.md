# WSAPI-01 - Belépés

## Mint regisztrált felhasználó, szeretnék belépni, hogy elérhessem a Webshop privát szolgáltatásait

### Pontok: 1
### Szolgáltatás: [POST /user/login](http://localhost:5000/api-doc#/Users/AuthController_login)
### Prioritás: magas

A feladat egy belépési oldal létrehozása, amin egy már regisztrált felhasználó be tud lépni az általa megadott email címmel és jelszóval.
Sikeres belépést követően a szolgáltatás által visszaadott token-t kliens oldalon el kell menteni, hogy a megrendeléshez kapcsolódó szolgáltatásokat is igénybe tudják venni. A felhasználót irányítsuk át a kezdőlapra.  
Amennyiben a belépés sikertelen, úgy azt jelezzük a felhasználó számára. Hibás bemeneti adatokat az oldal nem küldhet a szolgáltatás irányába, kliens oldalon validálni kell azokat.  
Ha az oldalt egy már korábban belépett felhasználó érné el, irányítsuk át a felhasználó [profil oldalára](./WSA-03.md).

#### Belépési adatok:
- Felhasználónév
  - mezőnév: username
  - típus: szöveg, email cím bekérése
  - validáció:
    - Kötelező kitölteni
    - Email címet kell tartalmazzon
- Jelszó
  - mezőnév: password
  - típus: szöveg, jelszó
  - validáció:
    - Kötelező kitölteni
    - A jelszónak legalább 8 karakter hosszúnak kell lennie legalább 1 számmal és 1 kisbetűvel

#### Példa bemeneti adatra:
```
{
  "username": "admin@local.com",
  "password": "admin123"
}
```

#### Sikeres belépés
201 Created válaszkód
```
{
  "accessToken": "string"
}
```

#### A szolgáltatás által visszajelzett hibák:
- 400 Bad request - a bevitt adatok érvénytelenek
- 401 Unauthorized - hibás felhasználónév vagy jelszó