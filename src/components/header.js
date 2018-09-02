import React from 'react';
import ReactDom from 'react-dom';

class Header extends React.Component {
  handleBack() {
    this.props.handleBack ? this.props.handleBack() : this.props.history.goBack();
  }

  render() {
    return (
      <header className='header'>
        <span className={this.props.needBack ? 'back' : ''} onClick={this.handleBack.bind(this)} />
        <span className='center'>{this.props.title}</span>
      </header>
    )
  }
}

export default Header;
