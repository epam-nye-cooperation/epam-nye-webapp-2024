# Vizsgamunkához szükséges szolgáltatások

[Click here for english version](./README-en.md)

Ezen mappa tartalmazza a megvalósítandó projectekhez szükséges szerver-oldali szolgáltatásokat. Mindegyik API hasonló nehézségű feladatokat tartalmaz, de a követelmények eltérnek.  
A feladat minden esetben egy **React alapú alkalmazás elkészítése TypeScript segítségével**, a választott API szolgáltatásainak felhasználásával.

## Követelmények
- A feladatok megoldása **csapatmunkában** történik - a többiekkel együtt, nem egyedileg kell teljesíteni.
- Minden csapat jelöljön ki egy vezetőt és alakítsatok ki egy közös Git repositoryt.
- A csapatvezető feladatai:
  - Az egyes feladatok elosztása a tagok között
  - A csapaton belüli konfliktusok kezelése, szükség szerint az óraadók felé történő kommunikációja
  - A tagokkal együtt dolgozik ő is feladatokon
  - Vizsgán a csapat képviselete az átfogó bemutatásnál
  - A csapatvezető 1 plusz ponttal rendelkezik, melyet felhasználhat a saját, vagy egy csapattársa vizsgajegyének javítására, amennyiben a jegy nem elégtelen.
- A megvalósított alkalmazásnak tartalmaznia kell az előírt funkciókat, a feladatokhoz megadott követelmények teljesítésével
- Csak a csapaton belül dolgozhattok, külső fél segítsége semmilyen formában nem megengedett!
- A feladatok megoldása a saját repository-ba történő Pull request formájában történik. Közvetlen commit a main/master branch-re tilos.
- A vizsgán a programot a csapatvezető átfogó formában bemutatja a főbb funkciók tekintetében, majd az egyes részleteket az adott egységet megoldó csapattag magyarázza el.
- A megoldások tekintetében meg kell tudni védeni az elkészített kódot, ellenkező esetben az adott hallgató vizsgája elégtelen.
- Plágium esetén minden érintett hallgatót kizárunk - az ő esetükben pótvizsga csak akkor lehetséges, ha a ZH-t korábban sikerrel teljesítette.

## Technikai részletek
- Az elkészített alkalmazás minden esetben a React library segítségével készüljön, akár több más külsős NPM csomag segítségével.
- A kinézetre nincs megkötés, a csapaton áll az alkalmazás design-ja.
- A szerverrel történő kommunikáció csak a JavaScript Fetch API-jának a segítségével lehetséges, más package (pl. axios) használata **TILOS** - az így beadott feladatokat nem fogadjuk el.
- Az oldalon belül történő navigáció során az alkalmazás nem töltődhet újra, az oldal kövesse a Single Page Application elveit.
- Ha a feladat felugró ablakot, megerősítést vagy értesítést kér, a `window` objektum funkcióit (pl. confirm, error, alert vagy open) használni **tilos** - minden esetben stilizált ablakra vonatkozik a kérés.
- A beadás a vizsgaidőpont előtt 2 nappal email-ben történik a csapatvezető által. A levél tartalmazza:
  - A csapattagok nevét és Neptun kódját
  - A választott API-t
  - A Git repository címét, amiben az alkalmazás teljes egészében megtalálható

## Értékelés
Minden feladat egyedi pontszámokat tartalmaz, nehézségtől függően. Minden pont egy megszerzett jegynek felel meg, egy hallgató maximum 5 pontot szerezhet (függetlenül a megoldott elemektől). Amennyiben a ZH-t nem sikerült a hallgatónak korábban teljesítenie, úgy a jegybe beleszámít az ott szerzett (egy vagy két) elégtelen is - az érdemjegy ezek átlaga.

## Javítási lehetőség
Amennyiben a vizsgán a feladat bemutatása vagy védése sikertelen, úgy egy pótlásra van lehetőség fent említett kivétellel. A hallgatónak egy másik feladatot kell megoldania, a feladat teljesítésére két hét áll rendelkezésére.