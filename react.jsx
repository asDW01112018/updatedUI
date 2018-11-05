class Row extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.salesOrder.orderId}</td>
        <td>
          {this.props.salesOrder.edit ? (
            <input
              type="text"
              value={this.props.tempEdit.customerName}
              onChange={this.props.handleEditChange("customerName")}
              required
            />
          ) : (
            this.props.salesOrder.customerName
          )}
        </td>
        <td>
          {this.props.salesOrder.edit ? (
            <input
              type="date"
              value={this.props.tempEdit.date}
              onChange={this.props.handleEditChange("date")}
              required
            />
          ) : (
            this.props.salesOrder.date
          )}
        </td>
        <td>
          {this.props.salesOrder.edit ? (
            <input
              type="text"
              value={this.props.tempEdit.place}
              onChange={this.props.handleEditChange("place")}
              required
            />
          ) : (
            this.props.salesOrder.place
          )}
        </td>
        <td>
          {this.props.salesOrder.edit ? (
            <button
              className="btn btn-info"
              onClick={this.props.updateSalesOrder(
                this.props.salesOrder.orderId
              )}
            >
              Save
            </button>
          ) : (
            <button
              className="btn btn-info"
              onClick={this.props.editSalesOrder(this.props.salesOrder.orderId)}
            >
              Edit
            </button>
          )}
        </td>
        <td>
          {this.props.salesOrder.edit ? (
            <button
              className="btn btn-info"
              onClick={this.props.cancelEdit(this.props.salesOrder.orderId)}
            >
              Cancel
            </button>
          ) : (
            <button
              className="btn btn-info"
              onClick={this.props.deleteSalesOrder(
                this.props.salesOrder.orderId
              )}
            >
              Delete
            </button>
          )}
        </td>
      </tr>
    );
  }
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 5,
      salesOrder: [],
      tempEdit: {},
      tempSalesOrder: {
        orderId: null,
        edit: 0,
        customerName: "",
        date: "",
        place: ""
      }
    };
    this.copy = this.copy.bind(this);
    this.fetchdata = this.fetchdata.bind(this);
    this.updateSalesOrder = this.updateSalesOrder.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.editSalesOrder = this.editSalesOrder.bind(this);
    this.deleteSalesOrder = this.deleteSalesOrder.bind(this);
    this.addSalesOrder = this.addSalesOrder.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
  }
  componentDidMount() {
    var count = 0,
      i = 0;
    fetch("http://localhost:8080/requestAll")
      .then(response => {
        return response.json();
      })
      .then(order => {
        while (i < order.length) {
          if (order[i].orderId > count) count = order[i].orderId;
          i++;
        }
        this.setState({ counter: count, salesOrder: order });
      });
  }
  copy(mainObj) {
    let objCopy = {}; // objCopy will store a copy of the mainObj
    let key;
    for (key in mainObj) {
      objCopy[key] = mainObj[key]; // copies each property to the objCopy object
    }
    return objCopy;
  }
  updateSalesOrder(e) {
    var that = this;
    return function() {
      if (this.state.tempEdit.customerName === "") {
        alert("Customer Name Feild cannot be Empty");
      } else if (this.state.tempEdit.date === "") {
        alert("Please Provide Date");
      } else if (this.state.tempEdit.date === "") {
        alert("Customer Name Feild cannot be Empty");
      } else {
        that.state.tempEdit.edit = 0;
        var ord = that.state.salesOrder.map(function(salesOrder) {
          if (salesOrder.orderId === e) return that.state.tempEdit;
          else {
            salesOrder.edit = 0;
            return salesOrder;
          }
        });
        that.fetchdata("UPDATE", that.state.tempEdit);
        that.setState({ salesOrder: ord });
      }
    };
  }
  cancelEdit(e) {
    var that = this;
    return function() {
      var ord = that.state.salesOrder.filter(function(salesOrder) {
        salesOrder.edit = 0;
        return salesOrder;
      });
      that.setState({ salesOrder: ord });
    };
  }
  fetchdata(method, parameter) {
    var that = this;
    if (method === "GET" || method === "get") {
      axios
        .get("http://localhost:8080/request", { params: parameter })
        .then(function(response) {
          return response.JSON;
        })
        .catch(function(error) {
          return error;
        });
    } else if (method === "GETALL" || method === "getall") {
      var count = 0,
        i = 0;
      fetch("http://localhost:8080/requestAll")
        .then(response => {
          return response.json();
        })
        .then(order => {
          while (i < order.length) {
            if (order[i].orderId > count) count = order[i].orderId;
            i++;
          }
          this.setState({ counter: count, salesOrder: order });
        });
    } else if (method === "UPDATE" || method === "update") {
      axios
        .get("http://localhost:8080/requestUpdate", { params: parameter })
        .then(function(response) {
          return response;
        })
        .catch(function(error) {
          return error;
        });
    } else if (method === "DELETE" || method === "delete") {
      axios
        .get("http://localhost:8080/request", { params: parameter })
        .then(function(response) {
          return response;
        })
        .catch(function(error) {
          return error;
        });
    } else if (method === "ADD" || method === "ADD") {
      axios
        .get("http://localhost:8080/requestAdd", { params: parameter })
        .then(function(response) {
          return response;
        })
        .catch(function(error) {
          console.log(error);
          return error;
        });
    } else return "Incorrect method";
  }
  editSalesOrder(e) {
    var that = this;
    return function() {
      that.state.tempEdit = {};
      var ord = that.state.salesOrder.filter(function(salesOrder) {
        if (salesOrder.orderId === e) {
          salesOrder.edit = 1;
        } else salesOrder.edit = 0;
        return salesOrder;
      });
      var tempOrder = that.state.salesOrder.filter(
        salesOrder => salesOrder.orderId === e
      )[0];
      that.state.tempEdit = JSON.parse(JSON.stringify(tempOrder));
      that.setState({ salesOrder: ord });
    };
  }
  deleteSalesOrder(e) {
    var that = this;
    return function() {
      that.fetchdata("DELETE", { orderId: e });
      var ord = that.state.salesOrder.filter(
        salesOrder => salesOrder.orderId !== e
      );
      that.setState({ salesOrder: ord });
    };
  }
  addSalesOrder() {
    if (this.state.tempSalesOrder.customerName === "") {
      alert("Customer Name Feild cannot be Empty");
    } else if (this.state.tempSalesOrder.date === "") {
      alert("Please Provide Date");
    } else if (this.state.tempSalesOrder.date === "") {
      alert("Customer Name Feild cannot be Empty");
    } else {
      this.state.counter = this.state.counter + 1;
      this.state.tempSalesOrder.orderId = this.state.counter;
      console.log(this.state.tempSalesOrder.orderId);
      this.fetchdata("ADD", this.state.tempSalesOrder);
      this.state.salesOrder.push(this.state.tempSalesOrder);
      this.setState({
        tempSalesOrder: {
          orderId: null,
          edit: 0,
          customerName: "",
          date: "",
          place: ""
        }
      });
    }
  }
  handleChange(key) {
    var that = this;
    return function(xyz) {
      var temp = Object.assign({}, that.state.tempSalesOrder);
      temp[key] = xyz.target.value;
      that.setState({ tempSalesOrder: temp });
    };
  }
  handleEditChange(key) {
    var that = this;
    return function(xyz) {
      var temp = Object.assign(that.state.tempEdit);
      temp[key] = xyz.target.value;
      that.setState({ tempEdit: temp });
    };
  }
  render() {
    return (
      <div>
        <table className="table table-striped">
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Order Location</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {this.state.salesOrder.map(salesOrder => {
            return (
              <Row
                key={this.state.salesOrder.orderId}
                tempEdit={this.state.tempEdit}
                salesOrder={salesOrder}
                handleEditChange={this.handleEditChange}
                deleteSalesOrder={this.deleteSalesOrder}
                editSalesOrder={this.editSalesOrder}
                updateSalesOrder={this.updateSalesOrder}
                cancelEdit={this.cancelEdit}
              />
            );
          })}
        </table>
        <br />
        <br />
        <table class="table table-striped">
          <tr>
            <td />
            <td>
              <input
                type="text"
                value={this.state.tempSalesOrder.customerName}
                onChange={this.handleChange("customerName")}
                required
              />
            </td>
            <td>
              <input
                type="date"
                value={this.state.tempSalesOrder.date}
                onChange={this.handleChange("date")}
                required
              />
            </td>
            <td>
              <input
                type="text"
                value={this.state.tempSalesOrder.place}
                onChange={this.handleChange("place")}
                required
              />
            </td>
          </tr>
          <tr>
            <td />
            <td>
              <button
                className="btn btn-info"
                type="Submit"
                value="Submit"
                onClick={this.addSalesOrder}
              >
                Add salesOrder
              </button>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("form"));
