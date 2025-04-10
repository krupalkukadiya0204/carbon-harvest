import React, { useState } from 'react';
import { Tabs, Card, Form, Input, Button, List, Tag, Modal } from 'antd';
import { MessageOutlined, QuestionCircleOutlined, FileTextOutlined } from '@ant-design/icons';
import './SupportPortal.css';

const { TabPane } = Tabs;
const { TextArea } = Input;

const SupportPortal = () => {
  const [ticketModal, setTicketModal] = useState(false);
  
  const faqData = [
    {
      question: "What is Article 6.4 DNA?",
      answer: "The Article 6.4 DNA (Designated National Authority) is the national body responsible for approving participation in Article 6.4 activities and ensuring alignment with sustainable development objectives."
    },
    {
      question: "How to establish an Article 6.4 DNA office?",
      answer: "Key considerations include: institutional capacity, legal framework, stakeholder engagement, and technical expertise. It's recommended to build upon existing CDM DNA structures where possible."
    },
    {
      question: "What are the challenges in DNA establishment?",
      answer: "Common challenges include: limited institutional capacity, need for technical expertise, coordination among stakeholders, and resource constraints. These can be addressed through capacity building and international support."
    }
  ];

  const mockTickets = [
    {
      id: "T-001",
      title: "Project Registration Issue",
      status: "Open",
      priority: "High"
    },
    {
      id: "T-002",
      title: "Verification Process Query",
      status: "In Progress",
      priority: "Medium"
    }
  ];

  const handleNewTicket = (values) => {
    console.log('New ticket:', values);
    setTicketModal(false);
  };

  return (
    <div className="support-portal-container">
      <h2>Support Portal</h2>
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={<span><QuestionCircleOutlined />FAQ</span>}
          key="1"
        >
          <List
            itemLayout="vertical"
            dataSource={faqData}
            renderItem={item => (
              <Card className="faq-card" size="small">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </Card>
            )}
          />
        </TabPane>

        <TabPane
          tab={<span><MessageOutlined />Support Tickets</span>}
          key="2"
        >
          <Button 
            type="primary" 
            onClick={() => setTicketModal(true)}
            className="new-ticket-btn"
          >
            Create New Ticket
          </Button>
          
          <List
            dataSource={mockTickets}
            renderItem={item => (
              <Card className="ticket-card" size="small">
                <div className="ticket-header">
                  <span className="ticket-id">{item.id}</span>
                  <Tag color={item.status === 'Open' ? 'green' : 'blue'}>
                    {item.status}
                  </Tag>
                </div>
                <h3>{item.title}</h3>
                <Tag color={item.priority === 'High' ? 'red' : 'orange'}>
                  {item.priority}
                </Tag>
              </Card>
            )}
          />
        </TabPane>

        <TabPane
          tab={<span><FileTextOutlined />Documentation</span>}
          key="3"
        >
          <div className="documentation-section">
            <Card title="Article 6.4 Guidelines">
              <ul>
                <li>Project Registration Process</li>
                <li>Validation Requirements</li>
                <li>Monitoring Guidelines</li>
                <li>Verification Procedures</li>
              </ul>
            </Card>
            <Card title="Technical Resources">
              <ul>
                <li>Baseline Calculation Methods</li>
                <li>Emission Reduction Calculation Tools</li>
                <li>Monitoring Templates</li>
                <li>Reporting Formats</li>
              </ul>
            </Card>
          </div>
        </TabPane>
      </Tabs>

      <Modal
        title="Create Support Ticket"
        visible={ticketModal}
        onCancel={() => setTicketModal(false)}
        footer={null}
      >
        <Form onFinish={handleNewTicket} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true }]}
          >
            <Input.Select>
              <Input.Select.Option value="low">Low</Input.Select.Option>
              <Input.Select.Option value="medium">Medium</Input.Select.Option>
              <Input.Select.Option value="high">High</Input.Select.Option>
            </Input.Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit Ticket
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SupportPortal;
