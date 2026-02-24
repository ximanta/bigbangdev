export const solarSystemData = {
  planets: [
    {
      id: 'mercury',
      name: 'Mercury',
      description: 'Mercury is the smallest planet in our solar system and closest to the Sun. It is a terrestrial planet with a heavily cratered surface, much like Earth\'s Moon. Its thin atmosphere, or exosphere, is composed mostly of oxygen, sodium, hydrogen, helium, and potassium.',
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/4/4a/Mercury_in_color_-_Proportionally_color-calibrated_image.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Mercury_by_MESSENGER.jpg/800px-Mercury_by_MESSENGER.jpg'
      ],
      facts: {
        'Diameter': '4,879 km',
        'Distance from Sun': '57.9 million km',
        'Orbital Period': '88 Earth days',
        'Day Length': '59 Earth days',
        'Surface Temperature': '-173°C to 427°C'
      },
      moons: []
    },
    {
      id: 'venus',
      name: 'Venus',
      description: 'Venus is the second planet from the Sun and is sometimes called Earth\'s \'sister planet\' because of their similar size and mass. It has a thick, toxic atmosphere filled with carbon dioxide and is shrouded in thick, yellowish clouds of sulfuric acid, trapping heat and causing a runaway greenhouse effect.',
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/8/85/Venus_transparent.png',
        'https://upload.wikimedia.org/wikipedia/commons/e/e5/Venus-real_color.jpg'
      ],
      facts: {
        'Diameter': '12,104 km',
        'Distance from Sun': '108.2 million km',
        'Orbital Period': '225 Earth days',
        'Day Length': '243 Earth days',
        'Surface Temperature': '462°C'
      },
      moons: []
    },
    {
      id: 'earth',
      name: 'Earth',
      description: 'Our home planet, Earth, is the third planet from the Sun and the only astronomical object known to harbor life. It is the densest planet in the Solar System and the largest of the four terrestrial planets. Earth\'s atmosphere is 78% nitrogen, 21% oxygen, and other trace gases.',
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/9/97/The_Earth_seen_from_Apollo_17.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/a/aa/Earth_from_Apollo_17.jpg'
      ],
      facts: {
        'Diameter': '12,742 km',
        'Distance from Sun': '149.6 million km',
        'Orbital Period': '365.25 Earth days',
        'Day Length': '24 hours',
        'Surface Temperature': '-89°C to 58°C'
      },
      moons: [
        {
          id: 'the-moon',
          name: 'The Moon',
          description: 'Earth\'s Moon is the fifth largest moon in the Solar System. It is thought to have formed after a giant impact between Earth and a Mars-sized body. It stabilizes Earth\'s wobble, which helps to moderate our climate.',
          images: [
            'https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/e/e0/FullMoon2010.jpg'
          ],
          facts: {
            'Diameter': '3,474 km',
            'Orbital Period (Earth)': '27.3 Earth days',
            'Surface Temperature': '-233°C to 123°C'
          }
        }
      ]
    },
    {
      id: 'mars',
      name: 'Mars',
      description: 'Mars is the fourth planet from the Sun and the second smallest planet in the Solar System after Mercury. It is often referred to as the \'Red Planet\' because of its reddish appearance, which is due to iron oxide prevalent on its surface. Mars has a thin atmosphere, primarily carbon dioxide.',
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Mars_from_Hubble.jpg/800px-Mars_from_Hubble.jpg'
      ],
      facts: {
        'Diameter': '6,779 km',
        'Distance from Sun': '227.9 million km',
        'Orbital Period': '687 Earth days',
        'Day Length': '24.6 hours',
        'Surface Temperature': '-153°C to 20°C'
      },
      moons: [
        {
          id: 'phobos',
          name: 'Phobos',
          description: 'Phobos is the larger and inner of the two moons of Mars. It is irregularly shaped and heavily cratered. It is gradually spiraling inwards and is expected to either crash into Mars or break up into a planetary ring in 30 to 50 million years.',
          images: [
            'https://upload.wikimedia.org/wikipedia/commons/5/5c/Phobos_colour_2008.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/c/c9/Phobos_by_Mars_Express.jpg'
          ],
          facts: {
            'Diameter': '22.2 km',
            'Orbital Period (Mars)': '0.32 Earth days'
          }
        },
        {
          id: 'deimos',
          name: 'Deimos',
          description: 'Deimos is the smaller and outer of the two moons of Mars. Like Phobos, it is irregularly shaped and heavily cratered. Deimos is thought to be a captured asteroid.',
          images: [
            'https://upload.wikimedia.org/wikipedia/commons/8/87/Deimos_by_Mars_Express_HRSC.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Deimos_from_Viking_2_Orbiter.jpg/800px-Deimos_from_Viking_2_Orbiter.jpg'
          ],
          facts: {
            'Diameter': '12.4 km',
            'Orbital Period (Mars)': '1.26 Earth days'
          }
        }
      ]
    },
    {
      id: 'jupiter',
      name: 'Jupiter',
      description: 'Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass more than two and a half times that of all the other planets in the Solar System combined. It is known for its Great Red Spot, a giant storm larger than Earth.',
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/2/23/Jupiter-transparent.png'
      ],
      facts: {
        'Diameter': '139,820 km',
        'Distance from Sun': '778.5 million km',
        'Orbital Period': '11.86 Earth years',
        'Day Length': '9.9 hours',
        'Surface Temperature': '-145°C (cloud tops)'
      },
      moons: [
        {
          id: 'io',
          name: 'Io',
          description: 'Io is the most volcanically active world in the Solar System, with hundreds of volcanoes and molten silicate lava flows. This extreme activity is due to the tidal forces exerted by Jupiter and the other Galilean moons.',
          images: [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Io_from_Juno.jpg/800px-Io_from_Juno.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/d/d7/Io_full_disc_true.jpg'
          ],
          facts: {
            'Diameter': '3,643 km',
            'Orbital Period (Jupiter)': '1.77 Earth days'
          }
        },
        {
          id: 'europa',
          name: 'Europa',
          description: 'Europa is slightly smaller than Earth\'s Moon and is primarily composed of silicate rock and has a water-ice crust. Evidence suggests an ocean of salty liquid water beneath its surface, making it a prime candidate for extraterrestrial life.',
          images: [
            'https://upload.wikimedia.org/wikipedia/commons/5/51/Europa-moon.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Europa_moon.jpg/800px-Europa_moon.jpg'
          ],
          facts: {
            'Diameter': '3,121 km',
            'Orbital Period (Jupiter)': '3.55 Earth days'
          }
        },
        {
          id: 'ganymede',
          name: 'Ganymede',
          description: 'Ganymede is the largest moon in the Solar System and is larger than the planet Mercury. It is the only moon known to have its own magnetic field. It is composed of roughly equal amounts of silicate rock and water ice.',
          images: [
            'https://upload.wikimedia.org/wikipedia/commons/a/ae/Ganymede_--_Juno_Perijove_34_%28enhanced_color%29.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Ganymede_full_disk.jpg/800px-Ganymede_full_disk.jpg'
          ],
          facts: {
            'Diameter': '5,262 km',
            'Orbital Period (Jupiter)': '7.15 Earth days'
          }
        },
        {
          id: 'callisto',
          name: 'Callisto',
          description: 'Callisto is the third-largest moon in the Solar System and is similar in size to Mercury. It is heavily cratered and has a very old, dark surface. Unlike the other Galilean moons, Callisto shows no evidence of significant tidal heating or differentiation.',
          images: [
            'https://upload.wikimedia.org/wikipedia/commons/e/ec/Callisto_by_Galileo.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Callisto_cutout.png/800px-Callisto_cutout.png'
          ],
          facts: {
            'Diameter': '4,821 km',
            'Orbital Period (Jupiter)': '16.69 Earth days'
          }
        }
      ]
    },
    {
      id: 'saturn',
      name: 'Saturn',
      description: 'Saturn is the sixth planet from the Sun and the second-largest in the Solar System, after Jupiter. It is a gas giant best known for its prominent ring system, which is made up of billions of small chunks of ice and rocky material.',
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox_-_NASA.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Saturn_transparent.png/800px-Saturn_transparent.png'
      ],
      facts: {
        'Diameter': '116,460 km',
        'Distance from Sun': '1.4 billion km',
        'Orbital Period': '29.45 Earth years',
        'Day Length': '10.7 hours',
        'Surface Temperature': '-178°C (cloud tops)'
      },
      moons: [
        {
          id: 'titan',
          name: 'Titan',
          description: 'Titan is Saturn\'s largest moon and the second largest moon in the Solar System. It is the only moon known to have a dense atmosphere, and the only known body in space, other than Earth, where clear evidence of stable bodies of surface liquid has been found.',
          images: [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Titan_in_true_color.jpg/800px-Titan_in_true_color.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/b/b3/Titan_true_color.jpg'
          ],
          facts: {
            'Diameter': '5,149 km',
            'Orbital Period (Saturn)': '15.95 Earth days'
          }
        },
        {
          id: 'enceladus',
          name: 'Enceladus',
          description: 'Enceladus is a small, icy moon of Saturn known for its geysers of water vapor and ice particles erupting from its south polar region. These plumes suggest the presence of a subsurface ocean of liquid water, making it another potential candidate for life.',
          images: [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Enceladus_PIA07793.jpg/800px-Enceladus_PIA07793.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/7/77/Enceladus_full_disk_PIA07793.jpg'
          ],
          facts: {
            'Diameter': '504 km',
            'Orbital Period (Saturn)': '1.37 Earth days'
          }
        }
      ]
    },
    {
      id: 'uranus',
      name: 'Uranus',
      description: 'Uranus is the seventh planet from the Sun, an ice giant. It has the third-largest planetary radius and fourth-largest planetary mass in the Solar System. Uranus is unique for rotating on its side, with its axis tilted nearly parallel to its orbit.',
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/3/36/Uranus_transparent.png'
      ],
      facts: {
        'Diameter': '50,724 km',
        'Distance from Sun': '2.9 billion km',
        'Orbital Period': '84 Earth years',
        'Day Length': '17.2 hours',
        'Surface Temperature': '-224°C (cloud tops)'
      },
      moons: [
        {
          id: 'titania',
          name: 'Titania',
          description: 'Titania is the largest of Uranus\'s moons and the eighth largest moon in the Solar System. It is composed of roughly equal amounts of ice and rock. Its surface is relatively dark and shows evidence of both impact craters and tectonic activity.',
          images: [
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Titania_from_Voyager_2.jpg/800px-Titania_from_Voyager_2.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/f/f9/Titania_full_disk.jpg'
          ],
          facts: {
            'Diameter': '1,578 km',
            'Orbital Period (Uranus)': '8.7 Earth days'
          }
        }
      ]
    },
    {
      id: 'neptune',
      name: 'Neptune',
      description: 'Neptune is the eighth and farthest known planet from the Sun in the Solar System. It is an ice giant and is the fourth-largest planet by diameter, the third-most-massive planet, and the densest giant planet. Neptune has the strongest sustained winds of any planet in the Solar System.',
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/0/06/Neptune_-_Voyager_2_%2829347980845%29_flatten_high_res.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Neptune_transparent.png/800px-Neptune_transparent.png'
      ],
      facts: {
        'Diameter': '49,244 km',
        'Distance from Sun': '4.5 billion km',
        'Orbital Period': '164.8 Earth years',
        'Day Length': '16.1 hours',
        'Surface Temperature': '-218°C (cloud tops)'
      },
      moons: [
        {
          id: 'triton',
          name: 'Triton',
          description: 'Triton is the largest moon of Neptune and is unusual because it orbits in a retrograde direction (opposite to Neptune\'s rotation). It is one of the coldest objects in the Solar System and has active geysers that erupt nitrogen ice and dust.',
          images: [
            'https://upload.wikimedia.org/wikipedia/commons/a/a2/Triton_color_image_by_Voyager_2.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Triton_from_Voyager_2.jpg/800px-Triton_from_Voyager_2.jpg'
          ],
          facts: {
            'Diameter': '2,706 km',
            'Orbital Period (Neptune)': '5.88 Earth days'
          }
        }
      ]
    }
  ]
};

export function getPlanetById(id) {
  return solarSystemData.planets.find(planet => planet.id === id);
}

export function getMoonById(id) {
  for (const planet of solarSystemData.planets) {
    const moon = planet.moons.find(m => m.id === id);
    if (moon) {
      return moon;
    }
  }
  return null;
}