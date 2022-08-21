import React, { Component } from 'react'
import styled from '@emotion/styled'

// 611w 511h / 80 80


const productImgs = [ 'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg',
            'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg',
            'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg',
            'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg',
            'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg',
            'https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png',
            'https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png']



const PDPContainer = styled('div')({
display:'flex',
flexDirection:'column',
width:'100vw',
padding:'20px 97px'
})


const ProductCarouselContainer = styled('div')({
    width:'50%',
    display:'flex',
    // flexDirection:'column'
})

const ProductCarouselSideImgsContainer = styled('div')({
    flex:'1',
    display:'flex',
    flexDirection:'column',
}, )


const ProductSideImg = styled('img')({
   
        display:'block',
        height:'80px',
        width:'79px',
        marginBottom:'10px',
        cursor:'pointer'
    
},({selected}) => (selected && {
        outline:'2px solid #5ECE7B',
        outlineOffset:'2px'
}))

const ProductCarouselMainImg = styled('div')({
    width:'610px',
    height:'510px',
    marginLeft:'30px',
    img : {
        maxHeight:'100%',
        height:'100%',
        maxWidth:'100%',
        width:'100%'
    }
})



export default class ProductDetails extends Component {

state = {
    selectedMainImg: productImgs[0]
}
    

selectImg(img){
this.setState((prevState, _) => {
    if(prevState.selectedMainImg === img) return;
    else {
        return {selectedMainImg: img}

    }
})
}

  render() {
    return (
      <PDPContainer>
        <ProductCarouselContainer>
            <ProductCarouselSideImgsContainer>
                {productImgs.map((img, i) => <ProductSideImg selected={this.state.selectedMainImg === img } onClick={() => this.selectImg(img)} alt='product-img' src={img} />)}
            </ProductCarouselSideImgsContainer>
            <ProductCarouselMainImg>
                <img alt='main-product-img' src={this.state.selectedMainImg} />
            </ProductCarouselMainImg>
        </ProductCarouselContainer>
      </PDPContainer>
    )
  }
}
