var Item = React.createClass({
  getInitialState: function() {
    return { edit: false };
  },

  toggleEdit: function() {
    this.setState({ edit: !this.state.edit });
  },

  checkItem: function() {
    var self = this;
    $.ajax({
      url: '/check_item',
      type: 'PUT',
      data: { item: { complete: !this.props.complete }, id: this.props.id },
      success: function() {
        self.props.refreshList();
      }
    });
  },

  deleteItem: function() {
    var self = this;
    $.ajax({
      url: '/items/' + this.props.id,
      type: 'DELETE',
      success: function() {
        self.props.refreshStore();
      }
    });
  },

  item: function() {
    var id = "item-" + this.props.id;
    var checked = this.props.complete ? 'checked' : '';
    var itemClass = 'col s2 ' + checked;
    return(<li>
             <div className='row'>
               <div onClick={this.toggleEdit} className={itemClass}>
                 {this.props.name}
               </div>
               <div onClick={this.toggleEdit} className='col s2'>
                 {this.props.price}
               </div>
               <div onClick={this.toggleEdit} className='col s2'>
                 {this.props.category}
               </div>
               <div onClick={this.toggleEdit} className='col s2'>
                {this.props.quantity}
                </div>
               <div onClick={this.deleteItem} className='col s1 btn waves-effect'>
                Delete
               </div>
               <div onClick={this.purchaseItem} className='col s1 btn waves-effect'>
               Purchase
               </div>
            </div>
           </li>);
  },

  edit: function() {
    return(<li>
             <div className='row'>
               <div className='col s10'>
                 <form onSubmit={this.updateItem}>
                   <input autoFocus={true} type='text' defaultValue={this.props.name} ref='itemName' />
                   <input autoFocus={true} type='text' defaultValue={this.props.price} ref='itemPrice' />
                   <input autoFocus={true} type='text' defaultValue={this.props.category} ref='itemCategory' />
                   <button type='submit' className='btn waves-effect'>Submit</button>
                 </form>
               </div>
               <div className='col s2'>
                 <a className='btn waves-effect' onClick={this.toggleEdit}>Cancel</a>
               </div>
             </div>
           </li>);
  },

  updateItem: function(e) {
    e.preventDefault();
    var name = ReactDOM.findDOMNode(this.refs.itemName).value;
    var price = ReactDOM.findDOMNode(this.refs.itemPrice).value;
    var category = ReactDOM.findDOMNode(this.refs.itemCategory).value;
    var self = this;
    $.ajax({
      url: '/items/' + this.props.id,
      type: 'PUT',
      data: { item: { name: name, price: price, category: category, quantity: quantity }},
      success: function() {
        self.setState({edit: false});
        self.props.refreshStore();
      }
    });
  },

  render: function() {
    if (this.state.edit)
      return this.edit();
    else
      return this.item();
  }
});