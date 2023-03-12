import {Box, styled} from "@mui/material"
const MainSection = styled(Box)({
    height : "100vh",
    backgroundColor: "black",
    color : "white",
    borderLeft : "2px solid white",
    borderRight : "0.5px solid white"
})

const Main = () => {
    return (
        <MainSection className=" col-lg-4">
            <input type="text"></input>
            <button className="btn btn-submit" > 
                Tweet
            </button>
        </MainSection>
    )
}

export default Main