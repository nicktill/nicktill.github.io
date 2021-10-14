import React, { Component } from 'react';
import './Jobcard.css'

class JobcardTwo extends Component {

    render() {
        return (
            <div class="wrapper">
                <h1 class="infoJobCard">Work Experience</h1>
                <div class="container">
                    <div class="form_container">
                        <ul class="jobInfo">
                            <li>- Reacts aCTKnowledge Team, focusing on Vue, Vuetify, Javascript, Elastic Search, Amazon S3, AWS, Firebase, Docker, JIRA, Conflunce, Git, SonarQube</li><br />
                            <li>- Worked on website and applications for the United States National Counterterrorism Center.</li><br />
                            <li>- Redesigned, updated and implemented code to improve and restore website functionality and appearance.</li>
                        </ul>
                    </div>
                    <figure>
                        <img src="https://ibb.co/PQfPwDG" alt="leidosLogo" class="logo" />
                        <figcaption class="positionLocation">Reston, VA</figcaption>
                    </figure>

                </div>
            </div>

        )
    }
}

export default Jobcard