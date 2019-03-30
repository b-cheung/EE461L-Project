import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { Bar } from 'react-chartjs-2';
import { Container, Row, Jumbotron, Col, Nav, Card } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import { fetchInstanceData, fetchJoinedInstanceData } from '../../fetchAPI';
import './occupation-instance-page.css';
import { isMajorModel } from '../../constants';
import { DetailedInstanceList, TopTenWidget, WageSalaryTable, InstanceInfo } from '../../components';

mapboxgl.accessToken =
    'pk.eyJ1IjoiYW1ldGh5c3QtZWU0NjFsIiwiYSI6ImNqdDdxYWxzZzAwcXc0NG91NnJ4Z2t4bnMifQ.1M-jA2MKBuUbXoy3bIMxlw';

// Finding the maximum loc_quotient value for this locationData set
function getMaxLocQuotient(locationData) {
    let maxLocQuotient = 0;
    console.log('locationData array quotient calculation', locationData);
    locationData.forEach(stateData => {
        if (stateData.loc_quotient > maxLocQuotient) {
            maxLocQuotient = stateData.loc_quotient;
        }
    });
    return maxLocQuotient;
}

function createHeatMapping(locationData) {
    // For use to calculate state fill shade color
    const expression = ['match', ['get', 'STATE_ID']];

    // Maximum location quotient
    const maxLocQuotient = getMaxLocQuotient(locationData);
    // Calculate color
    locationData.forEach(stateData => {
        if (stateData.loc_quotient === -1.0) {
            // grey color if no location quotient for state
            const color = `rgba(${102}, ${102}, ${121}, 0.75)`;
            expression.push(stateData.states.id, color);
        } else {
            const green = 255 - (stateData.loc_quotient / maxLocQuotient) * 255;
            const color = `rgba(${255}, ${green}, ${132}, 0.75)`;
            expression.push(stateData.states.id, color);
        }
    });
    // Last value is the default
    expression.push('rgba(0,0,0,0)');

    return expression;
}
let map;

class OccupationInstancePage extends Component {
    state = {
        occupationData: null,
        industryData: null,
        locationData: null,
        mapLoaded: false,
        isDataLoaded: false
    };

