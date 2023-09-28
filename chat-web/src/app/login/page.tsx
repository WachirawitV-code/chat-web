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

  const [users, setUsers] = useState<Array<Members>>(() => {
    const saveTasks = localStorage.getItem("USERS");
    if (saveTasks) {
      return JSON.parse(saveTasks);
    } else {
      return [];
    }
  });

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(`e.target.value : ${event.target.value}`);
  }

  function adduser(userID: number, name: string) {
    const newObj = { user_id: userID, user_name: name };
    setUsers([...users, newObj]);
  }

  function handleFormSubmit(data: userFrom) {
    const name = data.user_name;
    const userID = Math.random();
    const dataFromUsers = localStorage.getItem("USERS");
    if (dataFromUsers) {
      const dataAllFromUsers = JSON.parse(dataFromUsers);
      dataAllFromUsers.map(function (
        item: Members) {
        if (item["user_name"] == name) {
          console.log("Already use this name");
          const userIdOld:string = item["user_id"].toString()
          console.log(userIdOld)
          router.push(`/${userIdOld}/chat`);
        } else {
          adduser(userID, name);
          router.push(`/${userID}/chat`);
        }
      });
    } else {
      adduser(userID, name);
      router.push(`/${userID}/chat`);
    }
  }

  useEffect(() => {
    localStorage.setItem("USERS", JSON.stringify(users));
  }, [users]);

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
