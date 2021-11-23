const TICKETS = {
    single: {
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
            name: "Metropolitalny",
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
        },
    },
    seasonal: {
        zones: [
            {
                name: "Zwykłe i nocne w granicach Gdyni",
                owner: {
                    personal: {
                        name: "Imienny",
                        type: {
                            monthly: {
                                name: "Miesięczny",
                                period: {
                                    weekdays: {
                                        name: "Ważny od pon. do pt.",
                                        price: {
                                            full: 78.0,
                                            reduced: 39.0
                                        }
                                    },
                                    weekly: {
                                        name: "Ważny cały tydzień",
                                        price: {
                                            full: 86.0,
                                            reduced: 43.0
                                        }
                                    }
                                }
                            },
                            semestral: {
                                name: "Semestralny",
                                period: {
                                    "4-months": {
                                        name: "4-miesięczny",
                                        price: {
                                            reduced: 163.0
                                        }
                                    },
                                    "5-months": {
                                        name: "5-miesięczny",
                                        price: {
                                            reduced: 204.0
                                        }
                                    }
                                }
                            }
                        }
                    },
                    bearer: {
                        name: "Na okaziciela",
                        price: {
                            full: 96.0
                        }
                    }
                }
            },
            {
                name: "Zwykłe, pospieszne i nocne w granicach Gdyni",
                owner: {
                    personal: {
                        name: "Imienny",
                        type: {
                            monthly: {
                                name: "Miesięczny",
                                period: {
                                    weekdays: {
                                        name: "Ważny od pon. do pt.",
                                        price: {
                                            full: 92.0,
                                            reduced: 46.0
                                        }
                                    },
                                    weekly: {
                                        name: "Ważny cały tydzień",
                                        price: {
                                            full: 98.0,
                                            reduced: 49.0
                                        }
                                    }
                                }
                            },
                            semestral: {
                                name: "Semestralny",
                                period: {
                                    "4-months": {
                                        name: "4-miesięczny",
                                        price: {
                                            reduced: 186.0
                                        }
                                    },
                                    "5-months": {
                                        name: "5-miesięczny",
                                        price: {
                                            reduced: 233.0
                                        }
                                    }
                                }
                            }
                        }
                    },
                    bearer: {
                        name: "Na okaziciela",
                        price: {
                            full: 111.0
                        }
                    }
                }
            },
            {
                name: "Zwykłe, pospieszne i nocne w granicach Sopotu albo Rumi albo gm. Kosakowo albo gm. Żukowo albo gm. Szemud albo gm. Wejherowo",
                owner: {
                    personal: {
                        name: "Imienny",
                        type: {
                            monthly: {
                                name: "Miesięczny",
                                period: {
                                    weekdays: {
                                        name: "Ważny od pon. do pt.",
                                        price: {
                                            full: 64.0,
                                            reduced: 32.0
                                        }
                                    },
                                    weekly: {
                                        name: "Ważny cały tydzień",
                                        price: {
                                            full: 68.0,
                                            reduced: 34.0
                                        }
                                    }
                                }
                            },
                            semestral: {
                                name: "Semestralny",
                                period: {
                                    "4-months": {
                                        name: "4-miesięczny",
                                        price: {
                                            reduced: 129.0
                                        }
                                    },
                                    "5-months": {
                                        name: "5-miesięczny",
                                        price: {
                                            reduced: 162.0
                                        }
                                    }
                                }
                            }
                        }
                    },
                    bearer: {
                        name: "Na okaziciela",
                        price: {
                            full: 79.0
                        }
                    }
                }
            },
            {
                name: "Zwykłe, pospieszne i nocne w granicach Rumi, Redy i miasta Wejherowa albo gm. Wejherowo i Rumi",
                owner: {
                    personal: {
                        name: "Imienny",
                        type: {
                            monthly: {
                                name: "Miesięczny",
                                period: {
                                    weekdays: {
                                        name: "Ważny od pon. do pt.",
                                        price: {
                                            full: 82.0,
                                            reduced: 41.0
                                        }
                                    },
                                    weekly: {
                                        name: "Ważny cały tydzień",
                                        price: {
                                            full: 90.0,
                                            reduced: 45.0
                                        }
                                    }
                                }
                            },
                            semestral: {
                                name: "Semestralny",
                                period: {
                                    "4-months": {
                                        name: "4-miesięczny",
                                        price: {
                                            reduced: 171.0
                                        }
                                    },
                                    "5-months": {
                                        name: "5-miesięczny",
                                        price: {
                                            reduced: 214.0
                                        }
                                    }
                                }
                            }
                        }
                    },
                    bearer: {
                        name: "Na okaziciela",
                        price: {
                            full: 103.0
                        }
                    }
                }
            },
            {
                name: "Zwykłe, pospieszne i nocne w obrębie sieci komunikacyjnej [w tym linie G, N1, 101 i 171]",
                owner: {
                    personal: {
                        name: "Imienny",
                        type: {
                            monthly: {
                                name: "Miesięczny",
                                period: {
                                    weekdays: {
                                        name: "Ważny od pon. do pt.",
                                        price: {
                                            full: 102.0,
                                            reduced: 51.0
                                        }
                                    },
                                    weekly: {
                                        name: "Ważny cały tydzień",
                                        price: {
                                            full: 108.0,
                                            reduced: 54.0
                                        }
                                    }
                                }
                            },
                            semestral: {
                                name: "Semestralny",
                                period: {
                                    "4-months": {
                                        name: "4-miesięczny",
                                        price: {
                                            reduced: 205.0
                                        }
                                    },
                                    "5-months": {
                                        name: "5-miesięczny",
                                        price: {
                                            reduced: 257.0
                                        }
                                    }
                                }
                            }
                        }
                    },
                    bearer: {
                        name: "Na okaziciela",
                        price: {
                            full: 121.0
                        }
                    }
                }
            }
        ]
    }
}