"use client";
import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import "./login.css";

const loginPage = () => {
  type FieldType = {
    id: number;
    user_name: string;
    chatroom_id?: number;
  };

  return (
    <main>
      <div>
        <Form
          name="basic"
          style={{ maxWidth: 400 }}
        >
          <small>Chat bot</small>
          <Form.Item<FieldType>
            label="Username"
            name="user_name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Create username..." />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
};

export default loginPage;
