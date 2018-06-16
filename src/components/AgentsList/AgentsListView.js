import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../UserActions';
import { AgentsListItem } from './';
import { AgentsAddForm } from '../AgentsAdd';
import { Button, LoaderOrThis, FullScreenContainer, CenterThis } from '../common';
import { Colors } from '../../config/styles';


const InitialDisplay = () => (
  <CenterThis>
    <div className="w-90 flex flex-row justify-around" style={{ backgroundColor: Colors.white, height: "85vh" }} >
      <div className="w-75 mt6 mb6 tc f4" style={{ color: Colors.silver }}>
        Welcome to Hopscript! <br /> <br />
        You currently do not have any agents. <br />
      “Add Agents” to invite your team to Hopscript! <br /> <br />
        Your agents will receive an email invitation<br />
        to set up their account, create scripts and call leads!
      </div>

    </div>
  </CenterThis>
);

const AgentsList = ({ toggleAddAgent, agents }) => (
  <CenterThis>
    <div className="w-90" style={{ backgroundColor: Colors.white }} >
      {addAgentOpen && <AgentsAddForm cancel={toggleAddAgent} />}
      <div>
        {agents && agents.map(agent => (<AgentsListItem agent={agent} key={agent.id} />))}
      </div>
    </div>
  </CenterThis>
);

class AgentsListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addAgentOpen: false
    };
    this.props.fetchUser();
    this.toggleAddAgent = this.toggleAddAgent.bind(this);
  }

  toggleAddAgent() {
    this.setState({ addAgentOpen: !this.state.addAgentOpen });
  }

  render() {
    const { agents } = this.props.user.attributes;
    const { addAgentOpen } = this.state;
    const { loading } = this.props;
    return (
      <FullScreenContainer classOverrides="vh-100 bg-light-gray">
        <LoaderOrThis loading={loading}>
          <div className="w-90 absolute right-0" styles={{ paddingLeft: '100px' }}>
            <CenterThis>
              <div className="w-90 mt3 mb1 pa3 f4 flex justify-between" style={{ backgroundColor: Colors.white }} >
                <div className="b pt2 pb2 pl2">Agents</div>
                <Button backgroundColor={Colors.brandGreen} onClick={this.toggleAddAgent} buttonPadding="pa2 pr4 pl4" classOverrides="f5">Add Agents</Button>
              </div>
            </CenterThis>
            {agents
              ? <AgentsList toggleAddAgent={this.toggleAddAgent} agents={agents} />
              : <InitialDisplay />
            }
          </div>

        </LoaderOrThis>
      </FullScreenContainer>

    );
  }
}

const mapStateToProps = ({ UserReducer, AgentsListReducer }) => {
  const { user } = UserReducer;
  const { loading } = AgentsListReducer;
  return {
    user,
    loading
  };
};

export default connect(mapStateToProps, { fetchUser })(AgentsListView);
