import React from 'react';

const LibraryWikiArticle = ({ image, title }) => {
    return (
        <div>
            <article>
                <img>{image}</img>
                <p>{title}</p>
            </article>
        </div>
    )
}

export default LibraryWikiArticle;