import React, { Component } from 'react';
import './morphCard.css'

class morphCard extends Component {

    //initialize state to false
    //JS
    // VanillaTilt.init(document.querySelectorAll(".card"),{
    //     max: 25,
    //     speed: 400,
    //     glare: true,
    //     "max-glare": 1
    //   })
    render() {
        return (
            <div class="container">
                <script src="/src/components/morphCard/morph.js" type="text/javascript" />
                <div class="card">
                    <div class="content">
                        <p>Content Here </p>
                    </div>
                </div>
            </div>

        )
    }
}

export default morphCard