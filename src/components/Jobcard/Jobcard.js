import React, { Component } from 'react';
import './Jobcard.css'

class Jobcard extends Component {

    render() {
        return (

            <div class="positioning content">
                <h1 class="work"> Work Experience</h1>
                <div class="card" >
                    <img class="leidos" src="public/Leidos-Logo.wine.png" />
                    <h1 class="SWE">Software Engineer Intern</h1>
                    <h2 class="company"> Leidos </h2>
                    <h3 class="location">Reston, VA</h3>
                    <h3 class="dates">June, 2022 - December, 2022</h3>
                    <ul class="information">
                        <li>- Reacts aCTKnowledge team working on mobile app and web portal for the United States National Counterterrorism Center.</li>
                        <li>- Attended monthly client proposals to gauge feedback about the application and best practices to improve the UI/UX</li>
                        <li>- Worked primarily with Vue, Vuetify, Javascript, CSS, HTML, Docker, JIRA, Conflunce, Git, SonarQube, Postman</li>
                    </ul>
                </div>
            </div>

        )
    }
}

export default Jobcard