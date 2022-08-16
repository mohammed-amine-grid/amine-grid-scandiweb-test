import React, { Component } from "react";
import styled from "@emotion/styled";
import arrowup from "./arrow-up.svg";
import arrowdown from "./arrow-down.svg";

const DropdownContainer = styled("div")({
  marginRight: "25px",
 
});

const DropdownList = styled("ul")({
  display:"flex",
  flexDirection:'column',
  justifyContent:'center',
  position: "absolute",
  width:'114px',
  minHeight:'170px',
  marginTop:'10px',
  right:'7%',
  boxShadow: '0px 0px 7px 0px rgba(0,0,0,0.1)',
  fontSize: "1.3rem",
  fontWeight: "500",
 
    li: {
        listStyle: "none",
        width:'100%',
        padding:'10px',
        paddingLeft:'20px',
        ":hover" : {
            backgroundColor:'#EEEEEE'
        }
    },
});


const DropdownHeader = styled('div')({
    width:'30px',
    fontWeight:'600',
    fontSize:'18px',
    
    cursor:'pointer',
   
}, props => ({background: `url(${props.toggled ? arrowdown : arrowup}) no-repeat right`,}))

export default class CurrencyDropdownmenu extends Component {
    state = {
        open:false
    }

    toggleDropdown() {
        this.setState({open : !this.state.open})
    }

  render() {
    return (
      <DropdownContainer>
        <DropdownHeader toggled={this.state.open}  onClick={this.toggleDropdown.bind(this)}>$</DropdownHeader>
        {this.state.open && <DropdownList>
          <li>$ USD</li>
          <li>£ BSD</li>
          <li>$ HSD</li>
        </DropdownList>}
      </DropdownContainer>
    );
  }
}
