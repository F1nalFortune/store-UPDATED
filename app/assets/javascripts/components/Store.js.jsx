var Store = React.createClass({
  getInitialState: function() {
    return { items: [] };
  },

  componentDidMount: function() {
    this.refreshStore();
  },

  refreshStore: function() {
    var self = this;
    $.ajax({
      url: '/items',
      type: 'GET',
      success: function(data) {
        self.setState({ items: data });
      }
    });
  },

  showAddForm: function() {
    this.setState({ showAdd: !this.state.showAdd});
  },

  submitItem: function(e) {
    e.preventDefault();
    var name = this.state.itemName;
    var price = this.state.itemPrice;
    var category = this.state.itemCategory;
    var quantity = this.state.itemQuantity;
    var self = this;
    $.ajax({
      url: '/items',
      type: 'POST',
      data: { item: { name: name, price: price, category: category, quantity: quantity }},
      success: function(data) {
        var items = self.state.items;
        items.push(data);
        self.setState({ items: items, showAdd: false, itemName: null });
      }
    });
  },

  addItemName: function(e) {
    this.setState({ itemName: e.currentTarget.value });
  },

  addItemPrice: function(e) {
    this.setState({ itemPrice: e.currentTarget.value });
  },

  addItemCategory: function(e) {
    this.setState({ itemCategory: e.currentTarget.value });
  },

  addItemQuantity: function(e) {
    this.setState({ itemQuantity: e.currentTarget.value});
  },

  addItemForm: function() {
    if(this.state.showAdd){
      return(<div>
              <form onSubmit={this.submitItem}>
                <div className='input-field'>
                  <input autoFocus='true' placeholder='add item' type='text' onChange={this.addItemName} />
                  <input autoFocus='true' placeholder='item price' type='text' onChange={this.addItemPrice} />
                  <input autoFocus='true' placeholder='item category' type='text' onChange={this.addItemCategory} />
                  <input autoFocus='true' placeholder='add quantity' type='text' onChange={this.addItemQuantity} />
                  <button className='btn waves-effect' type='submit'>Save</button>
                </div>
              </form>
             </div>);
    }
  },

  displayItems: function() {
    var items = [];
    for(var i = 0; i < this.state.items.length; i++){
      var item = this.state.items[i];
      var key = "Item-" + item.id;
      items.push(<Item refreshStore={this.refreshStore} id={item.id} key={key} category={item.category} name={item.name} description={item.description} quantity={item.quantity} price={item.price}/>);
    }
    return items;
  },

  render: function() {
    return (<div>
              <div className='row'>
                <div className="col s2 offset-1">Product</div>
                <div className="col s2">Price</div>
                <div className="col s2">Category</div>
                <div className="col s2">Quantity</div>
              </div>
             <div className='card blue-grey darken-1 hoverable'>
               <div className='card-content white-text'>
                 <ul>
                   {this.displayItems()}
                 </ul>
               </div>
             </div>
               <a className='waves-effect waves-light btn' onClick={this.showAddForm}>Add Item</a>
             <div className='container'>
               {this.addItemForm()}
             </div>
           </div>);
  }
});