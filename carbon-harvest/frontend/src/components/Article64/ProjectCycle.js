import React from 'react';
import { Card, Steps } from 'antd';
import './ProjectCycle.css';

const ProjectCycle = () => {
  const projectSteps = [
    {
      title: 'Project Conceptualization',
      description: 'Activity participant (Project Proponent) initiates the project',
    },
    {
      title: 'Prior Consideration',
      description: 'Communication to UNFCCC Secretariat within 180 days of project start',
    },
    {
      title: 'PDD Development',
      description: 'Development of Project Design Document using A6.4-PDD Form',
    },
    {
      title: 'Global Stakeholder Consultation',
      description: 'UNFCCC publishes PDD for 28 days consultation',
    },
    {
      title: 'Host Party Approval',
      description: '90 days process from start of stakeholder consultation',
    },
    {
      title: 'Project Validation',
      description: 'DOE validates the project',
    },
    {
      title: 'Registration',
      description: 'Final approval and registration by Supervisory Body',
    }
  ];

  return (
    <div className="project-cycle-container">
      <h2>Article 6.4 Project Cycle</h2>
      <div className="cycle-content">
        <Steps
          direction="vertical"
          current={-1}
          items={projectSteps}
        />
        <Card className="info-card">
          <h3>Key Participants</h3>
          <ul>
            <li>SB - Supervisory Body (formerly CDM Executive Board)</li>
            <li>AP - Activity Participants</li>
            <li>HP - Host Party</li>
          </ul>
          <h3>Emission Reduction Types</h3>
          <ul>
            <li>Authorized Emission Reductions (AERs)</li>
            <li>Mitigation Contribution Units (MCUs)</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default ProjectCycle;
