import './welcomeBanner.css';
// this welcome banner is just a simple header to greet the user on the main page
function WelcomeBanner() {  
    return (
        <div className="welcome-banner">
            <h1 className="welcome-banner-title">Welcome to the Bookstore</h1>
        </div>
    );
}

export default WelcomeBanner;