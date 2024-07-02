import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { getCookie } from "../../cookies";
import { fullTime } from "../../time";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import { useNavigate } from "react-router-dom";
import api from "../../axiosConfig";
import { Button, Container, Form, Row, Col, Card } from 'react-bootstrap';
import "./Appointment.css";

const Appointment = () => {
    // const address = import.meta.env.VITE_APP_ADDRESS;
    // const port = import.meta.env.VITE_APP_PORT;
    // const fullUrl = `${address}:${port}`;
    const [startDate, setStartDate] = useState(new Date());
    const [userTime, setUserTime] = useState("00:00");
    const [userDate, setUserDate] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("Unspecified");
    const [dayOfWeek, setDayOfWeek] = useState("");
    const [time, setTime] = useState(0);
    const [error, setError] = useState("");
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const navigate = useNavigate();

    const options = [
        { value: "10:00", label: "10:00" },
        { value: "10:30", label: "10:30" },
        { value: "11:00", label: "11:00" },
        { value: "11:30", label: "11:30" },
        { value: "12:00", label: "12:00" },
        { value: "12:30", label: "12:30" },
        { value: "13:00", label: "13:00" },
        { value: "13:30", label: "13:30" },
        { value: "14:00", label: "14:00" },
        { value: "14:30", label: "14:30" },
        { value: "15:00", label: "15:00" },
        { value: "15:30", label: "15:30" },
    ];

    const [updatedOptions] = useState(options);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const users = (await api.get('/api/get-users')).data.users;
                console.log(users);
                const employees = users.filter((user) => user.appointmentTaker === true);
                const employeeOptions = employees.map(employee => ({
                    label: employee.name,
                    name: employee.name,
                    _id: employee._id
                }));
                setEmployees(employeeOptions);
            } catch (error) {
                console.error("Failed to fetch employees:", error);
            }
        };

        fetchEmployees();
    }, []);

    const handleEmployeeChange = selectedOption => {
        setSelectedEmployee(selectedOption);
    };

    useEffect(() => {
        let p = getCookie("phone");
        if (p !== "" && p !== "Unspecified" && p !== "undefined") {
            setPhoneNumber(p);
        } else {
            setPhoneNumber("");
        }
        let makeAppointment = document.querySelector("#make-btn");
        let changeAppointment = document.querySelector("#change-btn");
        let phoneInput = document.querySelector("#appo-phone");

        makeAppointment.style.display = "block";
        changeAppointment.style.display = "none";
        phoneInput.style.display = "block";

    }, []);

    if (phoneNumber.length >= 6 && userTime !== "" && userDate !== "") {
        let x = document.querySelector(".appointment-data");
        x.classList.add("appointment-data-show");
    }

    const changeAppointment = async () => {
        let appointmentData = {};
        const obj = fullTime(dayOfWeek);
        appointmentData.userID = getCookie("userID");
        appointmentData.key = userDate + userTime;
        appointmentData.name = getCookie("name");
        appointmentData.date = userDate;
        appointmentData.time = userTime;
        appointmentData.day = obj.day;
        appointmentData.timeInMS = time;
        appointmentData.employee = selectedEmployee;
        try {
            await api.post(`/change-appointment`, appointmentData);
            navigate("/profile");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.log('Bad request:', error.response.data);
                setError(error.response.data.error);
            } else {
                console.error('Axios request failed:', error);
            }
        }
    };

    const makeAppointment = async () => {
        let appointmentData = {};
        const obj = fullTime(dayOfWeek);
        appointmentData.userID = getCookie("userID");
        appointmentData.key = userDate + userTime;
        appointmentData.name = getCookie("name");
        appointmentData.date = userDate;
        appointmentData.time = userTime;
        appointmentData.phone = phoneNumber;
        appointmentData.day = obj.day;
        appointmentData.timeInMS = time;
        appointmentData.employee = selectedEmployee;

        try {
            if (getCookie("change") !== "") {
                await api.post(`/change-appointment`, appointmentData);
            } else {
                await api.post(`/appointment`, appointmentData);
            }
            navigate("/profile");
        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.error('Bad request:', error.response);
                setError(error.response.data.error);
            } else {
                console.error('Axios request failed:', error);
            }
        }
    };

    const handleTimeChange = (selectedOption) => {
        console.log("selectedOption: ", selectedOption);
        setUserTime(selectedOption.value);
        console.log(`time option selected:`, selectedOption.value);

    };

    const handleChange = (date) => {
        console.log(`date option selected:`, date);

        let tmp = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        setTime(
            new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
        );
        setUserDate(tmp);
        setStartDate(date);
        setDayOfWeek(date.getDay());
    };

    return (
        <Container fluid className="appointment-container">
            <Row className="justify-content-md-center">
                <Col>
                    <Card>
                        <Card.Body className="p-4"> { }
                            <Card.Title className="mb-4">Make Appointment</Card.Title> { }
                            <div className="appointment-inner-container mb-3"> { }
                                {error !== '' && <ErrorMsg info={error} />}
                                <Form.Group className="mb-3"> { }
                                    <Form.Label>
                                        Date:
                                    </Form.Label>
                                    <DatePicker
                                        required
                                        selected={startDate}
                                        onChange={handleChange}
                                        withPortal
                                        className="date-picker form-control"
                                        dateFormat="yyyy/MM/dd"
                                        minDate={new Date()}
                                    />
                                </Form.Group>
                            </div>
                            <div className="appointment-inner-container mb-3"> { }
                                <Form.Group className="mb-3"> { }
                                    <Form.Label>
                                        Time:
                                    </Form.Label>
                                    <Select
                                        value={updatedOptions.filter((option) => option.value === userTime)}
                                        onChange={handleTimeChange}
                                        options={options}
                                        className="time-picker"
                                        required
                                    />
                                </Form.Group>
                            </div>
                            <div id="appo-phone" className="appointment-inner-container mb-3"> { }
                                <Form.Group className="mb-3"> { }
                                    <Form.Label>
                                        Phone Number
                                    </Form.Label>
                                    <Form.Control
                                        type="tel"
                                        className="phone-input"
                                        placeholder="Phone Number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        required={true}
                                    />
                                </Form.Group>
                            </div>
                            <div className="appointment-inner-container mb-3">
                                <Form.Group className="mb-3">
                                    <Form.Label>
                                        Select Employee:
                                    </Form.Label>
                                    <Select
                                        value={selectedEmployee}
                                        onChange={handleEmployeeChange}
                                        options={employees}
                                        className="employee-picker"
                                        required
                                    />
                                </Form.Group>
                            </div>
                            <div id="make-btn" className="appointment-inner-container mb-2"> { }
                                <Button onClick={makeAppointment} className="appointment-btn mb-2"> { }
                                    Send
                                </Button>
                            </div>
                            <div id="change-btn" className="appointment-inner-container mb-3"> { }
                                <Button onClick={changeAppointment} className="appointment-btn">
                                    Update
                                </Button>
                            </div>
                            <Card className="appointment-data">
                                <Card.Body>
                                    <h3>Appointment Details:</h3>
                                    <p>Date: <span>{userDate}</span></p>
                                    <p>Hour: <span>{userTime}</span></p>
                                    <p>Phone: <span>{phoneNumber}</span></p>
                                </Card.Body>
                            </Card>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Appointment;
