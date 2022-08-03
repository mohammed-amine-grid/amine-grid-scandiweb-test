import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class Navbar extends Component {



  render() {
    return (
      <nav>
        <ul>
            <li>
                <Link to='/women-products'>Women</Link>
            </li>
            
            <li>
                <Link to='/men-products'>Men</Link>
            </li>
            <li>
                <Link to='/kids-products'>Kids</Link>
            </li>
            <li>
                <Link to='/cart'>Cart</Link>
            </li>
        </ul>
      </nav>
    )
  }
}
