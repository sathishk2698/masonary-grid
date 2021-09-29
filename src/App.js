import React from "react";
import Masonry from "react-masonry-component";
import styled from "styled-components";
import "./App.css";

const StyledDiv = styled.li`
  background-color: ${(props) =>
    props.backgroundColorVal ? props.backgroundColorVal : null};
  width: 25%;
  height: 250px;
  color: white;
  margin: 20px;
`;

const StyledInput = styled.input`
  width: 50%;
  padding: 12px 20px;
  margin: 8px 8px;
  display: inline-block;
  border-radius: 4px;
  box-sizing: border-box;
  border: 1px solid #669bac;
  &:focus {
    outline: none;
    box-shadow: 0 0 3px 3px #9bdaf1;
  }
`;

const StyledButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      colors: [
        {
          id: 1,
          UserColor: "red",
          relatedColors: [
            "#AA0011",
            "#fb607f",
            "#DC143C",
            "#FFC0CB",
            "#fa8072",
            "#C41E3A",
            "#960018",
          ],
        },
        {
          id: 2,
          UserColor: "blue",
          relatedColors: [
            "#00ffef",
            "#B6D0E2",
            "#55FFEE",
            "#87CEEB",
            "#00308F",
            "#89CFF0",
            "#4682b4",
            "#0ABAB5",
          ],
        },
        {
          id: 3,
          UserColor: "yellow",
          relatedColors: [
            "#FFFF00",
            "#9acd32",
            "#FFD700",
            "#F6C324",
            "#FFBF00",
            "#FDFD96",
          ],
        },
      ],
      masonryGridColors: [],
      resultsFound: false,
    };
  }

  submitHandler = () => {
    const { inputValue, colors } = this.state;
    if (inputValue !== "") {
      let result = colors.find((val) => val.UserColor === inputValue.toLowerCase());
      if (result !== undefined) {
        this.setState({masonryGridColors: result.relatedColors, resultsFound: true})
      } else {
        this.setState({ resultsFound: false });
      }
    }
  };

  render() {
    const { masonryGridColors } = this.state;
    return (
      <div className="App">
        <div>
          <p> Please Enter the color:</p>
          <p> Note: Available colors are red, blue and yellow.</p>
          <StyledInput
            onChange={(e) => this.setState({ inputValue: e.target.value })}
            value={this.state.inputValue}
          />
          <StyledButton onClick={this.submitHandler}>Submit</StyledButton>
          </div>

        {this.state.resultsFound &&
        masonryGridColors.length > 0 &&
        masonryGridColors !== undefined ? (
          <Masonry className={""} elementType={"ul"}>
            {masonryGridColors.map((val) => {
              return <StyledDiv key={val} backgroundColorVal={val} />;
            })}
          </Masonry>
        ) : (
          <p className="App"> No Results Found! </p>
        )}

      </div>
    );
  }
}