    componentDidMount() {
        const { tablename, id } = this.props.match.params;
        this.fetchData(tablename, id);
        map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/light-v10',
            center: [-96, 40],
            zoom: 2.25
        });

        map.on('load', () => {
            map.addSource('states', {
                type: 'vector',
                url: 'mapbox://mapbox.us_census_states_2015'
            });
            const expression = ['match', ['get', 'STATE_ID']];
            expression.push('rgba(0,0,0,0)');
            expression.push('rgba(0,0,0,0)');
            expression.push('rgba(0,0,0,0)');

            // Add layer from the vector tile source with data-driven style
            map.addLayer(
                {
                    id: 'heat-layer',
                    type: 'fill',
                    source: 'states',
                    'source-layer': 'states',
                    paint: {
                        'fill-color': expression,
                        'fill-opacity': 0,
                        'fill-opacity-transition': { duration: 500 }
                    },
                    transition: {
                        duration: 2000,
                        delay: 0
                    }
                },
                'waterway-label'
            );
            this.setState({ mapLoaded: true });
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (
            nextProps.match.params.tablename !== this.props.match.params.tablename ||
            nextProps.match.params.id !== this.props.match.params.id
        ) {
            this.setState({ isDataLoaded: false });
            console.log('shouldComponentUpdate false fetch', nextProps.match.params.tablename);
            const { tablename, id } = nextProps.match.params;
            this.fetchData(tablename, id);
            return false;
        }
        if (nextState.isDataLoaded && nextState.mapLoaded) {
            console.log('shouldComponentUpdate true', nextProps, nextState);
            return true;
        }
        console.log('shouldComponentUpdate false', nextState);
        return false;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.mapLoaded && this.state.isDataLoaded) {
            this.setHeatMapping();
        }
    }

    setHeatMapping = () => {
        const { mapLoaded, locationData } = this.state;
        console.log('setHeatMapping', mapLoaded, locationData);

        if (mapLoaded && locationData) {
            const expression = createHeatMapping(locationData);
            map.setPaintProperty('heat-layer', 'fill-opacity', 0);

            setTimeout(function() {
                console.log('setTimeout', map);
                map.setPaintProperty('heat-layer', 'fill-opacity', 1);
            }, 1000);

            setTimeout(function() {
                console.log('setTimeout', map);
                map.setPaintProperty('heat-layer', 'fill-color', expression);
            }, 1000);
        }
    };

    fetchData = async (tablename, id) => {
        // const { tablename, id } = this.props.match.params;
        console.log('fetchData', tablename, id);
        const occupationData = await fetchInstanceData(tablename, id);
        // const industryData = await fetchJoinedInstanceData(tablename, 'industries_3d', id);
        const locationData = await fetchJoinedInstanceData(tablename, 'states', id);

        this.setState({
            occupationData,
            // industryData,
            locationData,
            isDataLoaded: true
        });
    };

    renderLocationData = () => {
        const { mapLoaded, occupationData, locationData } = this.state;
        if (mapLoaded && occupationData && locationData) {
            return (
                <div>
                    <h1>Where are {occupationData.title} located?</h1>
                </div>
            );
        }
    };

    renderGraphs = () => {
        const { tablename, id } = this.props.match.params;

        const { occupationData } = this.state;

        if (occupationData) {
            return (
                <div style={{ margin: 'auto' }}>
                    <Row>
                        <Col className="align-middle">
                            <h5>Top 10 Industries by</h5>
                        </Col>
                    </Row>
                    <Row>
                        <h6>
                            <TopTenWidget
                                joined
                                primaryTable={tablename}
                                secondaryTable="industries_3d"
                                id={id}
                                total_employment={occupationData.total_employment}
                            />
                        </h6>
                    </Row>
                    <Row>
                        <Col className="align-middle">
                            <h5>Top 10 States by</h5>
                        </Col>
                    </Row>
                    <Row>
                        <h6>
                            <TopTenWidget
                                joined
                                // population
                                primaryTable={tablename}
                                secondaryTable="states"
                                id={id}
                                total_employment={occupationData.total_employment}
                                // total_population={occupationData.total_population}
                            />
                        </h6>
                    </Row>
                </div>
            );
        }
    };

    renderDetailedInstanceList = () => {
        const { tablename } = this.props.match.params;
        const { occupationData } = this.state;

        if (occupationData) {
            return <DetailedInstanceList majorModel={tablename} data={occupationData.occupations_detailed} />;
        }
    };

    render() {
        console.log('render');
        const { tablename, id } = this.props.match.params;
        const { occupationData, locationData } = this.state;

        const renderLegend = (stop, i) => (
            <div key={i} className="txt-s">
                <span
                    className="mr6 round-full w12 h12 inline-block align-middle"
                    style={{ backgroundColor: stop[1] }}
                />
                <span>{`${stop[0].toLocaleString()}`}</span>
            </div>
        );
        return (
            <Container>
                <Row>
                    {isMajorModel[tablename] ? this.renderDetailedInstanceList() : null}

                    <Col>
                        <Row>
                            {occupationData ? (
                                <InstanceInfo
                                    title={occupationData.title}
                                    idLabel="Occupation Code"
                                    id={occupationData.id}
                                />
                            ) : null}
                        </Row>
                        <br />
                        <Card className="container wage-data">
                            <br />
                            <Row>{occupationData ? <WageSalaryTable data={occupationData} /> : null}</Row>
                            <br />

                            <Row style={{ paddingLeft: '1em', paddingRight: '1em' }}>{this.renderGraphs()}</Row>
                            <Row>{this.renderLocationData()}</Row>
                            <div ref={el => (this.mapContainer = el)} />
                            <Row>
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                                <br />
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default OccupationInstancePage;
