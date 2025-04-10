import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Steps, Form, Input, Select, Button, Row, Col, Modal, Alert } from 'antd';
import { SafetyOutlined, FileProtectOutlined } from '@ant-design/icons';
import './InsurancePortal.css';

const { Option } = Select;
const { TextArea } = Input;

// InsuranceCard component definition
const InsuranceCard = ({ type, onGetQuote }) => (
  <Card className="insurance-card">
    <div className="insurance-icon">{type.icon}</div>
    <h3>{type.title}</h3>
    <p>{type.description}</p>
    <div className="coverage-list">
      <h4>Coverage Includes:</h4>
      <ul>
        {type.coverage.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
    <Button 
      type="primary" 
      block 
      onClick={onGetQuote}
    >
      Get Quote
    </Button>
  </Card>
);

// PropTypes validation for InsuranceCard
InsuranceCard.propTypes = {
  type: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    coverage: PropTypes.arrayOf(PropTypes.string).isRequired,
    icon: PropTypes.node.isRequired
  }).isRequired,
  onGetQuote: PropTypes.func.isRequired
};

const InsurancePortal = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quoteModal, setQuoteModal] = useState(false);
  const [form] = Form.useForm();

  const insuranceTypes = [
    {
      title: "Crop Insurance",
      description: "Protect against crop failure, natural disasters, and yield shortfalls",
      coverage: ["Natural disasters", "Pest damage", "Disease outbreaks", "Yield shortfalls"],
      icon: <SafetyOutlined />
    },
    {
      title: "Carbon Credit Insurance",
      description: "Protect your carbon credit investments and verify emission reductions",
      coverage: ["Verification failures", "Project risks", "Market price fluctuations"],
      icon: <FileProtectOutlined />
    }
  ];

  const handleGetQuote = (values) => {
    console.log('Insurance quote request:', values);
    setQuoteModal(false);
    setCurrentStep(1);
  };



  const steps = [
    {
      title: 'Select Insurance',
      content: (
        <Row gutter={[24, 24]}>
          {insuranceTypes.map((type, index) => (
            <Col xs={24} md={12} key={index}>
              <InsuranceCard 
                type={type} 
                onGetQuote={() => setQuoteModal(true)}
              />
            </Col>
          ))}
        </Row>
      )
    },
    {
      title: 'Review Quote',
      content: (
        <Card className="quote-review">
          <Alert
            message="Quote Generated Successfully"
            description="Your insurance quote has been generated based on your project details."
            type="success"
            showIcon
          />
          <div className="quote-details">
            <h3>Premium Estimate: $2,500/year</h3>
            <p>Coverage Amount: Up to $50,000</p>
            <p>Deductible: $1,000</p>
          </div>
          <Button type="primary" onClick={() => setCurrentStep(2)}>
            Proceed to Application
          </Button>
        </Card>
      )
    },
    {
      title: 'Complete Application',
      content: (
        <Card className="application-form">
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Project Name" required>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Project Location" required>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Coverage Start Date" required>
                  <Input type="date" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Coverage Duration" required>
                  <Select>
                    <Option value="1">1 Year</Option>
                    <Option value="2">2 Years</Option>
                    <Option value="3">3 Years</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Button type="primary" block>
              Submit Application
            </Button>
          </Form>
        </Card>
      )
    }
  ];

  return (
    <div className="insurance-portal">
      <div className="portal-header">
        <h2>Project Insurance</h2>
        <p>Protect your agricultural and carbon credit projects</p>
      </div>

      <Steps
        current={currentStep}
        items={steps.map(item => ({ title: item.title }))}
        className="insurance-steps"
      />

      <div className="steps-content">
        {steps[currentStep].content}
      </div>

      <Modal
        title="Get Insurance Quote"
        visible={quoteModal}
        onCancel={() => setQuoteModal(false)}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleGetQuote}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="projectType"
                label="Project Type"
                rules={[{ required: true }]}
              >
                <Select>
                  <Option value="agriculture">Agricultural Project</Option>
                  <Option value="carbon">Carbon Credit Project</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="coverageAmount"
                label="Desired Coverage Amount"
                rules={[{ required: true }]}
              >
                <Input prefix="$" type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="projectDescription"
            label="Project Description"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="riskFactors"
            label="Known Risk Factors"
            rules={[{ required: true }]}
          >
            <Select mode="multiple">
              <Option value="weather">Extreme Weather</Option>
              <Option value="pests">Pests and Diseases</Option>
              <Option value="market">Market Fluctuations</Option>
              <Option value="verification">Verification Risks</Option>
            </Select>
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Calculate Quote
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default InsurancePortal;
