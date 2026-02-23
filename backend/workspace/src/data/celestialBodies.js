const celestialBodies = [
  {
    id: 'earth',
    name: 'Earth',
    type: 'Planet',
    description: 'Our home planet, Earth, is the third planet from the Sun and the only place in the universe known to harbor life.',
    imageUrl: 'https://cdn.pixabay.com/photo/2017/11/07/00/07/earth-2925154_960_720.jpg',
    videoUrl: 'https://www.youtube.com/embed/wT_PjQ_0Fm4?si=P85Tj9-6019m1B7P',
    facts: [
      'Diameter: 12,742 km',
      'Orbital Period: 365.25 days',
      'Moons: 1 (The Moon)',
      'Known for: Liquid water, diverse life'
    ],
    position: { x: 0.2, y: 0.3 }
  },
  {
    id: 'mars',
    name: 'Mars',
    type: 'Planet',
    description: 'Mars is the fourth planet from the Sun and the second-smallest planet in the Solar System, after Mercury. It is often referred to as the Red Planet.',
    imageUrl: 'https://cdn.pixabay.com/photo/2016/01/03/00/43/mars-1118228_960_720.jpg',
    videoUrl: 'https://www.youtube.com/embed/D8pnmwOXfC4?si=VpW9f07-r95s2lD5',
    facts: [
      'Diameter: 6,779 km',
      'Orbital Period: 687 Earth days',
      'Moons: 2 (Phobos, Deimos)',
      'Known for: Red color, polar ice caps'
    ],
    position: { x: 0.7, y: 0.5 }
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    type: 'Planet',
    description: 'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun.',
    imageUrl: 'https://cdn.pixabay.com/photo/2016/01/03/00/43/jupiter-1118227_960_720.jpg',
    videoUrl: 'https://www.youtube.com/embed/P_P_K50Lw1U?si=26-V8_vjHjS3_0nK',
    facts: [
      'Diameter: 139,820 km',
      'Orbital Period: 11.86 Earth years',
      'Moons: 95 (known)',
      'Known for: Great Red Spot, powerful storms'
    ],
    position: { x: 0.1, y: 0.8 }
  },
  {
    id: 'moon',
    name: 'Moon',
    type: 'Moon',
    description: 'The Moon is Earth\'s only natural satellite. It is the fifth largest satellite in the Solar System and the largest planetary satellite relative to the size of the planet it orbits.',
    imageUrl: 'https://cdn.pixabay.com/photo/2017/08/23/07/20/moon-2671569_960_720.jpg',
    videoUrl: null,
    facts: [
      'Diameter: 3,474 km',
      'Orbital Period: 27.3 Earth days',
      'Parent Planet: Earth',
      'Known for: Lunar phases, tides'
    ],
    position: { x: 0.3, y: 0.2 }
  },
  {
    id: 'sun',
    name: 'Sun',
    type: 'Star',
    description: 'The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, with internal convective motion that generates a magnetic field.',
    imageUrl: 'https://cdn.pixabay.com/photo/2016/01/03/00/43/sun-1118229_960_720.jpg',
    videoUrl: 'https://www.youtube.com/embed/2HoTK1Q062Q?si=iY2GvE_082r2tY-w',
    facts: [
      'Diameter: 1.392 million km',
      'Age: 4.6 billion years',
      'Composition: Hydrogen (73%), Helium (25%)',
      'Known for: Providing light and heat to Earth'
    ],
    position: { x: 0.5, y: 0.5 }
  },
  {
    id: 'andromeda',
    name: 'Andromeda Galaxy',
    type: 'Galaxy',
    description: 'The Andromeda Galaxy is the closest large galaxy to the Milky Way and is expected to collide with the Milky Way around 4.5 billion years from now.',
    imageUrl: 'https://cdn.pixabay.com/photo/2017/02/15/10/47/galaxy-2068393_960_720.jpg',
    videoUrl: null,
    facts: [
      'Distance from Earth: 2.5 million light-years',
      'Diameter: 220,000 light-years',
      'Stars: ~1 trillion',
      'Known for: Closest large spiral galaxy'
    ],
    position: { x: 0.8, y: 0.1 }
  }
];

export default celestialBodies;