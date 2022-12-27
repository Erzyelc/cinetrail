import React from 'react'
import './Review.css'
import noImage from '../../assets/noImage.jpg'

function Review({review}) {
    const imageBase=process.env.REACT_APP_IMAGE_BASE;
    //create state for image error
    const [imageError, setImageError] = React.useState(false)
    const [seeMore, setSeeMore] = React.useState(false)

  return (
    <div className="review-box">
    <div className="avatar-container">
    <img className="avatar"
        onError={() => setImageError(true)}
        src={imageError? noImage : 
            `${imageBase}${review.author_details.avatar_path}`}
    />
        <p>{review.author}</p>
    </div>
    <div className="review-text">
        {
            !seeMore ? 
            <p>{review.content.slice(0, 250)}<span className="read-content" onClick={() => setSeeMore(true)}>...SEE MORE</span></p>
            :
            <p>{review.content} <span className="read-content" onClick={() => setSeeMore(false)}>...SEE LESS</span></p>
        }
    </div>
    </div>
  )
}

export default Review