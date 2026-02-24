export const solarSystemBodies = [
  {
    id: 'sun',
    name: 'The Sun',
    type: 'star',
    description: 'The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, heated to incandescence by nuclear fusion reactions in its core. The Sun has been an object of veneration in many cultures throughout human history. It accounts for 99.86% of the total mass of the Solar System.',
    facts: [
      { label: 'Type', value: 'G2V Yellow Dwarf' },
      { label: 'Diameter', value: '1,392,684 km' },
      { label: 'Mass', value: '1.989 × 10^30 kg' },
      { label: 'Surface Temp', value: '5,778 K (5,505 °C)' }
    ],
    images: ['/images/sun_1.jpg', '/images/sun_2.jpg'],
    orbitalPosition: 0,
    thumbnail: '/images/sun_thumb.jpg'
  },
  {
    id: 'mercury',
    name: 'Mercury',
    type: 'planet',
    description: 'Mercury is the smallest planet in our solar system and closest to the Sun. It is only slightly larger than Earth’s Moon. Mercury is a rocky planet with a solid, cratered surface, much like the Moon. Its thin atmosphere, or exosphere, is composed mostly of oxygen, sodium, hydrogen, helium, and potassium.',
    facts: [
      { label: 'Diameter', value: '4,879 km' },
      { label: 'Mass', value: '3.301 × 10^23 kg' },
      { label: 'Orbital Period', value: '88 Earth days' },
      { label: 'Surface Temp', value: '-173°C to 427°C' },
      { label: 'Moons', value: '0' }
    ],
    images: ['/images/mercury_1.jpg', '/images/mercury_2.jpg'],
    orbitalPosition: 0.39, // AU
    thumbnail: '/images/mercury_thumb.jpg'
  },
  {
    id: 'venus',
    name: 'Venus',
    type: 'planet',
    description: 'Venus is the second planet from the Sun and is Earth’s closest planetary neighbor. It’s one of the four terrestrial planets in the Solar System, meaning it is a rocky body. It is often referred to as Earth’s “sister planet” because of their similar size, mass, proximity to the Sun, and bulk composition.',
    facts: [
      { label: 'Diameter', value: '12,104 km' },
      { label: 'Mass', value: '4.867 × 10^24 kg' },
      { label: 'Orbital Period', value: '225 Earth days' },
      { label: 'Surface Temp', value: '462°C' },
      { label: 'Moons', value: '0' }
    ],
    images: ['/images/venus_1.jpg', '/images/venus_2.jpg'],
    orbitalPosition: 0.72, // AU
    thumbnail: '/images/venus_thumb.jpg'
  },
  {
    id: 'earth',
    name: 'Earth',
    type: 'planet',
    description: 'Earth is the third planet from the Sun and the only astronomical object known to harbor life. It is the densest planet in the Solar System and the largest of the four terrestrial planets. Earth’s atmosphere is composed of roughly 78% nitrogen, 21% oxygen, and 1% other gases.',
    facts: [
      { label: 'Diameter', value: '12,742 km' },
      { label: 'Mass', value: '5.972 × 10^24 kg' },
      { label: 'Orbital Period', value: '365.25 Earth days' },
      { label: 'Surface Temp', value: '-88°C to 58°C' },
      { label: 'Moons', value: '1' }
    ],
    images: ['/images/earth_1.jpg', '/images/earth_2.jpg'],
    orbitalPosition: 1.0, // AU
    thumbnail: '/images/earth_thumb.jpg'
  },
  {
    id: 'mars',
    name: 'Mars',
    type: 'planet',
    description: 'Mars is the fourth planet from the Sun and the second smallest planet in the Solar System, being larger than only Mercury. In English, Mars carries the name of the Roman god of war and is often referred to as the “Red Planet” because of its reddish appearance.',
    facts: [
      { label: 'Diameter', value: '6,779 km' },
      { label: 'Mass', value: '6.417 × 10^23 kg' },
      { label: 'Orbital Period', value: '687 Earth days' },
      { label: 'Surface Temp', value: '-153°C to 20°C' },
      { label: 'Moons', value: '2 (Phobos, Deimos)' }
    ],
    images: ['/images/mars_1.jpg', '/images/mars_2.jpg'],
    orbitalPosition: 1.52, // AU
    thumbnail: '/images/mars_thumb.jpg'
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    type: 'planet',
    description: 'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined. It is primarily composed of hydrogen with a quarter of its mass being helium.',
    facts: [
      { label: 'Diameter', value: '139,820 km' },
      { label: 'Mass', value: '1.898 × 10^27 kg' },
      { label: 'Orbital Period', value: '11.86 Earth years' },
      { label: 'Surface Temp', value: '-145°C (cloud tops)' },
      { label: 'Moons', value: '80+' }
    ],
    images: ['/images/jupiter_1.jpg', '/images/jupiter_2.jpg'],
    orbitalPosition: 5.2, // AU
    thumbnail: '/images/jupiter_thumb.jpg'
  },
  {
    id: 'saturn',
    name: 'Saturn',
    type: 'planet',
    description: 'Saturn is the sixth planet from the Sun and the second largest in the Solar System, after Jupiter. It is a gas giant with an average radius about nine times that of Earth. It has a prominent ring system that consists of nine continuous main rings and three discontinuous arc rings.',
    facts: [
      { label: 'Diameter', value: '116,460 km' },
      { label: 'Mass', value: '5.683 × 10^26 kg' },
      { label: 'Orbital Period', value: '29.45 Earth years' },
      { label: 'Surface Temp', value: '-178°C (cloud tops)' },
      { label: 'Moons', value: '83+' }
    ],
    images: ['/images/saturn_1.jpg', '/images/saturn_2.jpg'],
    orbitalPosition: 9.58, // AU
    thumbnail: '/images/saturn_thumb.jpg'
  },
  {
    id: 'uranus',
    name: 'Uranus',
    type: 'planet',
    description: 'Uranus is the seventh planet from the Sun. It is an ice giant; its mass is 14.5 times that of Earth. Uranus is similar in composition to Neptune, and both have different bulk chemical compositions from those of the larger gas giants Jupiter and Saturn.',
    facts: [
      { label: 'Diameter', value: '50,724 km' },
      { label: 'Mass', value: '8.681 × 10^25 kg' },
      { label: 'Orbital Period', value: '84 Earth years' },
      { label: 'Surface Temp', value: '-224°C (cloud tops)' },
      { label: 'Moons', value: '27' }
    ],
    images: ['/images/uranus_1.jpg', '/images/uranus_2.jpg'],
    orbitalPosition: 19.22, // AU
    thumbnail: '/images/uranus_thumb.jpg'
  },
  {
    id: 'neptune',
    name: 'Neptune',
    type: 'planet',
    description: 'Neptune is the eighth and farthest known planet from the Sun. In the Solar System, it is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. Neptune is 17 times the mass of Earth and slightly more massive than its near-twin Uranus.',
    facts: [
      { label: 'Diameter', value: '49,244 km' },
      { label: 'Mass', value: '1.024 × 10^26 kg' },
      { label: 'Orbital Period', value: '164.79 Earth years' },
      { label: 'Surface Temp', value: '-218°C (cloud tops)' },
      { label: 'Moons', value: '14' }
    ],
    images: ['/images/neptune_1.jpg', '/images/neptune_2.jpg'],
    orbitalPosition: 30.05, // AU
    thumbnail: '/images/neptune_thumb.jpg'
  },
  {
    id: 'earth-moon',
    name: 'Earth\'s Moon',
    type: 'moon',
    description: 'The Moon is Earth\'s only natural satellite. It is the fifth largest satellite in the Solar System and the largest and most massive relative to its parent planet. The Moon is thought to have formed about 4.51 billion years ago, not long after Earth.',
    facts: [
      { label: 'Diameter', value: '3,474 km' },
      { label: 'Mass', value: '7.342 × 10^22 kg' },
      { label: 'Orbital Period', value: '27.3 Earth days' },
      { label: 'Surface Temp', value: '-173°C to 127°C' },
      { label: 'Parent Planet', value: 'Earth' }
    ],
    images: ['/images/moon_1.jpg', '/images/moon_2.jpg'],
    thumbnail: '/images/moon_thumb.jpg'
  },
  {
    id: 'phobos',
    name: 'Phobos',
    type: 'moon',
    description: 'Phobos is the innermost and larger of the two natural satellites of Mars. It is named after the Greek god Phobos, a son of Ares (Mars) and Aphrodite (Venus) and personification of fear. Phobos is irregularly shaped, with a mean radius of 11.2 km.',
    facts: [
      { label: 'Diameter', value: '22 km' },
      { label: 'Mass', value: '1.07 × 10^16 kg' },
      { label: 'Orbital Period', value: '0.32 Earth days' },
      { label: 'Parent Planet', value: 'Mars' }
    ],
    images: ['/images/phobos_1.jpg', '/images/phobos_2.jpg'],
    thumbnail: '/images/phobos_thumb.jpg'
  },
  {
    id: 'deimos',
    name: 'Deimos',
    type: 'moon',
    description: 'Deimos is the smaller and outer of the two natural satellites of Mars. It is named after Deimos, the ancient Greek god of dread and terror, and a son of Ares (Mars) and Aphrodite (Venus). Deimos has a mean radius of 6.2 km.',
    facts: [
      { label: 'Diameter', value: '12 km' },
      { label: 'Mass', value: '1.4762 × 10^15 kg' },
      { label: 'Orbital Period', value: '1.26 Earth days' },
      { label: 'Parent Planet', value: 'Mars' }
    ],
    images: ['/images/deimos_1.jpg', '/images/deimos_2.jpg'],
    thumbnail: '/images/deimos_thumb.jpg'
  },
  {
    id: 'ganymede',
    name: 'Ganymede',
    type: 'moon',
    description: 'Ganymede is the largest moon of Jupiter and in the Solar System. It is the ninth-largest object in the Solar System and the largest without a substantial atmosphere. It is larger than the planet Mercury but has only about half of its mass.',
    facts: [
      { label: 'Diameter', value: '5,262 km' },
      { label: 'Mass', value: '1.4819 × 10^23 kg' },
      { label: 'Orbital Period', value: '7.15 Earth days' },
      { label: 'Parent Planet', value: 'Jupiter' }
    ],
    images: ['/images/ganymede_1.jpg', '/images/ganymede_2.jpg'],
    thumbnail: '/images/ganymede_thumb.jpg'
  },
  {
    id: 'callisto',
    name: 'Callisto',
    type: 'moon',
    description: 'Callisto is the second-largest moon of Jupiter, after Ganymede, and the third-largest in the Solar System. Callisto has about 99% the diameter of the planet Mercury but only about a third of its mass. It is not in an orbital resonance and is not significantly tidally heated.',
    facts: [
      { label: 'Diameter', value: '4,821 km' },
      { label: 'Mass', value: '1.0759 × 10^23 kg' },
      { label: 'Orbital Period', value: '16.69 Earth days' },
      { label: 'Parent Planet', value: 'Jupiter' }
    ],
    images: ['/images/callisto_1.jpg', '/images/callisto_2.jpg'],
    thumbnail: '/images/callisto_thumb.jpg'
  },
  {
    id: 'io',
    name: 'Io',
    type: 'moon',
    description: 'Io is the most volcanically active world in the Solar System. This extreme activity is the result of tidal heating from Jupiter and the other Galilean moons. Io\'s surface is dotted with hundreds of volcanoes, some of which erupt plumes of sulfur and sulfur dioxide hundreds of kilometers high.',
    facts: [
      { label: 'Diameter', value: '3,643 km' },
      { label: 'Mass', value: '8.9319 × 10^22 kg' },
      { label: 'Orbital Period', value: '1.77 Earth days' },
      { label: 'Parent Planet', value: 'Jupiter' }
    ],
    images: ['/images/io_1.jpg', '/images/io_2.jpg'],
    thumbnail: '/images/io_thumb.jpg'
  },
  {
    id: 'europa',
    name: 'Europa',
    type: 'moon',
    description: 'Europa is the smallest of the four Galilean moons orbiting Jupiter, and the sixth-closest to the planet. It is also the sixth-largest moon in the Solar System. Europa is believed to have a layer of liquid water beneath its icy shell, making it a prime candidate for harboring extraterrestrial life.',
    facts: [
      { label: 'Diameter', value: '3,121 km' },
      { label: 'Mass', value: '4.7998 × 10^22 kg' },
      { label: 'Orbital Period', value: '3.55 Earth days' },
      { label: 'Parent Planet', value: 'Jupiter' }
    ],
    images: ['/images/europa_1.jpg', '/images/europa_2.jpg'],
    thumbnail: '/images/europa_thumb.jpg'
  },
  {
    id: 'titan',
    name: 'Titan',
    type: 'moon',
    description: 'Titan is the largest moon of Saturn and the second-largest natural satellite in the Solar System. It is the only moon known to have a dense atmosphere, and the only known body in space, other than Earth, where clear evidence of stable bodies of surface liquid has been found.',
    facts: [
      { label: 'Diameter', value: '5,149 km' },
      { label: 'Mass', value: '1.3452 × 10^23 kg' },
      { label: 'Orbital Period', value: '15.95 Earth days' },
      { label: 'Parent Planet', value: 'Saturn' }
    ],
    images: ['/images/titan_1.jpg', '/images/titan_2.jpg'],
    thumbnail: '/images/titan_thumb.jpg'
  },
  {
    id: 'pluto',
    name: 'Pluto',
    type: 'dwarf_planet',
    description: 'Pluto is a dwarf planet in the Kuiper belt, a ring of bodies beyond Neptune. It was the first Kuiper belt object to be discovered. Pluto was discovered by Clyde Tombaugh in 1930 and was originally classified as the ninth planet from the Sun.',
    facts: [
      { label: 'Diameter', value: '2,376 km' },
      { label: 'Mass', value: '1.303 × 10^22 kg' },
      { label: 'Orbital Period', value: '248 Earth years' },
      { label: 'Moons', value: '5 (Charon, Styx, Nix, Kerberos, Hydra)' }
    ],
    images: ['/images/pluto_1.jpg', '/images/pluto_2.jpg'],
    orbitalPosition: 39.5, // AU (average)
    thumbnail: '/images/pluto_thumb.jpg'
  },
  {
    id: 'ceres',
    name: 'Ceres',
    type: 'dwarf_planet',
    description: 'Ceres is the largest object in the asteroid belt between the orbits of Mars and Jupiter. It is the only dwarf planet in the inner Solar System. Ceres is spherical, unlike the irregular shapes of smaller bodies in the asteroid belt.',
    facts: [
      { label: 'Diameter', value: '939 km' },
      { label: 'Mass', value: '9.3835 × 10^20 kg' },
      { label: 'Orbital Period', value: '4.6 Earth years' },
      { label: 'Moons', value: '0' }
    ],
    images: ['/images/ceres_1.jpg', '/images/ceres_2.jpg'],
    orbitalPosition: 2.77, // AU (average)
    thumbnail: '/images/ceres_thumb.jpg'
  },
  {
    id: 'makemake',
    name: 'Makemake',
    type: 'dwarf_planet',
    description: 'Makemake is a dwarf planet in the Kuiper belt. It is the third-largest known dwarf planet, after Eris and Pluto. Makemake has no known satellites, which makes it unique among the larger Kuiper belt objects.',
    facts: [
      { label: 'Diameter', value: '1,430 km' },
      { label: 'Mass', value: '3 × 10^21 kg' },
      { label: 'Orbital Period', value: '309 Earth years' },
      { label: 'Moons', value: '1 (S/2015 (136472) 1)' }
    ],
    images: ['/images/makemake_1.jpg', '/images/makemake_2.jpg'],
    orbitalPosition: 45.8, // AU (average)
    thumbnail: '/images/makemake_thumb.jpg'
  }
];
