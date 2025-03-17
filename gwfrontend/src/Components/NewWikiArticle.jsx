import React from 'react';

const NewWikiArticle = ({ image, title }) => {
    return (
        <div>
            <article>
                <img>{image}</img>
                <p>{title}</p>
            </article>
        </div>
    )
}

export default NewWikiArticle;