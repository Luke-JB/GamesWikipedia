import React, { useEffect, useState } from "react";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import BoxArt from "../Images/Elden_Ring_Box_art.jpg";
import ProfilePicPlaceholder from "../Images/ProfilePicDefault.jpg";
import '../CSS/GameWiki.css';
import { Link } from "react-router";
import { addComment, deleteComment, getComments, getGames, updateComment } from "../api/api.jsx";

// 10.65 x 6.31 inches 
// 639 x 378.59

const GameWiki = ({ postId, user }) => {
    const [gameData, setGameData] = useState([
        "developer",
        "publisher",
        "director",
        "writer",
        "composer",
        "yearOfRelease",
        "platofmrs",
        "genre",
        "indie",
        "coop"
    ])

    useEffect(() => {
        getGames().then(data => setGameData(data)).catch((e) => console.log("Error"))
    },[])

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        if (!postId) return;

        getComments(postId)
        .then(response => setComments(response.data))
        .catch((e) => console.log(e.message));
    }, [postId]);

    const handleAddComment = (e) => {
        e.preventDefault();
        if (!newComment.trim() || !user || !user.token) return;
        addComment(postId, newComment, user.token)
        .then(response => {
            setComments(prev => [...prev, response.data]);
            setNewComment("");
        })
        .catch((e) => console.log(e.message));
    };

    const handleDeleteComment = (commentId) => {
        deleteComment(commentId, user.token)
        .then(() => {
            setComments(prev => prev.filter(c => c.id !== commentId));
        })
        .catch((e) => console.log(e.message));
    };

    const handleUpdateComment = (commentId) => {
        updateComment(commentId, updateContent, user.token)
    }
    
    return (
        <div>
            
            <main>
                <div className="gameWikiWrapper">
                    <div className="gameTitleWrapper">
                        <div className="gameEditButtonWrapper">
                            <Link to="/GameAdd" className="button">Edit Game Wiki</Link>
                        </div>
                        <div className="gameTitle">
                            <h2>Game Title</h2>
                        </div>
                    </div>
                    <div className="topRow">
                        <div className="gameInfo1">
                            <h3>Game Info</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin erat nisl, id euismod tortor 
                            bibendum et. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus 
                            mus. Curabitur et elit dolor. In hac habitasse platea dictumst. Cras vitae nisl vitae nibh elementum laoreet eget sit amet.</p>
                        </div>
                        <div className="gameInfo2">
                            <h3 className="gameInfo2Title">Game Name</h3>
                            <div className="gameInfo2Details">
                                <ul className="gameInfo2List">
                                    <li>Developer: </li>
                                    <li>Publisher: </li>
                                    <li>Director: </li>
                                    <li>Writer: </li>
                                    <li>Composer: </li>
                                    <li>Year of Release: </li>
                                    <li>Platforms: </li>
                                    <li>Genre: </li>
                                    <li>Indie: </li>
                                    <li>Co-op: </li>
                                </ul>
                                <div className="gamePic">
                                    <img src={BoxArt} id="boxArt" alt="boxArt"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="gameInfo3">
                        <h3>Game Info</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin erat nisl, id euismod tortor bibendum et. Orci varius 
                        natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur et elit dolor. In hac habitasse platea 
                        dictumst. Cras vitae nisl vitae nibh elementum laoreet eget sit amet.</p>
                    </div>
                    <div className="gameComments">
                        <div className="gameCommentsTitle">
                            <h3>Game Reviews</h3>
                        </div>
                        <div className="gameCommentsForm">
                            {user && (
                                <form onSubmit={handleAddComment}>
                                    <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Type Comment..."/>
                                    <input type="submit" value="Add"/>
                                </form>
                            )}
                        </div>
                        <div className="gameCommentsList">
                            {comments.map(comment => (
                                <div key={comment.id} className="gameCommentsTop">
                                    <img src={ProfilePicPlaceholder} id="ProfilePic" alt="ProfilePic" />
                                    <p>{comment.username || "Profile Name"}</p>
                                    <p>{comment.content}</p>
                                    {user?.Roles?.includes("Moderator") && (
                                        <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                    )}
                                </div>
                            ))}
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin erat nisl, id euismod tortor bibendum et. Orci varius natoque penatibus et 
                            magnis dis parturient montes, nascetur ridiculus mus. Curabitur et elit dolor. In hac habitasse platea dictumst. Cras vitae nisl vitae nibh elementum
                            laoreet eget sit amet dui. Morbi sit amet purus eget dui fermentum volutpat. Suspendisse sit amet enim ante.</p>
                        </div>
                        <div className="gameReferences">
                        <h3>References</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin erat nisl, id euismod tortor bibendum et. Orci varius 
                        natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Curabitur et elit dolor. In hac habitasse platea 
                        dictumst. Cras vitae nisl vitae nibh elementum laoreet eget sit amet.</p>
                    </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default GameWiki;