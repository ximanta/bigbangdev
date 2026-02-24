export const solarSystemBodies = [
  {
    id: 'sun',
    name: 'Sun',
    type: 'Star',
    description: 'The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core. The Sun has been an object of reverence in many cultures throughout history.',
    diameter: '1,392,684 km',
    mass: '1.989 × 10^30 kg',
    distanceFromSun: '0 km (center)',
    orbitalPeriod: 'N/A',
    temperature: '5,778 K (surface)',
    atmosphere: 'Hydrogen, Helium',
    moons: [],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Sun_in_X-Ray.png/800px-Sun_in_X-Ray.png'
    ],
    geology: 'Composed primarily of hydrogen and helium plasma, the Sun does not have a solid surface. Its structure includes a core, radiative zone, convective zone, photosphere, chromosphere, and corona.',
    history: 'The Sun has been observed and worshipped since ancient times. Modern scientific study began with Galileo Galilei and the invention of the telescope. Spacecraft like SOHO and Parker Solar Probe continue to study the Sun in unprecedented detail.'
  },
  {
    id: 'mercury',
    name: 'Mercury',
    type: 'Planet',
    description: 'Mercury is the smallest planet in our solar system and closest to the Sun. It is a terrestrial planet with a heavily cratered surface, much like Earth\u0027s Moon. It has a very thin atmosphere.',
    diameter: '4,879 km',
    mass: '3.301 × 10^23 kg',
    distanceFromSun: '57.9 million km',
    orbitalPeriod: '88 Earth days',
    temperature: '-173 °C to 427 °C',
    atmosphere: 'Exosphere (trace amounts of oxygen, sodium, hydrogen, helium, potassium)',
    moons: [],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/d/d9/Mercury_in_color_-_ProRes.gif',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Mercury_coloured.jpg/800px-Mercury_coloured.jpg'
    ],
    geology: 'Mercury has a large iron core that makes up a large portion of its volume. Its surface is covered in impact craters, vast plains, and scarps (cliffs) formed by the planet\u0027s contraction.',
    history: 'Known since ancient times. Observed by ground-based telescopes for centuries. Visited by NASA\u0027s Mariner 10 in the 1970s and the MESSENGER mission from 2008-2015, which provided detailed mapping.'
  },
  {
    id: 'venus',
    name: 'Venus',
    type: 'Planet',
    description: 'Venus is the second planet from the Sun, often called Earth\u0027s "sister planet" due to their similar size and mass. It has a thick, toxic atmosphere that traps heat in a runaway greenhouse effect, making it the hottest planet in our solar system.',
    diameter: '12,104 km',
    mass: '4.867 × 10^24 kg',
    distanceFromSun: '108.2 million km',
    orbitalPeriod: '225 Earth days',
    temperature: '462 °C (average)',
    atmosphere: 'Carbon Dioxide (96.5%), Nitrogen (3.5%)',
    moons: [],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/0/08/Venus_from_Mariner_10.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/PIA00271_Venus_globe_high_res.jpg/800px-PIA00271_Venus_globe_high_res.jpg'
    ],
    geology: 'Venus\u0027s surface is dominated by volcanic features, vast plains, and unique geological structures like "coronae." It lacks plate tectonics similar to Earth.',
    history: 'Known since ancient times. Many missions, including NASA\u0027s Mariner 2 (first successful planetary flyby), Soviet Venera landers (first to land on another planet), and ESA\u0027s Venus Express, have studied Venus.'
  },
  {
    id: 'earth',
    name: 'Earth',
    type: 'Planet',
    description: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life. It is the densest planet in the Solar System and the largest of the four terrestrial planets.',
    diameter: '12,742 km',
    mass: '5.972 × 10^24 kg',
    distanceFromSun: '149.6 million km',
    orbitalPeriod: '365.25 days',
    temperature: '-88 °C to 58 °C',
    atmosphere: 'Nitrogen (78%), Oxygen (21%), Argon (0.9%), CO2 (0.04%)',
    moons: ['Moon'],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%282002%29.png/800px-The_Blue_Marble_%282002%29.png'
    ],
    geology: 'Earth\u0027s surface is constantly reshaped by plate tectonics, volcanism, erosion, and weathering. It has a molten outer core and a solid inner core.',
    history: 'Home to humanity, Earth has been studied extensively from its surface and from space. Thousands of satellites orbit Earth, providing data on its climate, weather, and geology.'
  },
  {
    id: 'moon',
    name: 'Moon',
    type: 'Moon',
    description: 'Earth\u0027s Moon is the fifth-largest natural satellite in the Solar System and the largest relative to the size of the planet it orbits. It is a rocky, airless body with a heavily cratered surface.',
    diameter: '3,474 km',
    mass: '7.342 × 10^22 kg',
    distanceFromSun: '149.6 million km (orbiting Earth)',
    orbitalPeriod: '27.3 Earth days (around Earth)',
    temperature: '-233 °C to 123 °C',
    atmosphere: 'No significant atmosphere (exosphere of trace gases)',
    moons: [],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/800px-FullMoon2010.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Lunar_farside_as_viewed_by_Apollo_16.jpg/800px-Lunar_farside_as_viewed_by_Apollo_16.jpg'
    ],
    geology: 'The Moon\u0027s surface is characterized by maria (dark plains formed by ancient volcanic eruptions) and highlands (light-colored, heavily cratered regions). It has no active plate tectonics.',
    history: 'Known since ancient times. The target of numerous missions, including the Apollo program which landed humans on its surface, and many robotic orbiters and landers from various nations.'
  },
  {
    id: 'mars',
    name: 'Mars',
    type: 'Planet',
    description: 'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System. It is often referred to as the "Red Planet" due to its reddish appearance, which is caused by iron oxide prevalent on its surface.',
    diameter: '6,779 km',
    mass: '6.417 × 10^23 kg',
    distanceFromSun: '227.9 million km',
    orbitalPeriod: '687 Earth days',
    temperature: '-153 °C to 20 °C',
    atmosphere: 'Carbon Dioxide (95%), Nitrogen (2.7%), Argon (1.6%)',
    moons: ['Phobos', 'Deimos'],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Mars_-_August_2020_%28cropped%29.jpg/800px-Mars_-_August_2020_%28cropped%29.jpg'
    ],
    geology: 'Mars has a diverse surface with polar ice caps, volcanoes (including Olympus Mons, the largest in the Solar System), canyons, and evidence of past liquid water, such as dried riverbeds.',
    history: 'Known since ancient times. A major focus of space exploration, with numerous orbiters, landers, and rovers (e.g., Viking, Pathfinder, Spirit, Opportunity, Curiosity, Perseverance) studying its geology and potential for past or present life.'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    type: 'Planet',
    description: 'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant, primarily composed of hydrogen and helium. Its most prominent feature is the Great Red Spot, a giant storm larger than Earth.',
    diameter: '139,820 km',
    mass: '1.898 × 10^27 kg',
    distanceFromSun: '778.5 million km',
    orbitalPeriod: '11.86 Earth years',
    temperature: '-145 °C (cloud tops)',
    atmosphere: 'Hydrogen (90%), Helium (10%)',
    moons: ['Io', 'Europa', 'Ganymede', 'Callisto', 'and many more'],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Jupiter.jpg/800px-Jupiter.jpg'
    ],
    geology: 'As a gas giant, Jupiter has no solid surface. Its "surface" is often defined as the point where atmospheric pressure equals 1 bar. It has a dense core surrounded by metallic hydrogen.',
    history: 'Known since ancient times. Visited by Pioneer 10 & 11, Voyager 1 & 2, Galileo, Cassini, and Juno missions, which have provided detailed insights into its atmosphere, magnetic field, and moons.'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    type: 'Planet',
    description: 'Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is best known for its prominent ring system, which is made up of billions of small particles.',
    diameter: '116,460 km',
    mass: '5.683 × 10^26 kg',
    distanceFromSun: '1.4 billion km',
    orbitalPeriod: '29.45 Earth years',
    temperature: '-178 °C (cloud tops)',
    atmosphere: 'Hydrogen (96%), Helium (3%)',
    moons: ['Titan', 'Rhea', 'Iapetus', 'Dione', 'Tethys', 'and many more'],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox_from_Cassini.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Saturn_and_its_moons.jpg/800px-Saturn_and_its_moons.jpg'
    ],
    geology: 'Like Jupiter, Saturn is a gas giant with no solid surface. Its atmosphere features strong winds and storms. Its rings are made mostly of water ice particles.',
    history: 'Known since ancient times. Visited by Pioneer 11, Voyager 1 & 2, and the Cassini-Huygens mission, which spent over a decade studying Saturn and its moons and rings.'
  },
  {
    id: 'uranus',
    name: 'Uranus',
    type: 'Planet',
    description: 'Uranus is the seventh planet from the Sun and the third-largest in diameter. It is an ice giant, composed mostly of water, ammonia, and methane ices. It has a unique axial tilt, causing it to orbit the Sun on its side.',
    diameter: '50,724 km',
    mass: '8.681 × 10^25 kg',
    distanceFromSun: '2.9 billion km',
    orbitalPeriod: '84 Earth years',
    temperature: '-224 °C',
    atmosphere: 'Hydrogen (83%), Helium (15%), Methane (2.3%)',
    moons: ['Miranda', 'Titania', 'Oberon', 'Umbriel', 'Ariel', 'and many more'],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Uranus_and_Rings.jpg/800px-Uranus_and_Rings.jpg'
    ],
    geology: 'Uranus is an ice giant, meaning it has a small, rocky core surrounded by a thick, slushy mantle of water, ammonia, and methane ices. Its atmosphere is cold and cloudy.',
    history: 'Discovered by William Herschel in 1781. Only visited by NASA\u0027s Voyager 2 in 1986, which provided the first close-up images and data about the planet and its moons.'
  },
  {
    id: 'neptune',
    name: 'Neptune',
    type: 'Planet',
    description: 'Neptune is the eighth and farthest known planet from the Sun. It is an ice giant, similar to Uranus, and is known for its strong winds and dynamic weather patterns, including the Great Dark Spot.',
    diameter: '49,244 km',
    mass: '1.024 × 10^26 kg',
    distanceFromSun: '4.5 billion km',
    orbitalPeriod: '165 Earth years',
    temperature: '-218 °C',
    atmosphere: 'Hydrogen (80%), Helium (19%), Methane (1.5%)',
    moons: ['Triton', 'Nereid', 'and many more'],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/0/06/Neptune_-_Voyager_2_%2829347980845%29_flatten_high_res.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Neptune_-_Voyager_2_%2829347980845%29_cropped.jpg/800px-Neptune_-_Voyager_2_%2829347980845%29_cropped.jpg'
    ],
    geology: 'Neptune has a structure similar to Uranus, with a rocky core, a mantle of water, ammonia, and methane ices, and a thick atmosphere. It is characterized by active weather systems.',
    history: 'Predicted mathematically before its discovery by Urbain Le Verrier and Johann Galle in 1846. Only visited by NASA\u0027s Voyager 2 in 1989, which revealed its rings, moons, and atmospheric features.'
  },
  {
    id: 'pluto',
    name: 'Pluto',
    type: 'Dwarf Planet',
    description: 'Pluto is a dwarf planet in the Kuiper Belt, a ring of bodies beyond Neptune. It was once considered the ninth planet but was reclassified in 2006. It has a complex surface with mountains, plains, and glaciers.',
    diameter: '2,376 km',
    mass: '1.303 × 10^22 kg',
    distanceFromSun: '5.9 billion km',
    orbitalPeriod: '248 Earth years',
    temperature: '-229 °C to -223 °C',
    atmosphere: 'Nitrogen, Methane, Carbon Monoxide (thin, transient atmosphere)',
    moons: ['Charon', 'Styx', 'Nix', 'Kerberos', 'Hydra'],
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/e/ef/Pluto_in_True_Color_-_Enhanced_Color.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Pluto_in_True_Color_-_Enhanced_Color.jpg/800px-Pluto_in_True_Color_-_Enhanced_Color.jpg'
    ],
    geology: 'Pluto\u0027s surface is geologically active, featuring icy plains (like Sputnik Planitia), mountain ranges (like Norgay Montes), and evidence of cryovolcanism. Its interior may contain a subsurface ocean.',
    history: 'Discovered by Clyde Tombaugh in 1930. Visited by NASA\u0027s New Horizons mission in 2015, which provided the first detailed images and data, revolutionizing our understanding of this distant world.'
  }
];