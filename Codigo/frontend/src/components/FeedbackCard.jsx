import React from "react";
import '../assets/feedbacks-cards.css'

export default function FeedbackCard({image, name, job, feedback, subtitle}) {
    return (
        <>
            <div className="feedback-card-item">
                <div className="feedback-card-head">
                    <img className="feedback-card-image" src={image} alt="Foto Feedback" />
                    <span className="feedback-card-name">{name}</span>
                    <span className="feedback-card-job">{job} {subtitle}</span>
                </div>
                <div className="feedback-card-body">
                    <p className="feedback-text">{feedback}</p>
                </div>
            </div>
        </>
    );
}