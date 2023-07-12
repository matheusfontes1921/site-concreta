import React from "react";
import '../assets/news-cards.css'

export default function NewsCard({title, description, url}) {
    return (
        <>
            <div className="news-card-item">
                <div className="news-card-content">
                    <h2 className="card-item-title">{ title }</h2>
                    <p className="card-item-description">{ description }</p>
                </div>
                <a href={url} className="card-item-link">LER NOTÍCIA COMPLETA</a>
            </div>
        </>
    )
}