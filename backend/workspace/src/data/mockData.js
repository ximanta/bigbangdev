export const plants = [
  {
    id: 'p1',
    name: 'Tomato (Cherry)',
    type: 'Vegetable',
    sunlight: 'Full Sun',
    soil: 'Well-drained, rich',
    watering: 'Consistent, deep watering',
    pruning: 'Prune suckers regularly',
    zone: 'USDA Zone 3-9',
    imageUrl: 'https://via.placeholder.com/150/FF6347/FFFFFF?text=Cherry+Tomato',
    description: 'Easy to grow, produces small, sweet fruit. Ideal for containers or garden beds.'
  },
  {
    id: 'p2',
    name: 'Basil (Sweet)',
    type: 'Herb',
    sunlight: 'Partial Shade to Full Sun',
    soil: 'Moist, well-drained',
    watering: 'Keep soil consistently moist',
    pruning: 'Pinch off flowers to encourage leaf growth',
    zone: 'USDA Zone 4-10',
    imageUrl: 'https://via.placeholder.com/150/228B22/FFFFFF?text=Sweet+Basil',
    description: 'A popular herb with aromatic leaves, great for cooking. Requires warmth.'
  },
  {
    id: 'p3',
    name: 'Sunflower (Mammoth)',
    type: 'Flower',
    sunlight: 'Full Sun',
    soil: 'Adaptable, prefers well-drained',
    watering: 'Moderate, more when young',
    pruning: 'Minimal',
    zone: 'USDA Zone 2-11',
    imageUrl: 'https://via.placeholder.com/150/FFD700/FFFFFF?text=Sunflower',
    description: 'Tall, striking flowers that track the sun. Attracts pollinators and birds.'
  },
  {
    id: 'p4',
    name: 'Carrot (Danvers Half Long)',
    type: 'Vegetable',
    sunlight: 'Full Sun',
    soil: 'Loose, sandy loam',
    watering: 'Consistent moisture for root development',
    pruning: 'Thin seedlings',
    zone: 'USDA Zone 3-10',
    imageUrl: 'https://via.placeholder.com/150/FF8C00/FFFFFF?text=Carrot',
    description: 'Classic orange carrot, good for various soil types. Harvest when mature.'
  }
];

export const myGardenPlants = [
  { ...plants[0], id: 'mg1', plantedDate: '2023-04-15', status: 'Growing', notes: 'Growing well, started flowering last week.', progress: 70 },
  { ...plants[1], id: 'mg2', plantedDate: '2023-05-01', status: 'Harvesting', notes: 'Harvesting leaves regularly. Looks healthy.', progress: 90 }
];

export const tasks = [
  {
    id: 't1',
    plantId: 'mg1',
    plantName: 'Tomato (Cherry)',
    description: 'Water deeply',
    dueDate: '2023-07-20',
    priority: 'High',
    completed: false
  },
  {
    id: 't2',
    plantId: 'mg1',
    plantName: 'Tomato (Cherry)',
    description: 'Check for pests',
    dueDate: '2023-07-21',
    priority: 'Medium',
    completed: false
  },
  {
    id: 't3',
    plantId: 'mg2',
    plantName: 'Basil (Sweet)',
    description: 'Pinch off flower buds',
    dueDate: '2023-07-22',
    priority: 'High',
    completed: false
  },
  {
    id: 't4',
    plantId: 'mg2',
    plantName: 'Basil (Sweet)',
    description: 'Harvest leaves for pesto',
    dueDate: '2023-07-18',
    priority: 'Low',
    completed: true
  }
];

export const resources = [
  {
    id: 'r1',
    title: 'Beginner\'s Guide to Container Gardening',
    category: 'Guides',
    content: 'Container gardening is perfect for small spaces... [full content here]'
  },
  {
    id: 'r2',
    title: 'Dealing with Aphids Naturally',
    category: 'Pest Control',
    content: 'Aphids can be a nuisance, but here are some organic ways... [full content here]'
  },
  {
    id: 'r3',
    title: 'Understanding Soil pH',
    category: 'Soil Health',
    content: 'Soil pH affects nutrient availability... [full content here]'
  }
];