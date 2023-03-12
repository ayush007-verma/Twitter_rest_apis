import {Box, styled, List, ListItem} from "@mui/material"
const Main = styled(Box)({
    height : "100vh",
    backgroundColor : "black",
    color : "white",
    fontWeight : "400",
})



const Header = () => {
    return (
        <Main className=" col-lg-3">
            <List className="d-flex flex-column justify-content-center align-items-center" style={{ listStyle : "none" }}>
                <ListItem className="ml-5 mb-3">
                    <i class="bi bi-twitter"></i>
                </ListItem>
                <ListItem className="ml-5 mb-3">
                    <i class="bi bi-hash"></i>
                    Explore
                </ListItem>
                <ListItem className="ml-5 mb-3">
                    <i class="bi bi-gear"></i>
                    Settings
                </ListItem>
            </List>
        </Main>
        
    )
}

export default Header