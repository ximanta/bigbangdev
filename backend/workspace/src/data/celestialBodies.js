export const celestialBodies = [
  {
    "id": "sun",
    "name": "Sun",
    "type": "star",
    "description": "The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core. The Sun has been an object of veneration in many cultures throughout human history.",
    "imageUrls": [
      "https://via.placeholder.com/600x400/FFD700/000000?text=Sun_Surface",
      "https://via.placeholder.com/600x400/FFA500/FFFFFF?text=Sun_Flare",
      "https://via.placeholder.com/600x400/FF8C00/FFFFFF?text=Sun_Corona"
    ],
    "facts": [
      { "label": "Type", "value": "G-type Main-sequence Star" },
      { "label": "Diameter", "value": "1,392,684 km" },
      { "label": "Mass", "value": "1.989 × 10^30 kg" },
      { "label": "Surface Temp", "value": "5,778 K" },
      { "label": "Age", "value": "4.6 billion years" }
    ]
  },
  {
    "id": "mercury",
    "name": "Mercury",
    "type": "planet",
    "description": "Mercury is the smallest planet in our solar system and closest to the Sun. It has a very thin atmosphere, or exosphere, composed of atoms blasted off its surface by the solar wind. Mercury's surface is heavily cratered, resembling Earth's Moon.",
    "imageUrls": [
      "https://via.placeholder.com/600x400/A9A9A9/000000?text=Mercury_Surface",
      "https://via.placeholder.com/600x400/808080/FFFFFF?text=Mercury_Crater",
      "https://via.placeholder.com/600x400/696969/FFFFFF?text=Mercury_Orbit"
    ],
    "facts": [
      { "label": "Diameter", "value": "4,879 km" },
      { "label": "Mass", "value": "3.30 × 10^23 kg" },
      { "label": "Orbital Period", "value": "88 Earth days" },
      { "label": "Day Length", "value": "58.6 Earth days" }
    ]
  },
  {
    "id": "venus",
    "name": "Venus",
    "type": "planet",
    "description": "Venus is the second planet from the Sun and is Earth's closest planetary neighbor. It's a terrestrial planet, often called Earth's 'sister planet' because of their similar size and mass. However, its thick, toxic atmosphere traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system.",
    "imageUrls": [
      "https://via.placeholder.com/600x400/FFDAB9/000000?text=Venus_Atmosphere",
      "https://via.placeholder.com/600x400/F4A460/FFFFFF?text=Venus_Radar",
      "https://via.placeholder.com/600x400/CD853F/FFFFFF?text=Venus_Clouds"
    ],
    "facts": [
      { "label": "Diameter", "value": "12,104 km" },
      { "label": "Mass", "value": "4.87 × 10^24 kg" },
      { "label": "Orbital Period", "value": "225 Earth days" },
      { "label": "Day Length", "value": "243 Earth days" }
    ]
  },
  {
    "id": "earth",
    "name": "Earth",
    "type": "planet",
    "description": "Earth is the third planet from the Sun and the only astronomical object known to harbor life. It is the densest planet in the Solar System and the largest of the four terrestrial planets. Earth's atmosphere is composed primarily of nitrogen and oxygen.",
    "imageUrls": [
      "https://via.placeholder.com/600x400/0000FF/FFFFFF?text=Earth_BlueMarble",
      "https://via.placeholder.com/600x400/00BFFF/FFFFFF?text=Earth_Clouds",
      "https://via.placeholder.com/600x400/228B22/FFFFFF?text=Earth_Continents"
    ],
    "facts": [
      { "label": "Diameter", "value": "12,742 km" },
      { "label": "Mass", "value": "5.97 × 10^24 kg" },
      { "label": "Orbital Period", "value": "365.25 days" },
      { "label": "Moons", "value": "1" }
    ]
  },
  {
    "id": "moon",
    "name": "Moon",
    "type": "moon",
    "parentBodyId": "earth",
    "description": "The Moon is Earth's only natural satellite. It is the fifth largest satellite in the Solar System and the largest natural satellite of a planet in the Solar System relative to the size of its primary. The Moon is thought to have formed 4.51 billion years ago, not long after Earth.",
    "imageUrls": [
      "https://via.placeholder.com/600x400/C0C0C0/000000?text=Moon_Surface",
      "https://via.placeholder.com/600x400/A9A9A9/FFFFFF?text=Moon_Crater",
      "https://via.placeholder.com/600x400/808080/FFFFFF?text=Moon_Full"
    ],
    "facts": [
      { "label": "Diameter", "value": "3,474 km" },
      { "label": "Mass", "value": "7.35 × 10^22 kg" },
      { "label": "Orbital Period", "value": "27.3 Earth days" },
      { "label": "Surface Temp", "value": "-233 to 123 °C" }
    ]
  },
  {
    "id": "mars",
    "name": "Mars",
    "type": "planet",
    "description": "Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, after Mercury. It is often referred to as the 'Red Planet' because of the iron oxide prevalent on its surface, which gives it a reddish appearance. Mars is a terrestrial planet with a thin atmosphere.",
    "imageUrls": [
      "https://via.placeholder.com/600x400/B22222/FFFFFF?text=Mars_Surface",
      "https://via.placeholder.com/600x400/A52A2A/FFFFFF?text=Mars_Rover",
      "https://via.placeholder.com/600x400/8B0000/FFFFFF?text=Mars_PolarCap"
    ],
    "facts": [
      { "label": "Diameter", "value": "6,779 km" },
      { "label": "Mass", "value": "6.42 × 10^23 kg" },
      { "label": "Orbital Period", "value": "687 Earth days" },
      { "label": "Moons", "value": "2 (Phobos, Deimos)" }
    ]
  },
  {
    "id": "jupiter",
    "name": "Jupiter",
    "type": "planet",
    "description": "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined. Jupiter's most famous feature is the Great Red Spot, a giant storm larger than Earth.",
    "imageUrls": [
      "https://via.placeholder.com/600x400/DAA520/FFFFFF?text=Jupiter_GreatRedSpot",
      "https://via.placeholder.com/600x400/B8860B/FFFFFF?text=Jupiter_Clouds",
      "https://via.placeholder.com/600x400/FFD700/000000?text=Jupiter_Aurora"
    ],
    "facts": [
      { "label": "Diameter", "value": "139,820 km" },
      { "label": "Mass", "value": "1.90 × 10^27 kg" },
      { "label": "Orbital Period", "value": "11.86 Earth years" },
      { "label": "Moons", "value": "95+" }
    ]
  },
  {
    "id": "io",
    "name": "Io",
    "type": "moon",
    "parentBodyId": "jupiter",
    "description": "Io is the innermost of the four Galilean moons of the planet Jupiter. It is the most volcanically active world in the Solar System, with hundreds of volcanoes and mountains taller than Mount Everest. Its extreme volcanic activity is due to the tidal forces exerted by Jupiter.",
    "imageUrls": [
      "https://via.placeholder.com/600x400/FF4500/FFFFFF?text=Io_Volcano",
      "https://via.placeholder.com/600x400/FF8C00/FFFFFF?text=Io_Surface",
      "https://via.placeholder.com/600x400/FF6347/FFFFFF?text=Io_Plume"
    ],
    "facts": [
      { "label": "Diameter", "value": "3,643 km" },
      { "label": "Mass", "value": "8.93 × 10^22 kg" },
      { "label": "Orbital Period", "value": "1.77 Earth days" },
      { "label": "Parent Planet", "value": "Jupiter" }
    ]
  },
  {
    "id": "europa",
    "name": "Europa",
    "type": "moon",
    "parentBodyId": "jupiter",
    "description": "Europa is the smallest of the four Galilean moons orbiting Jupiter, but the sixth-largest moon in the Solar System. It is thought to have an ocean of liquid water beneath its icy shell, making it a prime candidate for extraterrestrial life.",
    "imageUrls": [
      "https://via.placeholder.com/600x400/ADD8E6/000000?text=Europa_IceCracks",
      "https://via.placeholder.com/600x400/B0E0E6/FFFFFF?text=Europa_Ocean",
      "https://via.placeholder.com/600x400/87CEEB/FFFFFF?text=Europa_Surface"
    ],
    "facts": [
      { "label": "Diameter", "value": "3,121 km" },
      { "label": "Mass", "value": "4.80 × 10^22 kg" },
      { "label": "Orbital Period", "value": "3.55 Earth days" },
      { "label": "Parent Planet", "value": "Jupiter" }
    ]
  },
  {
    "id": "ganymede",
    "name": "Ganymede",
    "type": "moon",
    "parentBodyId": "jupiter",
    "description": "Ganymede is the largest moon of Jupiter and the largest moon in the Solar System. It is larger than the planet Mercury and is the only moon known to have its own magnetic field. It consists of roughly equal amounts of silicate rock and water ice.",
    "imageUrls": [
      "https://via.placeholder.com/600x400/D3D3D3/000000?text=Ganymede_Surface",
      "https://via.placeholder.com/600x400/C0C0C0/FFFFFF?text=Ganymede_Grooves",
      "https://via.placeholder.com/600x400/A9A9A9/FFFFFF?text=Ganymede_Crater"
    ],
    "facts": [
      { "label": "Diameter", "value": "5,262 km" },
      { "label": "Mass", "value": "1.48 × 10^23 kg" },
      { "label": "Orbital Period", "value": "7.15 Earth days" },
      { "label": "Parent Planet", "value": "Jupiter" }
    ]
  },
  {
    "id": "callisto",
    "name": "Callisto",
    "type": "moon",
    "parentBodyId": "jupiter",
    "description": "Callisto is the second-largest moon of Jupiter, after Ganymede, and the third-largest in the Solar System. It is the most heavily cratered of the Galilean moons, indicating a very old and inactive surface. It may harbor a subsurface ocean of liquid water.",
    "imageUrls": [
      "https://via.placeholder.com/600x400/708090/FFFFFF?text=Callisto_Cratered",
      "https://via.placeholder.com/600x400/696969/FFFFFF?text=Callisto_Surface",
      "https://via.placeholder.com/600x400/808080/FFFFFF?text=Callisto_Orbit"
    ],
    "facts": [
      { "label": "Diameter", "value": "4,821 km" },
      { "label": "Mass", "value": "1.08 × 10^23 kg" },
      { "label": "Orbital Period", "value": "16.69 Earth days" },
      { "label": "Parent Planet", "value": "Jupiter" }
    ]
  },
  {
    "id": "saturn",
    "name": "Saturn",
    "type": "planet",
    "description": "Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant best known for its prominent ring system, which is made up of billions of small chunks of ice and rock. Saturn is visibly flattened at the poles and bulges at the equator.",
    "imageUrls": [
      "https://via.placeholder.com/600x400/F4A460/000000?text=Saturn_Rings",
      "https://via.placeholder.com/600x400/D2B48C/FFFFFF?text=Saturn_Clouds",
      "https://via.placeholder.com/600x400/CD853F/FFFFFF?text=Saturn_Hexagon"
    ],
    "facts": [
      { "label": "Diameter", "value": "116,460 km" },
      { "label": "Mass", "value": "5.68 × 10^26 kg" },
      { "label": "Orbital Period", "value": "29.45 Earth years" },
      { "label": "Moons", "value": "146+" }
    ]
  },
  {
    "id": "uranus",
    "name": "Uranus",
    "type": "planet",
    "description": "Uranus is the seventh planet from the Sun and the third-largest in the Solar System. It is an ice giant and has the coldest planetary atmosphere in the Solar System. Uranus's most distinctive feature is its axial tilt of 97.77 degrees, causing it to orbit the Sun nearly on its side.",
    "imageUrls": [
      "https://via.placeholder.com/600x400/87CEEB/000000?text=Uranus_Blue",
      "https://via.placeholder.com/600x400/4682B4/FFFFFF?text=Uranus_Rings",
      "https://via.placeholder.com/600x400/6A5ACD/FFFFFF?text=Uranus_Atmosphere"
    ],
    "facts": [
      { "label": "Diameter", "value": "50,724 km" },
      { "label": "Mass", "value": "8.68 × 10^25 kg" },
      { "label": "Orbital Period", "value": "84 Earth years" },
      { "label": "Moons", "value": "27" }
    ]
  },
  {
    "id": "neptune",
    "name": "Neptune",
    "type": "planet",
    "description": "Neptune is the eighth and farthest known planet from the Sun in the Solar System. It is an ice giant, slightly smaller than Uranus but more massive and denser. Neptune's atmosphere is known for its dynamic weather systems, including the Great Dark Spot, a storm similar to Jupiter's Great Red Spot.",
    "imageUrls": [
      "https://via.placeholder.com/600x400/1E90FF/000000?text=Neptune_DarkSpot",
      "https://via.placeholder.com/600x400/00008B/FFFFFF?text=Neptune_Clouds",
      "https://via.placeholder.com/600x400/4169E1/FFFFFF?text=Neptune_Rings"
    ],
    "facts": [
      { "label": "Diameter", "value": "49,244 km" },
      { "label": "Mass", "value": "1.02 × 10^26 kg" },
      { "label": "Orbital Period", "value": "164.8 Earth years" },
      { "label": "Moons", "value": "14" }
    ]
  }
];
