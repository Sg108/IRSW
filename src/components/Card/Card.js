import React from "react"
import "./Card.css"
const Card = (props) => {
    return (
        <div className="Card">
            <header
                style={{ backgroundColor: props.headerbg, color: props.htext }}
            >
                <h1>{props.searchtype}</h1>
            </header>
            <ul>
                {props.Results ? (
                    props.Results.map((val, key) => {
                        return <li>{val[0]}</li>
                    })
                ) : (
                    <div></div>
                )}
            </ul>
        </div>
    )
}

export default Card
