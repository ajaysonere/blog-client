import loaderGif from "/images/loaderGif.gif";

const Loader = () => {
    return (
        <div className="loader">
            <div className="loader__image">
                <img src={loaderGif} alt="" />
            </div>
        </div>
    );
};

export default Loader;