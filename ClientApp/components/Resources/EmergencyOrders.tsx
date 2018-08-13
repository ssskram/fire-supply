import * as React from 'react';

const margin = {
    marginTop: '25px',
    marginRight: '10px',
    marginLeft: '10px'
}

export default class WhatsanEmergency extends React.Component<any, any> {

    public render() {
        return <div>
            <div className='row col-md-12'>
                <h2>What's an emergency order?</h2>
                <hr />
                <div style={margin} role="alert" className="alert alert-info">
                    <h4 className="message-body">An emergency order must have a good brief description of what happened and why it is needed. Lack of details will delay the order process because the order will need to be validated as a true emergency, and be sent to higher authority for approval.</h4>
                </div>
                <br/>
                <h2>Examples</h2>
                <h4><b>Emergency Orders:</b></h4>
                <p>When one or more items have been used in its entirety for the following reasons:</p>
                <ol>
                    <li>Due to an unforeseen event</li>
                    <ul>
                        <li><i>Example: </i>Raw sewage leaked in the basement used all Bleach need 2 gal of bleach.</li>
                    </ul>
                    <li>Sanitizing equipment</li>
                    <ul>
                        <li><i>Example: </i>Used all Sanitation Wipes cleaning equipment after incident need 1 box of Sanitation Wipes.</li>
                    </ul>
                    <li>Supporting an incident</li>
                    <ul>
                        <li><i>Example: </i>Used all oil dry at a vehicle accident need 2 bags of Oil Dry.</li>
                    </ul>
                    <li>Cleaning Firehouse supporting detail</li>
                    <ul>
                        <li><i>Example: </i>Used all Pine Sol to thoroughly clean Firehouse for Distinguished Visitor.</li>
                    </ul>
                    <li>Supporting a special event/training event/detail</li>
                    <ul>
                        <li><i>Example: </i>Used all trash bags supporting voting poll. Request 1 roll of trash bags to maintain sanitation at the Firehouse.</li>
                    </ul>
                </ol>

                <h4><b>Non-Emergency Orders:</b></h4>
                <ol>
                    <li>Forgetting to order an item</li>
                    <ul>
                        <li><i>Example: </i>Forgot to order paper towels need 6 rolls of paper towels.</li>
                    </ul>
                    <li>Not submitting monthly house supplies</li>
                    <ul>
                        <li><i>Example: </i>No one submitted house supplies need whole order ASAP.</li>
                    </ul>
                    <li>An item breaks that is non-essential to performing duties</li>
                    <ul>
                        <li><i>Example: </i>Mop handle broke need replacement broom ASAP.</li>
                    </ul>
                    <li>Not explaining the reason for item</li>
                    <ul>
                        <li><i>Example: </i>Need 2 cans of AJAX.</li>
                    </ul>
                    <li>Running low of an item</li>
                    <ul>
                        <li><i>Example: </i>Almost out of trash bags need 1 roll of trash bags ASAP.</li>
                    </ul>
                </ol>
                <br/>
                <h3 className='text-center'>If there are any questions regarding this matter please contact Fire Administration.</h3>
                <br/>
                <br/>
                <br/>
            </div>
        </div>;
    }
}