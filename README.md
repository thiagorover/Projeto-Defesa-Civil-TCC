# Civil Defense Disaster Mapping — Geolocation Platform

A web platform for the Civil Defense of Joinville (Brazil) that lets citizens report and monitor, in real time, areas of the city affected by natural disasters such as fallen trees, floods and landslides.

> Final-year project (TCC) at SENAI Joinville, 2018. The research behind it was published at **Computer on the Beach 2019** (vol. 10): *"Geolocalização aplicada ao mapeamento de Desastres Naturais"*.

---

## About

The platform connects two sides of disaster response:

- **Citizens** report incidents from where they are, feeding the system with real-time, geolocated data.
- **Civil Defense staff** record, map and generate reports on the affected areas, turning scattered reports into actionable information.

The goal was to shorten the gap between an incident happening and the administration knowing about it, using the population itself as a distributed sensor network.

---

## My role

I worked on the **backend and frontend** of the platform, building the REST API that received and served the geolocated incident data, and the web interface used by the Civil Defense team to visualize and manage occurrences. I was also responsible for the **authentication and session control layer**, implemented with Spring Security.

This was a team project developed by five authors, all credited in the published paper.

---

## Project evolution

The platform was initially built with Node.js (AdonisJS) and later migrated to a Java/Spring stack to gain robustness and sustain the growth of the application. Refactoring the entire backend mid-project was a deliberate technical decision that taught the team a lot about scalability and architectural tradeoffs.

---

## Architecture

```
[Citizens] --> [Mobile / Web report] --> [Spring REST API] --> [MySQL]
                                                |
                                                v
                                  [Web Manager (Angular + PO-UI)]
                                  used by Civil Defense staff
```

---

## Repository structure

```
api-spring/             Java + Spring backend (REST API + Spring Security)
defesacivilweb/         Public-facing web interface
defesacivilwebmanager/  Angular admin panel used by Civil Defense staff
app-react-native/       Mobile application for citizens
```

---

## Tech stack

- **Java + Spring** — REST API and backend logic
- **Spring Security** — authentication and session control
- **Angular** — web management interface
- **React Native** — mobile application for citizens
- **MySQL** — relational database
- **Google Maps API** — real-time geolocation and incident mapping

---

## Publication

The academic article describing this work is available in the proceedings of Computer on the Beach 2019:

**"Geolocalização aplicada ao mapeamento de Desastres Naturais"**
Faust, F.; Rover, T. H.; Duarte, W. C.; Camillo Junior, A.; Razera, T. M. — SENAI Joinville.
[Read the paper](https://periodicos.univali.br/index.php/acotb/article/view/15916)

---

## Status

This repository is an academic archive from 2018-2019. It is preserved as a record of the project and is not actively maintained.

---

## Author

Thiago Henrique Rover
[LinkedIn](https://www.linkedin.com/in/thiago-henrique-rover-97b8b3ba) · [GitHub](https://github.com/thiagorover)

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
