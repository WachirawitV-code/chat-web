"use client";
import React, { useState, useEffect } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import "./login.css";
import { useRouter } from "next/navigation";

const loginPage = () => {
  type Members = {
    user_id: number;
    user_name: string;
    chatroom_id?: number;
  };
  type userFrom = {
    user_name: string;
  };

  const router = useRouter();
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<Array<Members>>([]);

  useEffect(() => {
    localStorage.setItem(
      "USERS",
      JSON.stringify({ user_id: Math.random(), user_name: "Test" })
    );
    const oldUsers = localStorage.getItem("USERS");
    if (oldUsers) {
      setUsers(JSON.parse(oldUsers));
    } else {
      setUsers([]);
    }
    setFirstLoading(false);
  }, []);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(`e.target.value : ${event.target.value}`);
  }

  function handleFormSubmit(data: userFrom) {
    const name = data.user_name;
    const userID = Math.random();
    const dataFromUsers:any = localStorage.getItem("USERS");
    const dataAllFromUsers = JSON.parse(dataFromUsers);
    // if (dataAllFromUsers) {
    //   dataAllFromUsers.map( (user:any) => {
    //     if (user["user_name"] == name) {
    //       console.log("Already use this name");
    //       const userIdOld: string = user["user_id"].toString();
    //       console.log(userIdOld);
    //       // router.push(`/${userIdOld}/chat`);
    //     } else {
    //       adduser(userID, name);
    //       // router.push(`/${userID}/chat`);
    //     }
    //   });
    // } else {
    //   adduser(userID, name);
    // }
    adduser(userID, name);
    router.push(`/${userID}/chat`);
  }
  function adduser(userID: number, name: string) {
    const newObj = { user_id: userID, user_name: name };
    localStorage.setItem("USERS", JSON.stringify(newObj));
  }
  // useEffect(() => {
  //   localStorage.setItem("USERS", JSON.stringify(users));
  // }, [users]);

  return (
    <div className="body-div">
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
    </div>
  );
};

export default loginPage;
