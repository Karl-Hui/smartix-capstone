import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import image from "../assets/Asset-2.png";
import web3 from "../../web3";
import EventContract from "../../EventContract";
import classes from "./EventSettings.module.css";
import axios from "redaxios";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export const MintTickets = () => {
  const history = useHistory();
  const [eventLocation, setEventLocation] = useState("online");
  const [eventCapacity, setEventCapacity] = useState(2000);
  const currentUserId = useSelector((state) => {
    return state.users.userID;
  });

  useEffect(async () => {
    await axios
      .post("http://localhost:8080/api/findContractAddress", {
        id: currentUserId,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.venue === "Hong Kong Coliseum") {
          console.log("HK");
          setEventLocation(response.data.venue);
          setEventCapacity(562);
        } else if (response.data.venue === "AsiaWorld-Expo") {
          console.log("Asia");
          setEventLocation(response.data.venue);
          setEventCapacity(897);
        }
      });
  }, []);

  const submitPrice = async (event) => {
    event.preventDefault();
    let currentAddress = [];
    let venue = 2000;
    await axios
      .post("http://localhost:8080/api/findContractAddress", {
        id: currentUserId,
      })
      .then((response) => {
        // console.log(response);
        console.log(venue);
        currentAddress.push(response.data.contractAddress);
        // console.log(eventCapacity);
        console.log("iii", response.data.venue);
      });
    console.log(currentUserId);
    console.log(currentAddress);
    let accounts = await web3.eth.getAccounts();
    // await EventContract.methods
    //   .Mint(currentAddress[0], eventCapacity)
    //   .send({ from: accounts[0] });
    // history.push("/event/settings");
  };

  return (
    <div className={classes.generalContainer}>
      <Container>
        <Row>
          <Col>
            <img src={image} alt="Image" width="100%" />
          </Col>
          <Col>
            <div className={classes.formContainer}>
              <h6>
                <strong>(Step 2) Create Event Tickets</strong>
                <div id={classes.priceConverter}>
                  <p>Event Location: {eventLocation}</p>
                </div>
              </h6>
              <Form onSubmit={submitPrice} className={classes.form}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Event Capacity</Form.Label>
                  <Form.Control
                    type="Number"
                    placeholder={eventCapacity}
                    disabled
                  />
                </Form.Group>
                {currentUserId ? (
                  <button
                    variant="primary"
                    type="submit"
                    className={classes.submitBtn}
                  >
                    Create Ticket
                  </button>
                ) : null}
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
