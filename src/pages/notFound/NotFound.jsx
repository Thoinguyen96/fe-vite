import notfound from "../../assets/image/not-found.jpg";
import "../Page.scss";
function NotFound() {
    return (
        <div className="wrap__not-found">
            <img className="img__not-found" src={notfound} alt="not found error" />
        </div>
    );
}

export default NotFound;
