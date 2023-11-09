import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import AddNewContact from "./components/AddNewContact";
import ShowContactList from "./components/ShowContactList";
import PersonalContact from "./components/PersonalContact";

function App() {
  const [contactlist, setContactList] = useState([]);
  const [fetchData, setFetchData] = useState(false); // Add a state for triggering GET request

  // Function to make a GET request to fetch contacts
  const getContact = () => {
    fetch("https://boolean-api-server.fly.dev/tayokanch/contact")
      .then((response) => response.json())
      .then((data) => setContactList(data));
  };

  useEffect(() => {
    getContact(); // Initial GET request when the component mounts
  }, []);

  const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    street: "",
    city: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);

  // Function to make a POST request to add a new contact
  const postContact = () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    };

    fetch("https://boolean-api-server.fly.dev/tayokanch/contact", options)
      .then((response) => response.json())
      .then(() => {
        // After a successful POST, trigger a GET request to update the contact list
        setFetchData(true);
      });
  };

  useEffect(() => {
    if (fetchData) {
      getContact(); // Trigger the GET request when `fetchData` is true
      setFetchData(false); // Reset `fetchData` to avoid continuous GET requests
    }
  }, [fetchData]);

  return (
    <main>
      <section className="menu">
        <h1>Menu</h1>
        <p>
          <Link to="/ShowContactList">Contacts List</Link>
        </p>
        <p>
          <Link to="/AddNewContact">Add new Contact</Link>
        </p>
      </section>

      <section>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/AddNewContact"
            element={
              <AddNewContact
                formData={formData}
                setFormData={setFormData}
                postContact={postContact}
              />
            }
          />
          <Route
            path="/ShowContactList"
            element={<ShowContactList contactlist={contactlist} />}
          />

          <Route path="/contact/:id" element={<PersonalContact />} />
        </Routes>
      </section>
    </main>
  );
}

export default App;
