class Address extends React.Component {
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-sm-3">Company Name</div>
          <div class="col-sm-3">
            {this.props.edit ? (
              <input
                type="text"
                value={this.props.field.companyName}
                onChange={this.props.handleAddressChange("companyName")}
              />
            ) : (
              this.props.field.companyName
            )}
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3">Address</div>
          <div class="col-sm-3">
            {this.props.edit ? (
              <input
                type="text"
                value={this.props.field.address}
                onChange={this.props.handleAddressChange("address")}
              />
            ) : (
              this.props.field.address
            )}
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3">City</div>
          <div class="col-sm-3">
            {this.props.edit ? (
              <input
                type="text"
                value={this.props.field.city}
                onChange={this.props.handleAddressChange("city")}
              />
            ) : (
              this.props.field.city
            )}
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3">State/Prov</div>
          <div class="col-sm-3">
            {this.props.edit ? (
              <input
                type="text"
                value={this.props.field.stateProv}
                onChange={this.props.handleAddressChange("stateProv")}
              />
            ) : (
              this.props.field.stateProv
            )}
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3">Zip</div>
          <div class="col-sm-3">
            {this.props.edit ? (
              <input
                type="number"
                value={this.props.field.zip}
                onChange={this.props.handleAddressChange("zip")}
                maxlength="6"
              />
            ) : (
              this.props.field.zip
            )}
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3">Country</div>
          <div class="col-sm-3">
            {this.props.edit ? (
              <input
                type="text"
                value={this.props.field.country}
                onChange={this.props.handleAddressChange("country")}
              />
            ) : (
              this.props.field.country
            )}
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3">Phone Number</div>
          <div class="col-sm-3">
            {this.props.edit ? (
              <input
                type="number"
                value={this.props.field.phone}
                onChange={this.props.handleAddressChange("phone")}
                maxlength="10"
              />
            ) : (
              this.props.field.phone
            )}
          </div>
        </div>
      </div>
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
        orderDate: "",
        payemtMethod: "",
        totalAmount: "",
        paidAmount: "",
        balanceAmount: "",
        billTo: {
          companyName: "",
          address: "",
          city: "",
          stateProv: "",
          zip: "",
          country: "",
          phone: ""
        },
        sameAddress: false,
        shipTo: {
          companyName: "",
          address: "",
          city: "",
          stateProv: "",
          zip: "",
          country: "",
          phone: ""
        }
      }
    };
    /*this.copy = this.copy.bind(this);
    this.fetchdata = this.fetchdata.bind(this);
    this.updateSalesOrder = this.updateSalesOrder.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.editSalesOrder = this.editSalesOrder.bind(this);
    this.deleteSalesOrder = this.deleteSalesOrder.bind(this);*/
    this.resetAll = this.resetAll.bind(this);
    this.addSalesOrder = this.addSalesOrder.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBillToChange = this.handleBillToChange.bind(this);
    this.handleShipToChange = this.handleShipToChange.bind(this);
    this.handleSameAddress = this.handleSameAddress.bind(this);
  }
  /*componentDidMount() {
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
  }*/
  /*copy(mainObj) {
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
  }*/
  addSalesOrder() {
    if (this.state.tempSalesOrder.customerName === "") {
      alert("Customer Name Feild cannot be Empty");
    } else if (this.state.tempSalesOrder.date === "") {
      alert("Please Provide Date");
    } else if (this.state.tempSalesOrder.date === "") {
      alert("Customer Name Feild cannot be Empty");
    } else {
      //this.state.counter = this.state.counter + 1;
      //this.state.tempSalesOrder.orderId = this.state.counter;
      console.log(this.state.tempSalesOrder.orderId);
      //this.fetchdata("ADD", this.state.tempSalesOrder);
      this.state.salesOrder.push(this.state.tempSalesOrder);
      this.setState({
        tempSalesOrder: {
          orderId: null,
          edit: 0,
          customerName: "",
          orderDate: "",
          payemtMethod: "",
          totalAmount: "",
          paidAmount: "",
          balanceAmount: "",
          billTo: {
            companyName: "",
            address: "",
            city: "",
            stateProv: "",
            zip: "",
            country: "",
            phone: ""
          },
          sameAddress: false,
          shipTo: {
            companyName: "",
            address: "",
            city: "",
            stateProv: "",
            zip: "",
            country: "",
            phone: ""
          }
        }
      });
    }
  }
  handleBillToChange(key) {
    var that = this;
    return function(xyz) {
      var temp = Object.assign({}, that.state.tempSalesOrder.billTo);
      temp[key] = xyz.target.value;
      that.state.tempSalesOrder.billTo = temp;
      that.setState({});
    };
  }
  handleSameAddress(key) {
    var that = this;
    return function(xyz) {
      that.state.salesOrder.sameAddress = !that.state.salesOrder.sameAddress;
      that.setState({});
      console.log(that.state.salesOrder.sameAddress);
    };
  }
  handleShipToChange(key) {
    var that = this;
    return function(xyz) {
      var temp = Object.assign({}, that.state.tempSalesOrder.shipTo);
      temp[key] = xyz.target.value;
      that.state.tempSalesOrder.shipTo = temp;
      that.setState({});
    };
  }
  resetAll() {
    var temp = Object.assign({}, that.state.tempSalesOrder.shipTo);
    that.state.tempSalesOrder.shipTo = temp;
  }
  handleSameAddress(key) {
    var that = this;
    return function(xyz) {
      that.state.tempSalesOrder.sameAddress = !that.state.tempSalesOrder
        .sameAddress;
      if (that.state.tempSalesOrder.sameAddress) {
        //var temp = Object.assign({}, that.state.tempSalesOrder.billTo);
        that.state.tempSalesOrder.shipTo = that.state.tempSalesOrder.billTo;
      } else {
        var temp = Object.assign({}, that.state.tempSalesOrder.shipTo);
        that.state.tempSalesOrder.shipTo = temp;
      }
      that.setState({});
      console.log(that.state.tempSalesOrder.sameAddress);
    };
  }
  //handleShipToChange(){}
  handleChange(key) {
    var that = this;
    return function(xyz) {
      var temp = Object.assign({}, that.state.tempSalesOrder);
      temp[key] = xyz.target.value;
      that.setState({ tempSalesOrder: temp });
    };
  } /*
  handleEditChange(key) {
    var that = this;
    return function(xyz) {
      var temp = Object.assign(that.state.tempEdit);
      temp[key] = xyz.target.value;
      that.setState({ tempEdit: temp });
    };
  }*/
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-sm-3">Customer Name</div>
          <div class="col-sm-9">
            <input
              type="text"
              value={this.state.tempSalesOrder.customerName}
              onChange={this.handleChange("customerName")}
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3">Order Date</div>
          <div class="col-sm-9">
            <input
              type="date"
              value={this.state.tempSalesOrder.orderDate}
              onChange={this.handleChange("orderDate")}
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <div class="row">
              <div class="col-sm-6">Bill To</div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <Address
                  field={this.state.tempSalesOrder.billTo}
                  handleAddressChange={this.handleBillToChange}
                  edit={1}
                />
              </div>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="row">
              <div class="col-sm-4">
                <input
                  type="checkbox"
                  checked={this.state.tempSalesOrder.sameAddress}
                  onChange={this.handleSameAddress("sameAddress")}
                />
                Same As Billing
              </div>
              <div class="col-sm-2">Ship To</div>
            </div>
            <div class="row">
              <div class="col-sm-6">
                <Address
                  field={this.state.tempSalesOrder.shipTo}
                  handleAddressChange={this.handleShipToChange}
                  edit={1}
                />
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3">Balance Amount</div>
          <div class="col-sm-9">
            <input
              type="number"
              value={this.state.tempSalesOrder.balanceAmount}
              onChange={this.handleChange("balanceAmount")}
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3">Paid Amount</div>
          <div class="col-sm-9">
            <input
              type="number"
              value={this.state.tempSalesOrder.paidAmount}
              onChange={this.handleChange("paidAmount")}
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-3">Total Amount</div>
          <div class="col-sm-9">
            <input
              type="number"
              value={this.state.tempSalesOrder.totalAmount}
              onChange={this.handleChange("totalAmount")}
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-1">
            <button onClick={this.cancel}>Back</button>
          </div>
          <div class="col-sm-9" />
          <div class="col-sm-1">
            <button onClick={this.addSalesOrder}>Submit</button>
          </div>
          <div class="col-sm-1">
            <button onClick={this.reselAll}>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("form"));
