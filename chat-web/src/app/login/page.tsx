"use client";
import React, { useState, useEffect } from "react";
import "./login.css";
import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

const loginPage = () => {
  type Members = {
    user_name: string;
    chatroom_id?: number;
  };

  const [userName, setUserName] = useState<string>("");

  const [users, setUsers] = useState<Array<Members>>(() => {
    const saveTasks = localStorage.getItem("USERS");
    if (saveTasks) {
      return JSON.parse(saveTasks);
    } else {
      return [];
    }
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    // console.log(`e.target.value : ${event.target.value}`);
    setUserName(event.target.value);
  }

  function adduser() {
    const newObj = { user_name: userName };
    setUsers([...users, newObj]);
    setUserName("");
    console.log("Complete add this name");
  }

  function handleFormSubmit() {
    const dataFromUsers = localStorage.getItem("USERS");
    // console.log(dataFromUsers);
    if (dataFromUsers) {

      const dataAllFromUsers = JSON.parse(dataFromUsers);
      const userNameAllFromUsers = dataAllFromUsers.map(function (item: Members) {return item["user_name"];});
      // console.log(userNameAllFromUsers);
      if (userNameAllFromUsers.includes(userName)) {
        console.log("Already use this name");
      } else {
        adduser();
      }
    } else {
      adduser()
    }
  }

  // Save Value to local Storage
  useEffect(() => {
    // JS object to string
    localStorage.setItem("USERS", JSON.stringify(users));
    //state
  }, [users]);

  return (
    <section>
      <div className="form-container">
        <h2>Chat bot</h2>
        <Form onFinish={handleFormSubmit}>
          <Form.Item
            name="user_name"
            label="Username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              onChange={handleInputChange}
              placeholder="Create username..."
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default loginPage;
