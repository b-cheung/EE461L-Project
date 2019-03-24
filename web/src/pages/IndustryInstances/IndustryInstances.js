import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Row, Col, Image, Button } from 'react-bootstrap';
import { BarComponent } from '../../components/BarComponent';
import { PieComponent } from '../../components/PieComponent';
import { IndustryComponent } from '../../components/IndustryComponent';
import './IndustryInstances.css';

const data = {
    info: {
        industry: 'Dental Industry',
        naics: '(621200)',
        description:
            'Industry operators are primarily engaged in the independent practice of general or specialized dentistry or dental surgery. These practitioners operate private or group practices in their own offices (e.g. centers or clinics) or in the facilities of others, such as hospitals or HMO medical centers.',
        meanWage: 'Annual mean wage: $64,590'
    },
    industries: {
        headers: ['Occupation', 'SOC', 'Employment', 'Annual Mean'],
        values: [
            ['Healthcare Practitioners and Technical Occupations', '290000', 319720, 112220],
            ['Healthcare Support Occupations', '310000', 311330, 38580],
            ['Other Healthcare Support Occupations', '319000', 3111270, 38580],
            ['Miscellaneous Healthcare Support', '319090', 311250, 38580],
            ['Dental Assistants', '319091', 305150, 38680]
        ]
    }
};

const chartData = {
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
        {
            label: 'Videos Made',
            backgroundColor: 'rgba(255,0,255,0.75)',
            data: [4, 5, 1, 10, 32, 2, 12]
        },
        {
            label: 'Subscription',
            backgroundColor: 'rgba(0,255,0,0.75)',
            data: [14, 15, 21, 0, 12, 45, 2]
        }
    ]
};

class IndustryInstances extends Component {
    render() {
        return (
            <body className="app sidebar-show aside-menu-show">
                <div>
                    <Jumbotron fluid>
                        <Container>
                            <h1>Industry Instance</h1>
                        </Container>
                    </Jumbotron>
                    ;
                </div>
                <header className="app-header navbar">
                    <h>Industry Instance Name</h>
                </header>
                <div className="app-body">
                    <main className="main">
                        {/* // Industry + Name(from backend) */}
                        <IndustryComponent data={data} />
                        {/* Charts located at: https://www.chartjs.org/docs/latest/ */}

                        <BarComponent
                            data={chartData}
                            options={{
                                maintainAspectRatio: true
                            }}
                        />

                        <PieComponent
                            data={chartData}
                            options={{
                                maintainAspectRatio: true
                            }}
                        />

                        {/* // Top Occupations for (Industry) */}

                        {/* // Includes Graphs, Tables, and Statistics */}

                        {/* // Occupations for Industry */}
                    </main>
                    <aside className="aside-menu">
                        <h> Top Industry Occupations by Wage</h>

                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Wage</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td colSpan="2">Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                    </aside>
                </div>
                <footer className="app-footer">
                    <p> footer</p>
                </footer>

                <script
                    src="http://code.jquery.com/jquery-3.3.1.min.js"
                    integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
                    crossOrigin="anonymous"
                />
                <script
                    src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
                    integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
                    crossOrigin="anonymous"
                />
                <script
                    src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"
                    integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm"
                    crossOrigin="anonymous"
                />
                <script src="https://unpkg.com/@coreui/coreui/dist/js/coreui.min.js" />
            </body>
        );
    }
}

export default IndustryInstances;
