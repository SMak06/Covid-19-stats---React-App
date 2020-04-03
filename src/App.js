/* Created by Sahil Makwane, 3 APRIL 2020 */

import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck';
// import CardColumns from 'react-bootstrap/CardColumns';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import Columns from "react-columns";
import Form from "react-bootstrap/Form";
import './App.css';


function App() {

const [latest, setLatest] = useState([]);
const [results, setResults] = useState([])
const [searchCountries, setSearchCountries] = useState("");

const filterCountries = results.filter(item => {
  return searchCountries !== "" 
  ? item.country.includes(searchCountries) 
  : item;
});

const countries = filterCountries.map((data, i) => {
  return (
    <Card key={i} bg="light" text="dark" className="text-center" style={{margin:"10px"}}>
      <Card.Img variant = "top" src={data.countryInfo.flag}/>
      <Card.Body>
      <Card.Title>{data.country}</Card.Title>
      <Card.Text>Cases {data.cases}</Card.Text>
      <Card.Text>Deaths {data.deaths}</Card.Text>
      <Card.Text>Recovered {data.recovered}</Card.Text>
      <Card.Text>Today's Cases {data.todayCases}</Card.Text>
      <Card.Text>Today's Deaths {data.todayDeaths}</Card.Text>
      <Card.Text>Active {data.active}</Card.Text>
      <Card.Text>Critical {data.critical}</Card.Text>
      </Card.Body>
    </Card>
  );
});

var queries = [{
  columns: 2,
  query: 'min-width: 500px'
}, {
  columns: 3,
  query: 'min-width: 1000px'
}];

  useEffect(() => {

    axios
      .all([
        axios.get("https://corona.lmao.ninja/all"),
        axios.get("https://corona.lmao.ninja/countries")
      ])
      .then(responseArr => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const date = new Date (parseInt(latest.updated)) //gets the millisecond data
  const lastUpdated = date.toString();

  return (
    <div>
      <h1 className="head-title" style={{ textAlign: "center", margin:"1em"}}>COVID-19 LIVE STATS</h1>
      <CardDeck>
        <Card bg="secondary" text="white" className = "text-center" style={{margin:"1em", boxShadow: "1px 1px 17px 1px rgba(0, 0, 0,.2"}}>
          <Card.Body>
            <Card.Title>Cases</Card.Title>
            <Card.Text>
              {latest.cases}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card bg="danger" text="white" className = "text-center" style={{margin:"1em", boxShadow: "1px 1px 17px 1px rgba(0, 0, 0,.2"}}>
          <Card.Body>
            <Card.Title>Deaths</Card.Title>
            <Card.Text>
            {latest.deaths}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
        <Card bg="success" text="white" className = "text-center" style={{margin:"1em", boxShadow: "1px 1px 17px 1px rgba(0, 0, 0,.2"}}>
          <Card.Body>
            <Card.Title>Recovered</Card.Title>
            <Card.Text>
            {latest.recovered}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>Last updated {lastUpdated}</small>
          </Card.Footer>
        </Card>
      </CardDeck> 
      <br></br>
      <Form>
        <Form.Group controlId="formGroupSearch">

          {/* bug */}
          <Form.Label style={{margin:"0 1.1em"}}>Please type the first alphabet in Caps</Form.Label> 
          
          <Form.Control 
          style={{margin:"1em", boxShadow: "1px 1px 17px 1px rgba(0, 0, 0,.1)"}} 
          type="text" 
          placeholder="Enter Name of Country" 
          onChange = {e => setSearchCountries(e.target.value)}
          />
        </Form.Group>
      </Form>
      <Columns style={{boxShadow: "1px 1px 17px 1px rgba(0, 0, 0,.2)"}} queries={queries}>{countries}</Columns>  
      <h6 className="text-center">Created by Sahil Makwane, 3 APRIL 2020</h6>  
    </div>
  );
}

export default App;
