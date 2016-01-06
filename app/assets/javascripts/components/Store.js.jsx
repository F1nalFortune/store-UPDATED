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
    var self = this;
    $.ajax({
      url: '/items',
      type: 'POST',
      data: { item: { name: name }},
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

  addItemForm: function() {
    if(this.state.showAdd){
      return(<div>
              <form onSubmit={this.submitItem}>
                <div className='input-field'>
                  <input autoFocus='true' placeholder='add item' type='text' onChange={this.addItemName} />
                  <button className='btn waves-effect' type='subit'>Save</button>
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
             <a className='waves-effect waves-light btn' onClick={this.showAddForm}>Add Item</a>
             {this.addItemForm()}
             <div className='card blue-grey darken-1'>
               <div className='card-content white-text'>
                 <span className='card-title'>Store Stuff</span>
                 <ul>
                   {this.displayItems()}
                 </ul>
               </div>
             </div>
           </div>);
  }
});