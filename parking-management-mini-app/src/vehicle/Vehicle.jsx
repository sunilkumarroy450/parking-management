import React from "react";
import { useState } from "react";
import { Modal } from "antd";
import {
  Input,
  FormLabel,
  Heading,
  Stack,
  Button,
  Image,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
const initState = {
  name: "",
  brand: "",
  number: "",
  entry: "",
  exit: "",
};
export const Vehicle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [vehicle, setVehicle] = useState(initState);
  const savedData = JSON.parse(localStorage.getItem("info")) || [];
  const [data, setData] = useState(savedData);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, brand, number, entry, exit } = vehicle;
    if (isVisible) return false;
    const licensePlate =
      /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/;
    if (
      name === "" ||
      brand === "" ||
      number === "" ||
      entry === "" ||
      exit === ""
    ) {
      alert("All fields required");
      return false;
    }
    if (exit < entry) {
      setIsVisible(true);
    }
    if (!licensePlate.test(number)) {
      alert("License Plate must be like CC NN CC NNNN eg, HP 35 A 7548");
      return false;
    }
    if (data.length > 4) {
      alert("All slots are Occupied");
      return false;
    }
    setData((current) => [...current, vehicle]);
    setVehicle({
      name: "",
      brand: "",
      number: "",
      entry: "",
      exit: "",
    });
  };
  //localStorage:--
  localStorage.setItem("info", JSON.stringify(data));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  const handleCheckout = (i) => () => {
    setIndex(i);
    setIsOpen(true);
  };

  const confirmCheckout = () => {
    const filteredArray = savedData.filter((ind) => index !== ind);
    setData([...filteredArray]);
    localStorage.setItem("info", JSON.stringify(filteredArray));
    setIsOpen(false);
  };

  return (
    <>
      <Heading
        style={{ backgroundColor: "CaptionText", color: "whitesmoke",margin: "auto",marginTop:'3px' }}
        as="h2"
        size="xl"
      >
        Parking Management System
      </Heading>
      <div>
        <Heading style={{marginTop:'10px'}} as="h2" size="lg">
          ADD DETAILS
        </Heading>
        <form style={{ width: "50%", margin: "auto" }} onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormLabel>Name</FormLabel>
            <Input
              required
              name="name"
              className="inputBox"
              value={vehicle.name}
              id="input-name"
              onChange={handleChange}
              placeholder="Name"
              type="text"
              size="lg"
            />
            <FormLabel>Brand</FormLabel>
            <Input
              required
              name="brand"
              className="inputBox"
              value={vehicle.brand}
              id="input-vname"
              onChange={handleChange}
              placeholder="Vehicle Name"
              type="text"
              size="lg"
            />
            <FormLabel>Number</FormLabel>
            <Input
              required
              name="number"
              className="inputBox"
              value={vehicle.number}
              id="input-vnumber"
              onChange={handleChange}
              placeholder="Vehicle Number"
              type="text"
              size="lg"
            />
            <FormLabel>Entry</FormLabel>
            <Input
              required
              name="entry"
              className="inputBox"
              value={vehicle.entry}
              id="input-entry"
              onChange={handleChange}
              placeholder="Select Date and Time"
              size="lg"
              type="datetime-local"
            />
            <FormLabel>Exit</FormLabel>
            <Input
              required
              name="exit"
              className="inputBox"
              value={vehicle.exit}
              id="input-exit"
              onChange={handleChange}
              placeholder=" Select Date and Time"
              size="lg"
              type="datetime-local"
            />
            <Stack style={{ display: isVisible ? "block" : "none" }}>
              less time than entry
            </Stack>
            <Button
              style={{ color: "white", backgroundColor: "navy" }}
              size="lg"
              value="Submit"
              type="submit"
              id="submit"
            >
              Submit
            </Button>
          </Stack>
        </form>
      </div>
      <Stack spacing={6} style={{ margin: "20px", marginTop: "80px" }}>
        <Heading
          style={{ backgroundColor: "whitesmoke", color: "brown",margin: "auto" }}
          as="h2"
          size="xl"
        >
          Number Of Vehicle In Parking
        </Heading>
        <Stack
          style={{
            padding: ".5em .5em .5em .5em",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Stack id="img">
            {!savedData.length ? (
              <>
                <Image
                  boxSize="250px"
                  objectFit="cover"
                  src="https://png.pngtree.com/background/20220722/original/pngtree-an-empty-parking-building-picture-image_1716146.jpg"
                  alt="img1"
                />
              </>
            ) : (
              <>
                <Image
                  src="https://images.unsplash.com/photo-1586462020787-a647628f4d42?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2FyJTIwcG5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=200&q=60"
                  alt="img2"
                  boxSize="280px"
                  objectFit="cover"
                />
              </>
            )}
          </Stack>
          {savedData.length ? (
            <>
              <Heading 
              as="h2" size="sm"
                style={{ marginRight: "10px", fontFamily: "sans-serif" ,margin: "auto",marginTop:'5px'}}
              >
                Total Vehical : {data.length}{" "}
              </Heading>
            </>
          ) : (
            <>
              <Heading as="h2" size="md" style={{ marginRight: "50px" }}>
                All Slots Vacant{" "}
              </Heading>
            </>
          )}
        </Stack>
      </Stack>
      <Heading
        style={{ backgroundColor: "CaptionText", color: "whitesmoke" }}
        as="h1"
        size="md"
      >
        Vehicle Details
      </Heading>
      <Table style={{ width: "80%", margin: "auto" }}>
        <Thead style={{ border: "100px" }}>
          <Tr style={{ backgroundColor: "ButtonFace" }}>
            <Th>Name</Th>
            <Th>Vehical Name</Th>
            <Th>Vehical Name Plate</Th>
            <Th>Entry Time</Th>
            <Th>Exit time</Th>
            <Th>Checkout</Th>
          </Tr>
        </Thead>
        {savedData.map((el, i) => {
          return (
            <Tbody>
              <Td>{el.name}</Td>
              <Td>{el.brand}</Td>
              <Td>{el.number}</Td>
              <Td>{el.entry}</Td>
              <Td>{el.exit}</Td>
              <Td
                style={{
                  color: "blue",
                  backgroundColor: "ButtonShadow",
                  fontWeight: "900",
                  cursor: "pointer",
                }}
                onClick={handleCheckout(el, i)}
              >
                Checkout
              </Td>
            </Tbody>
          );
        })}
      </Table>
      <Button
        style={{
          margin: "10px",
          padding: "10px",
          color: "white",
          backgroundColor: "navy",
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        See Details
      </Button>
      <Modal
        onOk={confirmCheckout}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
      >
        <Heading as="h2" size="sm">
          Are You Sure , Please Confirm !
        </Heading>
      </Modal>
    </>
  );
};
