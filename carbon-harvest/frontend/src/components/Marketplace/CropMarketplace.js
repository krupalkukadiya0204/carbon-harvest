import React, { useState } from 'react';
import { Card, Row, Col, Button, Modal, Form, Input, Select, Tag } from 'antd';
import './CropMarketplace.css';

const { Option } = Select;

const CropMarketplace = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const mockListings = [
    {
      id: 1,
      title: 'Organic Rice Farming Project',
      location: 'Karnataka, India',
      carbonCredits: 500,
      price: 25,
      type: 'AERs',
      status: 'Verified'
    },
    {
      id: 2,
      title: 'Sustainable Wheat Cultivation',
      location: 'Punjab, India',
      carbonCredits: 750,
      price: 30,
      type: 'MCUs',
      status: 'Pending'
    }
  ];

  const handleCreateListing = (values) => {
    console.log('New listing:', values);
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="marketplace-container">
      <div className="marketplace-header">
        <h2>Carbon Credit Marketplace</h2>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Create New Listing
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {mockListings.map(listing => (
          <Col xs={24} sm={12} md={8} key={listing.id}>
            <Card 
              className="listing-card"
              title={listing.title}
              extra={<Tag color={listing.status === 'Verified' ? 'green' : 'orange'}>{listing.status}</Tag>}
            >
              <p><strong>Location:</strong> {listing.location}</p>
              <p><strong>Carbon Credits:</strong> {listing.carbonCredits} tons</p>
              <p><strong>Price:</strong> ${listing.price}/ton</p>
              <p><strong>Type:</strong> {listing.type}</p>
              <Button type="primary" block>View Details</Button>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Create New Listing"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateListing}
        >
          <Form.Item
            name="title"
            label="Project Title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="carbonCredits"
            label="Carbon Credits (tons)"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price per ton ($)"
            rules={[{ required: true }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="type"
            label="Credit Type"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="AERs">Authorized Emission Reductions (AERs)</Option>
              <Option value="MCUs">Mitigation Contribution Units (MCUs)</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Create Listing
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CropMarketplace;
