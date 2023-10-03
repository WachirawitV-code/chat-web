"use client";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import "./login.css";
import { useRouter } from "next/navigation";
import { login } from "../components/fetch";

const loginPage = () => {

  type userFrom = {
    user_name: string;
  };

  const router = useRouter();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log(`e.target.value : ${event.target.value}`);
  }
  function handleFormSubmit(data: userFrom){
    login(data).then((userAccount) => {
      sessionStorage.setItem("USERS", JSON.stringify(userAccount));
      router.push(`/chat`);
    });
  };

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
