import React from 'react';
import { Carousel, Card, Button, Row, Col } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import './AdSection.css';

const AdSection = () => {
  const featuredAds = [
    {
      id: 1,
      title: "Carbon Credit Trading Platform",
      description: "Trade verified carbon credits directly with farmers and project developers",
      image: "/images/trading-platform.jpg",
      cta: "Start Trading",
      type: "primary"
    },
    {
      id: 2,
      title: "Crop Insurance Coverage",
      description: "Protect your agricultural investments with comprehensive insurance plans",
      image: "/images/crop-insurance.jpg",
      cta: "Get Coverage",
      type: "featured"
    },
    {
      id: 3,
      title: "Sustainable Farming Practices",
      description: "Learn how to implement sustainable farming practices and earn carbon credits",
      image: "/images/sustainable-farming.jpg",
      cta: "Learn More",
      type: "secondary"
    }
  ];

  const promotionalBanners = [
    {
      id: 1,
      title: "Special Offer",
      content: "Get 20% off on your first carbon credit verification",
      backgroundColor: "#e74c3c",
      textColor: "#ffffff"
    },
    {
      id: 2,
      title: "Limited Time",
      content: "Free consultation for new agricultural projects",
      backgroundColor: "#27ae60",
      textColor: "#ffffff"
    }
  ];

  return (
    <div className="ad-section">
      {/* Promotional Banner Carousel */}
      <Carousel autoplay className="promo-carousel">
        {promotionalBanners.map(banner => (
          <div key={banner.id}>
            <div 
              className="promo-banner"
              style={{ 
                backgroundColor: banner.backgroundColor,
                color: banner.textColor
              }}
            >
              <h3>{banner.title}</h3>
              <p>{banner.content}</p>
              <Button type="primary" ghost>
                Learn More <ArrowRightOutlined />
              </Button>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Featured Ads Grid */}
      <div className="featured-ads">
        <h2>Featured Opportunities</h2>
        <Row gutter={[24, 24]}>
          {featuredAds.map(ad => (
            <Col xs={24} md={8} key={ad.id}>
              <Card 
                className={`ad-card ${ad.type}`}
                cover={
                  <div 
                    className="ad-image"
                    style={{ backgroundImage: `url(${ad.image})` }}
                  />
                }
              >
                <h3>{ad.title}</h3>
                <p>{ad.description}</p>
                <Button type="primary" block>
                  {ad.cta} <ArrowRightOutlined />
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Partner Section */}
      <div className="partner-section">
        <h2>Trusted By Industry Leaders</h2>
        <div className="partner-logos">
          {/* Add partner logos here */}
          <div className="partner-logo">Partner 1</div>
          <div className="partner-logo">Partner 2</div>
          <div className="partner-logo">Partner 3</div>
          <div className="partner-logo">Partner 4</div>
        </div>
      </div>

      {/* Call to Action */}
      <Card className="cta-section">
        <Row align="middle" justify="space-between">
          <Col xs={24} md={16}>
            <h2>Ready to Start Your Carbon Credit Journey?</h2>
            <p>Join thousands of farmers and businesses already benefiting from our platform</p>
          </Col>
          <Col xs={24} md={8} className="cta-buttons">
            <Button type="primary" size="large">
              Get Started Now
            </Button>
            <Button type="link" size="large">
              Schedule Demo
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default AdSection;
