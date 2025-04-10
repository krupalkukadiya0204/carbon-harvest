/**
 * @file About Us Component - Provides comprehensive information about Carbon Harvest
 * @description A responsive and accessible component that showcases company information,
 * mission, values, and team members
 */

import React from 'react';
import PageLayout from './layouts/PageLayout';
import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import './AboutUs.css';

/**
 * AboutUs Component - Displays company information and mission
 * @returns {JSX.Element} About us page component
 */
const AboutUs = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <PageLayout title="About Carbon Harvest">
            <div className="about-us">
                <div className="hero-section" style={{backgroundImage: 'url(/images/about/mission.jpg)'}}>
                    <div className="hero-overlay"></div>
                    <motion.div 
                        className="hero-content"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="hero-title">Transforming Agriculture for a Sustainable Future</h1>
                        <p className="hero-subtitle">Pioneering sustainable solutions for a greener tomorrow</p>
                        <div className="hero-cta">
                            <button className="primary-button">Learn More</button>
                            <button className="secondary-button">Contact Us</button>
                        </div>
                    </motion.div>
                </div>

                <div className="content-section">
                    {/* Mission Section */}
                    <motion.section 
                        className="mission-section"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        style={{
                            backgroundImage: 'url(/images/about/sustainable-farming.jpg)',
                            backgroundAttachment: 'fixed',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover'
                        }}
                    >
                        <h2 className="section-title">Our Mission</h2>
                        <div className="mission-content">
                            <div className="mission-text">
                                <p className="mission-main">We are dedicated to revolutionizing agriculture through innovative carbon credit solutions and sustainable practices.</p>
                                <div className="mission-points">
                                    <div className="mission-point">
                                        <span className="point-icon">🌱</span>
                                        <p>Empowering farmers with sustainable practices</p>
                                    </div>
                                    <div className="mission-point">
                                        <span className="point-icon">🤝</span>
                                        <p>Connecting stakeholders in the carbon credit ecosystem</p>
                                    </div>
                                    <div className="mission-point">
                                        <span className="point-icon">📊</span>
                                        <p>Providing transparent and verifiable carbon data</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mission-image">
                                <img 
                                    src="/images/mission-image.jpg" 
                                    alt="Team working on sustainable solutions" 
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </motion.section>

                    {/* Impact Section */}
                    <motion.section 
                        className="impact-section"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-title">Our Impact</h2>
                        <div className="impact-grid">
                            {[
                                { number: '1000+', label: 'Farmers Empowered', icon: '👨‍🌾' },
                                { number: '50K+', label: 'Carbon Credits Generated', icon: '🌿' },
                                { number: '30%', label: 'Emission Reduction', icon: '📊' },
                                { number: '100+', label: 'Partner Organizations', icon: '🤝' }
                            ].map((stat, index) => (
                                <motion.div 
                                    key={index} 
                                    className="impact-card"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <span className="impact-icon">{stat.icon}</span>
                                    <h3 className="impact-number">{stat.number}</h3>
                                    <p className="impact-label">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Values Section */}
                    <motion.section 
                        className="values-section"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-title">Our Values</h2>
                        <div className="values-grid">
                            {[
                                { 
                                    title: 'Innovation', 
                                    icon: '🔬', 
                                    description: 'Pushing boundaries with IoT-verified carbon credits',
                                    details: ['Smart IoT integration', 'Real-time monitoring', 'Data-driven insights']
                                },
                                { 
                                    title: 'Sustainability', 
                                    icon: '🌱', 
                                    description: 'Promoting eco-friendly farming practices',
                                    details: ['Regenerative agriculture', 'Resource optimization', 'Biodiversity protection']
                                },
                                { 
                                    title: 'Transparency', 
                                    icon: '🔍', 
                                    description: 'Building trust through verifiable data',
                                    details: ['Blockchain verification', 'Public reporting', 'Audit trails']
                                },
                                { 
                                    title: 'Collaboration', 
                                    icon: '🤝', 
                                    description: 'Connecting stakeholders for mutual success',
                                    details: ['Community engagement', 'Knowledge sharing', 'Partnership building']
                                }
                            ].map((value, index) => (
                                <motion.div 
                                    key={index} 
                                    className="value-card"
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <span className="value-icon">{value.icon}</span>
                                    <h3 className="value-title">{value.title}</h3>
                                    <p className="value-description">{value.description}</p>
                                    <ul className="value-details">
                                        {value.details.map((detail, i) => (
                                            <li key={i}>{detail}</li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Team Section */}
                    <motion.section 
                        className="team-section"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-title">Our Team</h2>
                        <div className="team-grid">
                            {[
                                { 
                                    name: 'John Doe', 
                                    role: 'CEO & Founder', 
                                    image: '/images/team/john.jpg',
                                    bio: 'Passionate about sustainable agriculture and technology innovation',
                                    social: {
                                        linkedin: 'https://linkedin.com/in/johndoe',
                                        twitter: 'https://twitter.com/johndoe'
                                    }
                                },
                                { 
                                    name: 'Jane Smith', 
                                    role: 'Head of Technology', 
                                    image: '/images/team/jane.jpg',
                                    bio: 'Expert in IoT solutions and blockchain technology',
                                    social: {
                                        linkedin: 'https://linkedin.com/in/janesmith',
                                        github: 'https://github.com/janesmith'
                                    }
                                },
                                { 
                                    name: 'Mike Johnson', 
                                    role: 'Lead Developer', 
                                    image: '/images/team/mike.jpg',
                                    bio: 'Full-stack developer with a focus on scalable solutions',
                                    social: {
                                        linkedin: 'https://linkedin.com/in/mikejohnson',
                                        github: 'https://github.com/mikejohnson'
                                    }
                                },
                                { 
                                    name: 'Sarah Wilson', 
                                    role: 'Product Manager', 
                                    image: '/images/team/sarah.jpg',
                                    bio: 'Driving product strategy with user-centered design',
                                    social: {
                                        linkedin: 'https://linkedin.com/in/sarahwilson',
                                        twitter: 'https://twitter.com/sarahwilson'
                                    }
                                }
                            ].map((member, index) => (
                                <motion.div 
                                    key={index} 
                                    className="team-card"
                                    whileHover={{ y: -10 }}
                                >
                                    <div className="team-member-image-container">
                                        <img 
                                            src={member.image} 
                                            alt={member.name}
                                            className="team-member-image"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="team-member-info">
                                        <h3 className="team-member-name">{member.name}</h3>
                                        <p className="team-member-role">{member.role}</p>
                                        <p className="team-member-bio">{member.bio}</p>
                                        <div className="team-member-social">
                                            {member.social.linkedin && (
                                                <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                                                    <FaLinkedin />
                                                </a>
                                            )}
                                            {member.social.twitter && (
                                                <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                                                    <FaTwitter />
                                                </a>
                                            )}
                                            {member.social.github && (
                                                <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                                                    <FaGithub />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Join Us Section */}
                    <motion.section 
                        className="join-us-section"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="join-us-content">
                            <h2 className="section-title">Join Our Mission</h2>
                            <p className="join-us-text">
                                Ready to make a difference in sustainable agriculture? Join us in our mission to create a greener future.
                            </p>
                            <div className="join-us-cta">
                                <button className="primary-button">View Open Positions</button>
                                <button className="secondary-button">Contact Us</button>
                            </div>
                        </div>
                    </motion.section>
                </div>
            </div>
        </PageLayout>
    );
};

export default AboutUs;

              