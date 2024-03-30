import React from 'react';
import './ProgressBar.css'; // Import CSS file for styling

const ProgressBar = ({ currentStage }) => {
    // Define the number of stages
    const totalStages = 5;
    const stageNames = [
        'Consent',
        'Aadhar Auth',
        'Link Mobile',
        'Verify Mobile',
        'Stage 5',
    ];

    // Calculate the width of the progress bar based on the current stage
    let progressBarWidth;
    switch (currentStage) {
        case 1:
            progressBarWidth = '0%';
            break;
        case 2:
            progressBarWidth = '25%';
            break;
        case 3:
            progressBarWidth = '50%';
            break;
        case 4:
            progressBarWidth = '75%';
            break;
        case 5:
            progressBarWidth = '100%';
            break;
        default:
            progressBarWidth = '0%';
    }

    return (
        <div className="progress-bar-container">
            <div className="progress-bar">
                <div
                    className="progress"
                    style={{ width: progressBarWidth }}
                ></div>
            </div>
            {/* Stage indicators */}
            <div className="stage-indicators">
                {/* Create stage indicators for each stage */}
                {[...Array(totalStages)].map((_, index) => (
                    <div
                        key={index}
                        className={`stage-indicator ${
                            currentStage > index ? 'completed' : ''
                        }`}
                        style={{
                            left: `${(index / (totalStages - 1)) * 100}%`,
                        }}
                    >
                        {/* Display the stage number */}
                        {index + 1}
                        <span className="stage-name">{stageNames[index]}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgressBar;
