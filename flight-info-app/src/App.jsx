import "./App.css";
import { useState, useEffect } from "react";

function App() {

  const [search, setSearch] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [activeTab, setActiveTab] = useState("Departures");
  const [terminal, setTerminal] = useState("All");
  const [newsIndex, setNewsIndex] = useState(0);

  const announcements = [

    "🔊 Final boarding call for Lufthansa LH789",
    "🔊 Security checks increased in Terminal 5",
    "🔊 Weather delays expected after 20:00",
    "🔊 Free airport WiFi available",
    "🔊 Boarding started for Emirates EK505",
    "🔊 Gate A12 changed to A14 for SAS SK102",

  ];

  const airlinesOperating = [

    { name: "SAS Scandinavian Airlines", link: "https://www.flysas.com/" },
    { name: "Norwegian Air", link: "https://www.norwegian.com/" },
    { name: "Lufthansa", link: "https://www.lufthansa.com/" },
    { name: "Air France", link: "https://www.airfrance.com/" },
    { name: "KLM Royal Dutch Airlines", link: "https://www.klm.com/" },
    { name: "Finnair", link: "https://www.finnair.com/" },
    { name: "British Airways", link: "https://www.britishairways.com/" },
    { name: "Swiss International Air Lines", link: "https://www.swiss.com/" },
    { name: "Austrian Airlines", link: "https://www.austrian.com/" },
    { name: "Brussels Airlines", link: "https://www.brusselsairlines.com/" },
    { name: "LOT Polish Airlines", link: "https://www.lot.com/" },
    { name: "Air Baltic", link: "https://www.airbaltic.com/" },
    { name: "Icelandair", link: "https://www.icelandair.com/" },
    { name: "Turkish Airlines", link: "https://www.turkishairlines.com/" },
    { name: "Pegasus Airlines", link: "https://www.flypgs.com/" },
    { name: "Qatar Airways", link: "https://www.qatarairways.com/" },
    { name: "Emirates", link: "https://www.emirates.com/" },
    { name: "Etihad Airways", link: "https://www.etihad.com/" },
    { name: "Air Canada", link: "https://www.aircanada.com/" },
    { name: "United Airlines", link: "https://www.united.com/" },
    { name: "Delta Air Lines", link: "https://www.delta.com/" },
    { name: "Singapore Airlines", link: "https://www.singaporeair.com/" },
    { name: "Thai Airways", link: "https://www.thaiairways.com/" },
    { name: "Ryanair", link: "https://www.ryanair.com/" },
    { name: "EasyJet", link: "https://www.easyjet.com/" },
    { name: "Wizz Air", link: "https://www.wizzair.com/" },
    { name: "Vueling", link: "https://www.vueling.com/" },
    { name: "Eurowings", link: "https://www.eurowings.com/" },
    { name: "SunExpress", link: "https://www.sunexpress.com/" },
    { name: "Aegean Airlines", link: "https://en.aegeanair.com/" },
    { name: "Croatia Airlines", link: "https://www.croatiaairlines.com/" },
    { name: "TAP Air Portugal", link: "https://www.flytap.com/" },
    { name: "Air Serbia", link: "https://www.airserbia.com/" },
    { name: "ITA Airways", link: "https://www.ita-airways.com/" },
    { name: "Sky Express", link: "https://www.skyexpress.gr/" },
    { name: "Smartwings", link: "https://www.smartwings.com/" },
    { name: "TUIfly Nordic", link: "https://www.tui.se/" },
    { name: "Sunclass Airlines", link: "https://www.sunclassairlines.dk/" },
    { name: "Freebird Airlines", link: "https://www.freebirdairlines.com/" },
    { name: "Jettime", link: "https://www.jettime.com/" },

  ];

  const destinations = [

    "London",
    "Paris",
    "Dubai",
    "Berlin",
    "Doha",
    "Rome",
    "Madrid",
    "Amsterdam",
    "Helsinki",
    "Toronto",
    "Bangkok",
    "Singapore",
    "Vienna",
    "Istanbul",
    "Warsaw",

  ];

  const statuses = [

    "On Time",
    "Boarding",
    "Delayed",
    "Last Call",

  ];

  const airlinesShort = [

    "SAS",
    "Lufthansa",
    "Air France",
    "Norwegian",
    "Qatar Airways",
    "Emirates",
    "British Airways",
    "Finnair",
    "KLM",
    "Turkish Airlines",

  ];

  const [flights, setFlights] = useState([]);

  useEffect(() => {

    const createFlights = () => {

      let newFlights = [];

      for (let i = 0; i < 25; i++) {

        newFlights.push({

          flight:
            String.fromCharCode(
              65 + Math.floor(Math.random() * 26)
            ) +
            String.fromCharCode(
              65 + Math.floor(Math.random() * 26)
            ) +
            Math.floor(Math.random() * 900),

          airline:
            airlinesShort[
              Math.floor(Math.random() * airlinesShort.length)
            ],

          destination:
            destinations[
              Math.floor(Math.random() * destinations.length)
            ],

          gate:
            String.fromCharCode(
              65 + Math.floor(Math.random() * 8)
            ) +
            Math.floor(Math.random() * 20),

          terminal:
            Math.random() > 0.5 ? "5" : "2",

          time:
            Math.floor(Math.random() * 23)
              .toString()
              .padStart(2, "0") +
            ":" +
            Math.floor(Math.random() * 59)
              .toString()
              .padStart(2, "0"),

          status:
            statuses[
              Math.floor(Math.random() * statuses.length)
            ],

          type:
            Math.random() > 0.5
              ? "Departures"
              : "Arrivals",

        });

      }

      setFlights(newFlights);

    };

    createFlights();

    const interval = setInterval(() => {

      createFlights();

    }, 5000);

    return () => clearInterval(interval);

  }, []);

  useEffect(() => {

    const timer = setInterval(() => {

      setCurrentTime(new Date().toLocaleTimeString());

    }, 1000);

    return () => clearInterval(timer);

  }, []);

  useEffect(() => {

    const newsTimer = setInterval(() => {

      setNewsIndex((prev) =>
        prev === announcements.length - 1 ? 0 : prev + 1
      );

    }, 4000);

    return () => clearInterval(newsTimer);

  }, []);

  const filteredFlights = flights.filter((flight) => {

    const matchesSearch =

      flight.destination
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      flight.airline
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      flight.flight
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesTab =
      flight.type === activeTab;

    const matchesTerminal =
      terminal === "All" ||
      flight.terminal === terminal;

    return (
      matchesSearch &&
      matchesTab &&
      matchesTerminal
    );

  });

  return (

    <div className="flight-container">

      <div className="overlay">

        <div className="announcement-bar">
          {announcements[newsIndex]}
        </div>

        <h1 className="main-title">
          ✈️ Ali Smart Airport Dashboard
        </h1>

        <p className="subtitle">
          Ultimate Smart Airport Management System
        </p>

        <div className="weather-box">
          🌦️ Stockholm Weather: 18°C • Wind 12km/h • Clear Sky
        </div>

        <div className="airport-info">

          <p>📍 Stockholm Arlanda Airport</p>
          <p>{new Date().toLocaleDateString()}</p>

          <p className="live-clock">
            Live Time: {currentTime}
          </p>

        </div>

        <div className="security-panel">

          <div className="security-card">
            🛂 Terminal 2 Security Wait:
            <strong> 8 Minutes</strong>
          </div>

          <div className="security-card">
            🛂 Terminal 5 Security Wait:
            <strong> 14 Minutes</strong>
          </div>

        </div>

        <div className="tabs">

          <button
            className={
              activeTab === "Departures"
                ? "active-tab"
                : "tab-button"
            }
            onClick={() =>
              setActiveTab("Departures")
            }
          >
            Departures
          </button>

          <button
            className={
              activeTab === "Arrivals"
                ? "active-tab"
                : "tab-button"
            }
            onClick={() =>
              setActiveTab("Arrivals")
            }
          >
            Arrivals
          </button>

        </div>

        <div className="filters">

          <select
            className="terminal-select"
            onChange={(e) =>
              setTerminal(e.target.value)
            }
          >

            <option value="All">
              All Terminals
            </option>

            <option value="2">
              Terminal 2
            </option>

            <option value="5">
              Terminal 5
            </option>

          </select>

        </div>

        <input
          type="text"
          placeholder="Search flight, airline, destination..."
          className="search-bar"
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <div className="table-container">

          <table className="flight-table">

            <thead>

              <tr>

                <th>Flight</th>
                <th>Airline</th>
                <th>Destination</th>
                <th>Gate</th>
                <th>Terminal</th>
                <th>Time</th>
                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {filteredFlights.map((flight, index) => (

                <tr key={index}>

                  <td>{flight.flight}</td>
                  <td>{flight.airline}</td>
                  <td>{flight.destination}</td>
                  <td>{flight.gate}</td>
                  <td>{flight.terminal}</td>
                  <td>{flight.time}</td>

                  <td>

                    <span
                      className={
                        flight.status === "Boarding"
                          ? "status boarding"
                          : flight.status === "Delayed"
                          ? "status delayed"
                          : flight.status === "Last Call"
                          ? "status lastcall"
                          : "status ontime"
                      }
                    >
                      {flight.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        <div className="services-section">

          <h2 className="section-title">
            🚖 Airport Services
          </h2>

          <div className="services-grid">

            <a href="https://www.uber.com/" target="_blank">🚕 Taxi Service</a>
            <a href="https://www.hertz.com/" target="_blank">🚗 Rent a Car</a>
            <a href="https://www.flygbussarna.se/" target="_blank">🚌 Bus Services</a>
            <a href="https://www.sj.se/" target="_blank">🚆 Train Tickets</a>
            <a href="https://www.swedavia.com/arlanda/service/lost-found/" target="_blank">🧳 Lost & Found</a>
            <a href="https://www.swedavia.com/arlanda/free-wifi/" target="_blank">📶 Airport WiFi</a>
            <a href="https://www.swedavia.com/arlanda/food-beverages/" target="_blank">🍽️ Restaurants</a>
            <a href="https://www.swedavia.com/arlanda/vip-services/" target="_blank">🛋️ VIP Lounge</a>
            <a href="https://www.swedavia.com/arlanda/shopping/duty-free/" target="_blank">🛍️ Duty Free</a>

          </div>

        </div>

        <div className="info-section">

          <h2 className="section-title">
            🚨 Emergency & Important Contacts
          </h2>

          <div className="info-panels">

            <div className="info-card">
              <h2>Emergency</h2>
              <p>112</p>
            </div>

            <div className="info-card">
              <h2>Airport Police</h2>
              <p>+46 10 109 10 00</p>
            </div>

            <div className="info-card">
              <h2>Medical Help</h2>
              <p>+46 8 123 456</p>
            </div>

            <div className="info-card">
              <h2>Flight Information</h2>
              <p>+46 77 140 10 00</p>
            </div>

          </div>

        </div>

        <div className="airlines-section">

          <h2 className="section-title">
            ✈️ Airlines Operating at Arlanda Airport
          </h2>

          <div className="airlines-grid">

            {airlinesOperating.map((airline, index) => (

              <a
                href={airline.link}
                target="_blank"
                rel="noreferrer"
                className="airline-button"
                key={index}
              >
                {airline.name}
              </a>

            ))}

          </div>

        </div>

        <footer className="footer">
          Created by Ali • Ultimate Smart Airport Dashboard
        </footer>

      </div>

    </div>

  );
}

export default App;