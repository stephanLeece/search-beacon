import React from 'react';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import ReactDOM from 'react-dom';

export class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fruits: ['apple','watermelon']
    };
      this.fruitsChanged = this.fruitsChanged.bind(this);
  }

  fruitsChanged(newFruits) {
    this.setState({
      fruits: newFruits
    });
    console.log(this.state);
  }


  componentDidMount() {
  console.log(this.state);
  }

  render() {
    // the checkboxes can be arbitrarily deep. They will always be fetched and
    // attached the `name` attribute correctly. `value` is optional
    return (
      <CheckboxGroup
        name="fruits"
        value={this.state.fruits}
        onChange={this.fruitsChanged}>

        <label><Checkbox value="apple"/> Apple</label>
        <label><Checkbox value="orange"/> Orange</label>
        <label><Checkbox value="watermelon"/> Watermelon</label>
      </CheckboxGroup>
    );
  }



};

ReactDOM.render(<Demo/>, document.body);
