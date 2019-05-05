import React, { Component } from 'react';
import { RoutingChoroplethMap } from './RoutingChoroplethMap';
import { RoutingTopTenWidget } from './RoutingTopTenWidget';
import { WageSalaryTable } from './WageSalaryTable';
import { Row, Col } from 'reactstrap';

class ComparisonOccupation extends Component {
    render() {
        console.log(instance_2);
        const { instance_1, instance_2, 
            selectedInstance_1, selectedInstance_2, selectedModel
        } = this.props;
        return (
            <div>
                <Row>
                    <Col><h2>{instance_1.data.title}</h2></Col>
                    <Col><h2>{instance_2.data.title}</h2></Col>
                </Row>
                <Row>
                    <Col><WageSalaryTable data={instance_1.data}/></Col>
                    <Col><WageSalaryTable data={instance_2.data}/></Col>
                </Row>
                <Row>
                    <Col><RoutingChoroplethMap 
                        instanceTitle={instance_1.data.title}
                        data={instance_1.locationData}
                    /></Col>
                    <Col><RoutingChoroplethMap 
                        instanceTitle={instance_2.data.title}
                        data={instance_2.locationData}
                    /></Col>
                </Row>
                <Row>
                    <Col><RoutingTopTenWidget
                        pieWidth={600}
                        pieHeight={600}
                        barWidth={500}
                        barHeight={500}
                        joined
                        instanceTitle={instance_1.data.title}
                        primaryTable={selectedModel.tablename}
                        secondaryTable="states"
                        id={selectedInstance_1.id}
                        totalEmployment={instance_1.data.total_employment}
                    /></Col>
                    <Col><RoutingTopTenWidget
                        pieWidth={600}
                        pieHeight={600}
                        barWidth={500}
                        barHeight={500}
                        joined
                        instanceTitle={instance_2.data.title}
                        primaryTable={selectedModel.tablename}
                        secondaryTable="states"
                        id={selectedInstance_2.id}
                        totalEmployment={instance_2.data.total_employment}
                    /></Col>
                </Row>
                <Row>
                    <Col><RoutingTopTenWidget
                        pieWidth={600}
                        pieHeight={600}
                        barWidth={500}
                        barHeight={500}
                        joined
                        instanceTitle={instance_1.data.title}
                        primaryTable={selectedModel.tablename}
                        secondaryTable="industries_3d"
                        id={selectedInstance_1.id}
                        totalEmployment={instance_1.data.total_employment}
                    /></Col>
                    <Col><RoutingTopTenWidget
                        pieWidth={600}
                        pieHeight={600}
                        barWidth={500}
                        barHeight={500}
                        joined
                        instanceTitle={instance_2.data.title}
                        primaryTable={selectedModel.tablename}
                        secondaryTable="industries_3d"
                        id={selectedInstance_2.id}
                        totalEmployment={instance_2.data.total_employment}
                    /></Col>
                </Row>
            </div>
        )
    }
}

export default ComparisonOccupation;