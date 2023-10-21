import React from 'react';

const JobPositionCard = ({ jobPosition }) => {


    return (
        <div className="job-position-card">
            <h2>{jobPosition.jobTitle}</h2>
            <p>Job Type: {jobPosition.jobType}</p>
            <p>Location: {jobPosition.location}</p>
            <p>Description: {jobPosition.jobDescription}</p>jobPosition.
            <p>Created Date: {jobPosition.createdDate}</p>
            <p>End Date: {jobPosition.endDate}</p>
            <p>Tentative Start Date: {jobPosition.tentativeStartDate}</p>
            <p>Company ID: {jobPosition.idCompany}</p>
            <p>Benefits Offered: {jobPosition.benefitsOfferedDetail}</p>
            <p>Number of Positions to Cover: {jobPosition.numberOfPositionsToCover}</p>
            <p>Position to Cover: {jobPosition.positionToCover}</p>
            <h3>Skills Required:</h3>
            <ul>
                {jobPosition.jobPostionsSkills.map((skill) => (
                    <li key={skill.idSkill}>{skill.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default JobPositionCard;