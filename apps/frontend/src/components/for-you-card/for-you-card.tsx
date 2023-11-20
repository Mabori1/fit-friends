function ForYouCard() {
  return (
    <li className="special-for-you__item">
      <div className="thumbnail-preview">
        <div className="thumbnail-preview__image">
          <picture>
            <source
              type="image/webp"
              srcSet="img/content/thumbnails/preview-01.webp, img/content/thumbnails/preview-01@2x.webp 2x"
            />
            <img
              src="img/content/thumbnails/preview-01.jpg"
              srcSet="img/content/thumbnails/preview-01@2x.jpg 2x"
              width="452"
              height="191"
              alt=""
            />
          </picture>
        </div>
        <div className="thumbnail-preview__inner">
          <h3 className="thumbnail-preview__title">boxing</h3>
          <div className="thumbnail-preview__button-wrapper">
            <a className="btn btn--small thumbnail-preview__button" href="#">
              Подробнее
            </a>
          </div>
        </div>
      </div>
    </li>
  );
}

export default ForYouCard;
