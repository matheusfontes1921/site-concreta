import React, { useRef } from "react";
import '../assets/projects-cards.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

export default function ProjectsCard({title, description, images}) {
    const slidesContainer = useRef(null);
    const slide = useRef(null); 

    const nextSlide = function () {
        const slideWidth = slide.current.clientWidth;
        slidesContainer.current.scrollLeft += slideWidth;
    }
    
    const prevSlide = function () {
        const slideWidth = slide.current.clientWidth;
        slidesContainer.current.scrollLeft -= slideWidth;
    }

    return(
        <>
            <div className="projects-card">
                <div className="projects-car-container">
                    <div className="projects-car" ref={slidesContainer}>
                        { 
                            images ? images.map((item, index) => (
                                <img className="project-image"
                                    key={index} 
                                    ref={slide}
                                    src={item.length ? item : "https://placehold.co/600x400"} 
                                    alt="Imagem de Projeto" />

                            )) : <img className="project-image" 
                                    src={"https://placehold.co/600x400"} 
                                    alt="Imagem de Projeto" />
                        }
                    </div>
                    <div className="projects-images-buttons">
                        <button className="btn-car previous-image-button" onClick={prevSlide}>
                            <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                        <button className="btn-car next-image-button" onClick={nextSlide}>
                            <FontAwesomeIcon icon={faAngleRight} />
                        </button>
                    </div>
                </div>
                <div className="projects-card-content">
                    <h2 className="projects-content-title">{title ?? ''}</h2>
                    <p className="projects-content-description">{description ?? ''}</p>
                </div>
            </div>
        </>
    );
}