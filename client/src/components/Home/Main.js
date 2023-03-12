import { Box, Input, List, ListItem, styled } from "@mui/material"
const MainSection = styled(Box)({
    height: "100vh",
    backgroundColor: "black",
    color: "white",
    borderLeft: "2px solid white",
    borderRight: "0.5px solid white"
})

const Main = () => {
    return (
        <MainSection className=" col-lg-5">

            <span className="d-flex flex-row">
                <input type="search" className="d-flex m-2 col-lg-10 p-1"
                    placeholder={`Search`} style={{ borderRadius: "5px", backgroundColor: "grey" }} />

                <span className="col-lg-2 mt-3">
                    <i class="bi bi-gear"></i>
                </span>
            </span>

            <List className="d-flex flex-row">
                <ListItem>For You</ListItem>
                <ListItem>Trending</ListItem>
                <ListItem>Sports</ListItem>
                <ListItem>News</ListItem>
                <ListItem>Entertainment</ListItem>
            </List>

            <div style={{width : "100%", border: "1px solid white"}}></div>
        </MainSection>
    )
}

export default Main