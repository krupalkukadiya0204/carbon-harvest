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
import { Link } from 'react-router-dom';

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
                <div className="hero-section" style={{ backgroundImage: 'url(/images/about/mission.jpg)' }}>
                    <div className="hero-overlay"></div>
                    <motion.div
                        className="hero-content"
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="hero-title">Revolutionizing Agriculture for a Greener Tomorrow</h1>
                        <p className="hero-subtitle">Pioneering sustainable solutions for a greener tomorrow</p>
                        <div className="hero-cta">
                            <button className="primary-button">Learn More</button>
                            <button className="secondary-button">Contact Us</button>
                        </div>
                    </motion.div>
                </div>

                <div className="content-section">
                    {/* About Carbon Harvest */}
                    <motion.section
                        className="about-carbon-harvest"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className='about-carbon-harvest-container'>
                            <div className='about-carbon-harvest-image-container'>
                                <img src="/images/about/sustainable-farming.jpg" alt="Sustainable farming practices" className='about-carbon-harvest-image' />
                            </div>
                            <div className="about-carbon-harvest-content">
                                <h2 className="section-title">About Carbon Harvest</h2>
                                <p>
                                    Carbon Harvest is at the forefront of the sustainable agriculture revolution, dedicated to transforming the way farmers and industries interact with carbon credit markets. Our platform is designed to empower stakeholders with the tools, knowledge, and connections necessary to thrive in the green economy. We believe in fostering a collaborative environment where innovation drives change, and sustainability is at the heart of every decision.
                                </p>
                            </div>
                        </div>
                    </motion.section>
                    {/* Mission Section */}
                    <motion.section
                        className="mission-section"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className='mission-content-container'>
                            <div className="mission-text">
                                <h2 className="section-title">Our Mission</h2>
                                <p className="mission-main">Our mission is to catalyze a shift towards sustainable agriculture by leveraging innovative carbon credit solutions. We aim to:</p>
                                <ul className="mission-points">
                                    <li className="mission-point">
                                        <span className="point-icon">🌱</span>
                                        <p><strong>Empower Farmers:</strong> Equip farmers with sustainable practices that enhance productivity and resilience in the face of climate change.</p>
                                    </li>
                                    <li className="mission-point">
                                        <span className="point-icon">🤝</span>
                                        <p><strong>Connect Stakeholders:</strong> Facilitate connections between farmers, industries, and regulators to create a dynamic carbon credit ecosystem.</p>
                                    </li>
                                    <li className="mission-point">
                                        <span className="point-icon">📊</span>
                                        <p><strong>Ensure Transparency:</strong> Provide transparent, verifiable carbon data to build trust and foster informed decision-making.</p>
                                    </li>
                                </ul>
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

                    {/* Values Section */}
                    <motion.section
                        className="values-section"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-title">Our Core Values</h2>
                        <p className='values-section-description'>These values guide our interactions and decisions:</p>
                        <div className="values-grid">
                            {[
                                {
                                    title: 'Innovation',
                                    icon: '🔬',
                                    description: 'We push the boundaries with cutting-edge technology.',
                                    details: ['Smart IoT integration', 'Real-time monitoring', 'Data-driven insights']
                                },
                                {
                                    title: 'Sustainability',
                                    icon: '🌱',
                                    description: 'We commit to eco-friendly farming practices.',
                                    details: ['Regenerative agriculture', 'Resource optimization', 'Biodiversity protection']
                                },
                                {
                                    title: 'Transparency',
                                    icon: '🔍',
                                    description: 'We build trust through data.',
                                    details: ['Blockchain verification', 'Public reporting', 'Audit trails']
                                },
                                {
                                    title: 'Collaboration',
                                    icon: '🤝',
                                    description: 'We connect stakeholders for shared success.',
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
                    {/* Impact Section */}
                    <motion.section
                        className="impact-section"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-title">Our Growing Impact</h2>
                        <p className='impact-section-description'>Since our inception, we've been dedicated to making a tangible difference in the world of sustainable agriculture. Here's how we're measuring our progress and impact:</p>
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
                                    bio: 'John, our visionary CEO, is passionate about merging sustainable agriculture with technological innovation. He leads with a commitment to creating a greener world.',
                                    social: {
                                        linkedin: 'https://linkedin.com/in/johndoe',
                                        twitter: 'https://twitter.com/johndoe'
                                    }
                                },
                                {
                                    name: 'Jane Smith',
                                    role: 'Head of Technology',
                                    image: '/images/team/jane.jpg',
                                    bio: 'Jane drives our technological advancements as the Head of Technology. Her expertise in IoT and blockchain solutions ensures we stay at the cutting edge of sustainable agriculture.',
                                    social: {
                                        linkedin: 'https://linkedin.com/in/janesmith',
                                        github: 'https://github.com/janesmith'
                                    }
                                },
                                {
                                    name: 'Mike Johnson',
                                    role: 'Lead Developer',
                                    image: '/images/team/mike.jpg',
                                    bio: 'Mike, our Lead Developer, is dedicated to crafting scalable and robust solutions. His full-stack expertise ensures our platform is reliable and user-friendly.',
                                    social: {
                                        linkedin: 'https://linkedin.com/in/mikejohnson',
                                        github: 'https://github.com/mikejohnson'
                                    }
                                },
                                {
                                    name: 'Sarah Wilson',
                                    role: 'Product Manager',
                                    image: '/images/team/sarah.jpg',
                                    bio: 'Sarah is our Product Manager, who leads with user-centered design. Her work ensures our platform meets the needs of our diverse users.',
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
                        style={{backgroundImage: 'url(/images/join-us-bg.jpg)'}}
                    >
                        <div className="join-us-content">
                            <h2 className="section-title">Ready to be a Changemaker?</h2>
                            <p className="join-us-text">
                                Join us in transforming agriculture and making a real impact on our planet's future. Your skills and passion can help drive the change we all want to see.
                            </p>
                            <div className="join-us-cta">
                                <Link to="/contact-us" className="btn btn-primary">View Open Positions</Link>
                                <Link to="/register" className="btn btn-secondary">Join us now</Link>
                            </div>
                        </div>
                    </motion.section>
                </div>
            </div>
        </PageLayout>
    );
};

export default AboutUs;

              