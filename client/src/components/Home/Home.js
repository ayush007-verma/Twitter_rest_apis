
import Header from "./Header"
import Main from "./Main"
import Auth from "./Auth"


const Home = () => {
    return (
        <div className="h-100 d-flex flex-row justify-content-center">
            <Header/>
            <Main/>
            <Auth/>
        </div>
    )
} 

export default Home