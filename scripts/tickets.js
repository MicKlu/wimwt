const TICKETS = {
    zkm: {
        "single-trip": {
            desc: "Jednoprzejazdowy na linie zwykłe i nocne<br />obowiązuje w pojazdach: ZKM w Gdyni",
            price: {
                full: 3.80,
                reduced: 1.90
            }
        },
        "one-hour": {
            desc: "1-godzinny na linie zwykłe, pospieszne i nocne<br />obowiązuje w pojazdach: ZKM w Gdyni",
            price: {
                full: 4.40,
                reduced: 2.20
            }
        },
        "one-day": {
            desc: "24-godzinny na linie zwykłe, pospieszne i nocne<br />obowiązuje w pojazdach: ZKM w Gdyni",
            price: {
                full: 14.00,
                reduced: 7.00
            }
        }
    },
    mzkzg: {
        "single-trip": {
            zones: [
                {
                    desc: "Jednoprzejazdowy na linie zwykłe i nocne<br />obowiązuje w pojazdach: ZTM w Gdańsku,<br />ZKM w Gdyni i MZK Wejherowo",
                    price: {
                        full: 4.00,
                        reduced: 2.00
                    }
                },
                {
                    desc: "Jednoprzejazdowy na linie zwykłe, pospieszne i nocne<br />obowiązuje w pojazdach: ZTM w Gdańsku,<br />ZKM w Gdyni i MZK Wejherowo",
                    price: {
                        full: 4.60,
                        reduced: 2.30
                    }
                }
            ]
        },
        "one-day": {
            zones: [
                {},{},
                {
                    desc: "24-godzinny komunalny<br />obowiązuje w pojazdach: ZTM Gdańsku<br />i ZKM w Gdyni i MZK Wejherowo",
                    price: {
                        full: 16.00,
                        reduced: 8.00
                    }
                },
                {
                    desc: "24-godzinny kolejowo-komunalny dwóch organizatorów<br />obowiązuje w pociągach SKM i PR oraz w pojazdach: ZTM Gdańsku albo ZKM w Gdyni albo MZK Wejherowo",
                    price: {
                        full: 22.00,
                        reduced: 11.00
                    }
                },
                {
                    desc: "24-godzinny kolejowo-komunalny<br />obowiązuje w pociągach SKM i PR oraz w pojazdach: ZTM Gdańsku i ZKM w Gdyni i MZK Wejherowo",
                    price: {
                        full: 25.00,
                        reduced: 12.50
                    }
                }
            ]
        },
        "two-days": {
            zones: [
                {}, {},
                {
                    desc: "72-godzinny komunalny<br />obowiązuje w pojazdach: ZTM Gdańsku<br />i ZKM w Gdyni i MZK Wejherowo",
                    price: {
                        full: 32.00,
                        reduced: 16.00
                    }
                }, {},
                {
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