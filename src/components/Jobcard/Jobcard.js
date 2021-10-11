import React, { Component } from 'react';
import './Jobcard.css'

class Jobcard extends Component {

    render() {
        return (
            <div class="positioning container content">
                <div class="holder card">
                    <div class="card-text">
                        <h1>Software Engineer Intern</h1>
                        <h2>Leidos </h2>
                        <h3>June, 2022 - December, 2022</h3>
                        <ul class="information">
                            <li>
                                - UI Design
                            </li>
                            <br />
                            <li>
                                - UX Design
                            </li>
                            <br />
                            <li>
                                - Prototyping
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        )
    }
}

export default Jobcard