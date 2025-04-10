import React, { useState } from 'react';
import { Row, Col, Card, Tag, Button, Input, Space, Pagination } from 'antd';
import { SearchOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import './NewsRoom.css';

const { Search } = Input;

const NewsRoom = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { key: 'all', label: 'All News' },
    { key: 'carbon', label: 'Carbon Markets' },
    { key: 'agriculture', label: 'Agriculture' },
    { key: 'policy', label: 'Policy Updates' },
    { key: 'technology', label: 'Technology' }
  ];

  const mockNews = [
    {
      id: 1,
      title: "New Article 6.4 Guidelines Released",
      summary: "The UNFCCC has released new guidelines for Article 6.4 implementation...",
      category: "policy",
      date: "2025-02-20",
      author: "Climate Policy Team",
      image: "policy-update.jpg"
    },
    {
      id: 2,
      title: "Agricultural Carbon Credits Hit Record High",
      summary: "The market for agricultural carbon credits has reached new heights...",
      category: "carbon",
      date: "2025-02-19",
      author: "Market Analysis Team",
      image: "carbon-market.jpg"
    },
    {
      id: 3,
      title: "Smart Farming Technologies Boost Credit Generation",
      summary: "New IoT technologies are helping farmers generate more carbon credits...",
      category: "technology",
      date: "2025-02-18",
      author: "Tech Innovation Team",
      image: "smart-farming.jpg"
    }
  ];

  return (
    <div className="newsroom-container">
      <div className="newsroom-header">
        <h2>News & Updates</h2>
        <Search
          placeholder="Search news articles..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          className="news-search"
        />
      </div>

      <Space className="category-filters" wrap>
        {categories.map(category => (
          <Button
            key={category.key}
            type={activeCategory === category.key ? 'primary' : 'default'}
            onClick={() => setActiveCategory(category.key)}
          >
            {category.label}
          </Button>
        ))}
      </Space>

      <Row gutter={[24, 24]} className="news-grid">
        {mockNews.map(article => (
          <Col xs={24} sm={12} lg={8} key={article.id}>
            <Card
              className="news-card"
              cover={
                <div 
                  className="news-image"
                  style={{ backgroundImage: `url(${article.image})` }}
                />
              }
            >
              <Tag color="blue">{article.category}</Tag>
              <h3>{article.title}</h3>
              <p>{article.summary}</p>
              
              <div className="article-meta">
                <span>
                  <CalendarOutlined /> {article.date}
                </span>
                <span>
                  <UserOutlined /> {article.author}
                </span>
              </div>
              
              <Button type="primary" block>
                Read More
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="pagination-container">
        <Pagination 
          defaultCurrent={1} 
          total={50}
          showSizeChanger
          showQuickJumper
        />
      </div>
    </div>
  );
};

export default NewsRoom;
