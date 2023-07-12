import React from "react";
import Navbar from "../components/Navbar";
import '../assets/about.css'

export default function About() {
    return (
        <>
            <Navbar dark />
            <div className="about-content">
                <h1 className="about-title">QUEM <span>SOMOS ?</span></h1>
                <p className="about-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem placeat ad deleniti error dicta eveniet, iste ipsam, aspernatur commodi excepturi cumque veritatis odio architecto quibusdam ex corporis porro expedita repellat!
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam quos rerum ab voluptatem, numquam a impedit, possimus aliquid illo, reprehenderit vitae laudantium praesentium temporibus aspernatur laborum iusto fugiat culpa ratione.
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque similique rem iste sequi consequatur nam nemo deleniti corrupti aperiam facere possimus, sapiente enim consectetur. Itaque, sapiente eligendi? Qui, fugiat inventore.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam quo ad numquam a sapiente quae et vitae natus, laboriosam alias ducimus cupiditate iste sit? Placeat quasi sequi aut molestias animi.    
                </p>
            </div>
        </>
    );
}