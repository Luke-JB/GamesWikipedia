import React, { useEffect, useState } from "react";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";
import BoxArt from "../Images/Elden_Ring_Box_art.jpg";
import ProfilePicPlaceholder from "../Images/ProfilePicDefault.jpg";
import '../CSS/GameWiki.css';
import { Link, useNavigate, useParams } from "react-router";
import { addComment, deleteComment, getComments, updateComment, getGameById } from "../api/api.jsx";

// 10.65 x 6.31 inches 
// 639 x 378.59

const GameWiki = ({ user }) => {
    console.log("User object:", user);
    const { gameId } = useParams();
    const postId = gameId;
    const [gameData, setGameData] = useState({})
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [updateContent, setUpdateContent] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!gameId) {
            navigate("/Search");
        }
    }, [gameId]);
    
    // Fetch Game data.
    useEffect(() => {
        if (!gameId) {
            navigate("/Search");
            return;
        }
        getGameById(gameId).then(res => setGameData(res.data)).catch((e) => console.log("Error: failed to load game."))
    }, [gameId])

    // Fetch Comments.
    useEffect(() => {
        if (!postId) return;
        getComments(postId)
        .then(response => setComments(response.data))
        .catch((e) => console.log(e.message));
    }, [postId]);

    // Add Comments.
    /*const handleAddComment = (e) => {
        e.preventDefault();
        console.log("Submitting comment...");
        console.log("Adding comment to postId:", postId);
        console.log("User token:", user?.token);
        console.log("New comment:", newComment);
        if (!newComment.trim() || !user || !user.token) return;
        addComment(postId, newComment, user.token)
        .then((response) => {
            setComments((prev) => [...prev, response.data]);
            setNewComment("");
        })
        .catch((e) => console.log(e.message));
    };*/

    const handleAddComment = async (e) => {
        e.preventDefault();
        console.log("Clicked add comment");
        console.log("Adding comment to postId:", postId);
        console.log("User token:", user?.token);
        console.log("New comment:", newComment);
    
        try {
            const res = await addComment(postId, newComment, user.token);
            console.log("Comment added:", res.data);
            setComments((prev) => [...prev, res.data]);
            setNewComment("");
        } catch (err) {
            console.error("Failed to add comment:", err);
        }
    };


    // Delete Comments.
    const handleDeleteComment = (commentId) => {
        deleteComment(commentId, user.token)
        .then(() => {
            setComments((prev) => prev.filter((c) => c.id !== commentId));
        })
        .catch((e) => console.log(e.message));
    };

    //Update Comments
    const handleUpdateComment = (commentId) => {
        updateComment(commentId, updateContent, user.token)
    }
    
    return (
        <div>
            <main>
                <div className="gameWikiWrapper">
                    <div className="gameTitleWrapper">
                        <div className="gameEditButtonWrapper">
                            <Link to="/GameEdit" className="button">Edit Game Wiki</Link>
                        </div>
                        <div className="gameTitle">
                            <h2>{gameData.gameName}</h2>
                        </div>
                    </div>
                    <div className="topRow">
                        <div className="gameInfo1">
                            <h3>Game Info</h3>
                            <p>{gameData.gameDescription}</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sollicitudin erat nisl, id euismod tortor 
                            bibendum et. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus 
                            mus. Curabitur et elit dolor. In hac habitasse platea dictumst. Cras vitae nisl vitae nibh elementum laoreet eget sit amet.</p>
                        </div>
                        <div className="gameInfo2">
                            <h3 className="gameInfo2Title">{gameData.gameName}</h3>
                            <div className="gameInfo2Details">
                                <ul className="gameInfo2List">
                                    <li>Developer: {gameData.gameDeveloper}</li>
                                    <li>Publisher: {gameData.gamePublisher}</li>
                                    <li>Director: {gameData.gameDirector}</li>
                                    <li>Writer: {gameData.gameWriter}</li>
                                    <li>Composer: {gameData.gameComposer}</li>
                                    <li>Year of Release: {gameData.gameRelease}</li>
                                    <li>Platforms: {gameData.gamePlatform}</li>
                                    <li>Genre: {gameData.gameGenre}</li>
                                    <li>Indie: {gameData.gameIndie}</li>
                                    <li>Co-op: {gameData.gameCoop}</li>
                                </ul>
                                <div className="gamePic">
                                    <img src={BoxArt} className="boxArt" alt="boxArt"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="gameInfo3">
                        <h3>Game Info</h3>
                        <p>{gameData.gameInfo}</p>
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
                            {comments.length === 0 ? (
                                <p>No Comments</p>
                            ) : (
                            comments.map(comment => (
                                <div key={comment.id} className="gameCommentsTop">
                                    <img src={ProfilePicPlaceholder} className="ProfilePic" alt="ProfilePic" />
                                    <p>{comment.username || "Profile Name"}</p>
                                    <p>{comment.text}</p>
                                    {user?.Roles?.includes("Moderator") && (
                                        <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                    )}
                                </div>
                            )))}
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