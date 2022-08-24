import React, { Component } from 'react'
import styled from '@emotion/styled/macro';
//   "",
import cartIcon from './circle-cart-icon.svg'


const CardImg = styled('img') ({
  display:'block',
  width:'354px',
  height:'330px',
  marginBottom:'24px',
})

const CardText = styled('div')({
  fontSize:'18px',
  "& > *" : {
    padding:'5px'
  },
    ":first-of-type": {
        fontWeight:'300'
    },
    ":last-of-type": {
      fontWeight:'600'
    }
  })
  
  
  

  const AddToCartIcon = styled('img')({
    width:'52px',
    heigth:'52px',
    position:'absolute',
    bottom:'70px',
    right:'20px',
    opacity:'0'
  })
  
  const Card = styled('div')({
    // zIndex:'-999',
  width:'386px',
  height:'444px',
  padding:'16px',
  display:'flex',
  flexDirection:'column',
  position:'relative',
  cursor:'pointer',
  ":hover" : {
    boxShadow: '0px 4px 35px rgba(168, 172, 176, 0.19)',
    [AddToCartIcon]: {
    opacity:'1'
  }  
  }
  },
  ({inStock}) => (!inStock && {
    cursor:'not-allowed',
    ":after": {
      position:'absolute',
      content:'""',
      height:'444px',
      width:'354px',
      // zIndex:'99',
      backgroundColor:'rgba(255,255,255,0.7)'
    }
  })
  )
  
  const OutOfStock = styled('p')({
    textTransform:'uppercase',
    color:'#8D8F9A',
    fontWeight:'400',
    fontSize:'24px',
    position:'absolute',
    top:'35%',
    left:'25%',
    zIndex:'99'
  })

  export default class ProductListingCard extends Component {
    render() {
      const {inStock} = this.props
      return (
      <Card inStock={inStock}>
        <CardImg src='https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg' />
         {inStock && <AddToCartIcon alt='add-to-cart-button' src={cartIcon} />}
          {!inStock && <OutOfStock>Out of stock</OutOfStock>}
        <CardText>
            <p>Apollo Running Shorts</p>
            <p>$50.00</p>
        </CardText>
      </Card>
    )
  }
}
