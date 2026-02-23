import React, { useState } from 'react';
import Card from '../components/Card';
import InputField from '../components/InputField';
import Dropdown from '../components/Dropdown';
import { resources } from '../data/mockData';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(resources.map(r => r.category))];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="resources-page">
      <h1>Gardening Resources & Guides</h1>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <InputField
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: '1 1 250px' }}
        />
        <Dropdown
          label="Filter by Category"
          name="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          options={categories.map(cat => ({ value: cat, label: cat }))}
          style={{ flex: '0 1 200px' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {filteredResources.length > 0 ? (
          filteredResources.map(resource => (
            <Card key={resource.id} title={resource.title}>
              <p><strong>Category:</strong> {resource.category}</p>
              <p>{resource.content.substring(0, 150)}...</p>
              <a href="#" onClick={() => alert(`Viewing full resource: ${resource.title}`)} style={{ marginTop: '10px', display: 'inline-block' }}>Read More</a>
            </Card>
          ))
        ) : (
          <p>No resources found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default Resources;