import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, Button, Tag, Modal, Form, Input, Select, Avatar } from 'antd';
import { UserOutlined, CalendarOutlined, EditOutlined, LikeOutlined, CommentOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import './BlogSystem.css';

const { TextArea } = Input;
const { Option } = Select;

// PostCard component definition
const PostCard = ({ post }) => (
  <Card className="blog-card">
    <div className="blog-header">
      <div className="author-info">
        <Avatar icon={<UserOutlined />} />
        <div>
          <h4>{post.author.name}</h4>
          <Tag color={post.author.type === 'Expert' ? 'gold' : 'green'}>
            {post.author.type}
          </Tag>
        </div>
      </div>
      <span className="post-date">
        <CalendarOutlined /> {post.date}
      </span>
    </div>

    <h2>{post.title}</h2>
    
    <div className="tag-container">
      {post.tags.map(tag => (
        <Tag key={tag} color="blue">{tag}</Tag>
      ))}
    </div>

    <div className="post-preview">
      <ReactMarkdown>{post.content.substring(0, 200)}...</ReactMarkdown>
    </div>

    <div className="post-actions">
      <Button type="text" icon={<LikeOutlined />}>
        {post.likes} Likes
      </Button>
      <Button type="text" icon={<CommentOutlined />}>
        {post.comments} Comments
      </Button>
      <Button type="primary">Read More</Button>
    </div>
  </Card>
);

// PropTypes validation for PostCard
PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      credentials: PropTypes.string.isRequired
    }).isRequired,
    date: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired
  }).isRequired
};

const BlogSystem = () => {
  const [createPostModal, setCreatePostModal] = useState(false);

  const mockPosts = [
    {
      id: 1,
      title: "Maximizing Carbon Credits in Agriculture",
      content: "# Best Practices for Agricultural Carbon Credits\n\nIn my experience working with farmers...",
      author: {
        name: "Dr. Sarah Johnson",
        type: "Expert",
        credentials: "Agricultural Scientist, PhD"
      },
      date: "2025-02-20",
      tags: ["Agriculture", "Carbon Credits", "Best Practices"],
      likes: 45,
      comments: 12
    },
    {
      id: 2,
      title: "My Journey with Sustainable Farming",
      content: "As a farmer implementing sustainable practices...",
      author: {
        name: "Rajesh Kumar",
        type: "Farmer",
        credentials: "15 years farming experience"
      },
      date: "2025-02-19",
      tags: ["Experience", "Sustainable Farming"],
      likes: 32,
      comments: 8
    }
  ];

  const handleCreatePost = (values) => {
    console.log('New blog post:', values);
    setCreatePostModal(false);
  };



  return (
    <div className="blog-container">
      <div className="blog-header-section">
        <h2>Community Blog</h2>
        <div className="blog-actions">
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => setCreatePostModal(true)}
          >
            Create Post
          </Button>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={18}>
          {mockPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </Col>
        
        <Col xs={24} md={6}>
          <Card title="Popular Tags" className="sidebar-card">
            <div className="tag-cloud">
              {['Carbon Credits', 'Agriculture', 'Sustainability', 'Technology', 'Policy'].map(tag => (
                <Tag key={tag} color="blue" className="clickable">{tag}</Tag>
              ))}
            </div>
          </Card>

          <Card title="Top Contributors" className="sidebar-card">
            <div className="contributors-list">
              {['Dr. Sarah Johnson', 'Rajesh Kumar', 'Emma Smith'].map(name => (
                <div key={name} className="contributor-item">
                  <Avatar icon={<UserOutlined />} />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Modal
        title="Create New Blog Post"
        visible={createPostModal}
        onCancel={() => setCreatePostModal(false)}
        footer={null}
        width={800}
      >
        <Form layout="vertical" onFinish={handleCreatePost}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true }]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Content (Supports Markdown)"
            rules={[{ required: true }]}
          >
            <TextArea rows={10} />
          </Form.Item>

          <Form.Item
            name="tags"
            label="Tags"
            rules={[{ required: true }]}
          >
            <Select mode="tags" placeholder="Add tags">
              <Option value="agriculture">Agriculture</Option>
              <Option value="carbon-credits">Carbon Credits</Option>
              <Option value="sustainability">Sustainability</Option>
              <Option value="technology">Technology</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Publish Post
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      credentials: PropTypes.string.isRequired
    }).isRequired,
    date: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired
  }).isRequired
};

export default BlogSystem;
