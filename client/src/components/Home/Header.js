import {Box, styled} from "@mui/material"
const Main = styled(Box)({
    height : "100vh",
    backgroundColor : "black",
    color : "white",
    fontWeight : "400",
})

const Header = () => {
    return (
        <Main className=" col-lg-4">
            <ul>
                <li>
                    Twitter_logo
                </li>
                <li>
                    Tweet_logo
                </li>
                <li>
                    Setting
                </li>
            </ul>
        </Main>
        
    )
}

export default Header