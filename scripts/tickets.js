const TICKETS = {
    zkm: {
        name: "ZKM Gdynia",
        "single-trip": {
            name: "1-przejazdowy",
            desc: "Jednoprzejazdowy na linie zwykłe i nocne<br />obowiązuje w pojazdach: ZKM w Gdyni",
            price: {
                full: 3.80,
                reduced: 1.90
            }
        },
        "one-hour": {
            name: "1-godzinny",
            desc: "1-godzinny na linie zwykłe, pospieszne i nocne<br />obowiązuje w pojazdach: ZKM w Gdyni",
            price: {
                full: 4.40,
                reduced: 2.20
            }
        },
        "one-day": {
            name: "24-godzinny",
            desc: "24-godzinny na linie zwykłe, pospieszne i nocne<br />obowiązuje w pojazdach: ZKM w Gdyni",
            price: {
                full: 14.00,
                reduced: 7.00
            }
        }
    },
    mzkzg: {
        "single-trip": {
            name: "1-przejazdowy",
            zones: [
                {
                    name: "Linie zwykłe i nocne",
                    desc: "Jednoprzejazdowy na linie zwykłe i nocne<br />obowiązuje w pojazdach: ZTM w Gdańsku,<br />ZKM w Gdyni i MZK Wejherowo",
                    price: {
                        full: 4.00,
                        reduced: 2.00
                    }
                },
                {
                    name: "Linie zwykłe, pospieszne i nocne",
                    desc: "Jednoprzejazdowy na linie zwykłe, pospieszne i nocne<br />obowiązuje w pojazdach: ZTM w Gdańsku,<br />ZKM w Gdyni i MZK Wejherowo",
                    price: {
                        full: 4.60,
                        reduced: 2.30
                    }
                }
            ]
        },
        "one-day": {
            name: "24-godzinny",
            zones: [
                {},{},
                {
                    name: "Komunalny",
                    desc: "24-godzinny komunalny<br />obowiązuje w pojazdach: ZTM Gdańsku<br />i ZKM w Gdyni i MZK Wejherowo",
                    price: {
                        full: 16.00,
                        reduced: 8.00
                    }
                },
                {
                    name: "Kolejowo-komunalny 2 organizatorów",
                    desc: "24-godzinny kolejowo-komunalny dwóch organizatorów<br />obowiązuje w pociągach SKM i PR oraz w pojazdach: ZTM Gdańsku albo ZKM w Gdyni albo MZK Wejherowo",
                    price: {
                        full: 22.00,
                        reduced: 11.00
                    }
                },
                {
                    name: "Kolejowo-komunalny",
                    desc: "24-godzinny kolejowo-komunalny<br />obowiązuje w pociągach SKM i PR oraz w pojazdach: ZTM Gdańsku i ZKM w Gdyni i MZK Wejherowo",
                    price: {
                        full: 25.00,
                        reduced: 12.50
                    }
                }
            ]
        },
        "two-days": {
            name: "72-godzinny",
            zones: [
                {}, {},
                {
                    name: "Komunalny",
                    desc: "72-godzinny komunalny<br />obowiązuje w pojazdach: ZTM Gdańsku<br />i ZKM w Gdyni i MZK Wejherowo",
                    price: {
                        full: 32.00,
                        reduced: 16.00
                    }
                }, {},
                {
                    name: "Kolejowo-komunalny",
                    desc: "72-godzinny kolejowo-komunalny<br />obowiązuje w pociągach SKM i PR oraz w pojazdach: ZTM Gdańsku i ZKM w Gdyni i MZK Wejherowo",
                    price: {
                        full: 50.00,
                        reduced: 25.00
                    }
                }
            ]
        }
    }
}