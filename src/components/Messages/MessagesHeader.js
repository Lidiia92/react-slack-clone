import React from 'react';
import {Header, Segment, Input, Icon} from 'semantic-ui-react';

class MessagesHeader extends React.Component {
    render() {
        const {displayChannelName, numUsers, handleSearchChange, searchLoading, privateChannel} = this.props;
        

        return (
            <Segment clearing>
                {/* Channel Title */}
                <Header fluid="true" as="h2" floated="left" style={{marginBottom: 0}}>
                    <span>
                        {displayChannelName}
                        {!privateChannel && <Icon name={"star outline"} color="black"/>}
                    </span>
                    <Header.Subheader>{numUsers}</Header.Subheader>
                </Header>

                {/* Channel Search Input */}
                <Header floated="right">
                    <Input loading={searchLoading} size="mini" icon="search" name="searchTerm" placeholder="Search Messages" onChange={handleSearchChange}/>
                </Header>
            </Segment>
        );
    }
}

export default MessagesHeader;