class App extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "Ashu",
      lastName: "jhghjgjh",
      age: [5, 6, 7, 8, 9]
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div>
        <ReactTable
          data={data}
          columns={[
            {
              Header: "Name",
              columns: [
                {
                  Header: "First Name",
                  accessor: "firstName"
                },
                {
                  Header: "Last Name",
                  accessor: "lastName"
                }
              ]
            },
            {
              Header: "Info",
              columns: [
                {
                  Header: "Age",
                  accessor: "age"
                }
              ]
            }
          ]}
          defaultSorted={[
            {
              id: "age",
              desc: true
            }
          ]}
          defaultPageSize={1}
          className="-striped -highlight"
        />
        <br />
        <Tips />
        <Logo />
      </div>
    );
  }
}
ReactDom.render(<App />, document.getElementById("form"));
