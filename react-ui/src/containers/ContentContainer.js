import React, { Component } from 'react'
import Stepper from '../components/Stepper';
// import Stepper2 from './Stepper2';
import ContentMasteryCard from '../components/ContentMasteryCard';
export default class componentName extends Component {
    render() {
        return (
            <div>
                <Stepper />
                    <ContentMasteryCard />
            </div>
        )
    }
}
