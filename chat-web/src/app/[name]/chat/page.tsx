"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import "./chat.css";
import { Layout, Menu, Button, Form, Input, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header, Content, Sider, Footer } = Layout;

const Chatpage: React.FC = () => {
  type Members = {
    user_name: string;
    chatroom_id?: number;
  };
  type Chats = {
    chatroom_id?: number;
    user_name: string;
    time?: string;
    chat: string;
  };

  const pathname = usePathname();

  const [chat, setChat] = useState<string>("");
  const [completeChat, setCompleteChat] = useState<Array<Chats>>(() => {
    const saveTasks = localStorage.getItem("CHATS");
    if (saveTasks) {
      return JSON.parse(saveTasks);
    } else {
      return [];
    }
  });

  const splitted = pathname.split("/", 2);
  const userNameFromParam = splitted.filter((value) => value !== "");
  const userName = userNameFromParam.toString();

  useEffect(() => {
    localStorage.setItem("CHATS", JSON.stringify(completeChat));
  }, [completeChat]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setChat(event.target.value);
  }

  function addChat() {
    const newChat: Chats = {
      user_name: userName,
      chat,
    };
    setCompleteChat([...completeChat, newChat]);
  }

  function handleFormSubmit(data: object) {
    console.log(data);
    addChat();
  }

  return (
    <Layout className="layout">
      <Header className="header">
        <div>
          <small>Hello {userName}</small>
        </div>
      </Header>
      <Layout>
        <Sider theme="light" className="slider">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                label: "Room 1",
              },
              {
                key: "2",
                label: "Room 2",
              },
              {
                key: "3",
                label: "Room 3",
              },
            ]}
          />
        </Sider>
        <Layout>
          <Content className="content">
            <div className="chat-div-l">
              <Avatar size="large" icon={<UserOutlined />} />
              <small className="text-chat-l">Hi, Tee</small>
            </div>
            <div className="chat-div-r">
              <small className="text-chat-r">Hi, GPT</small>
              <Avatar size="large" icon={<UserOutlined />} />
            </div>
            {completeChat.map((chat) => (
              <div>
                {chat.user_name === "GPT" ? (
                  <div key={chat.chat}>
                    <div className="chat-div-l">
                      <Avatar size="large" icon={<UserOutlined />} />
                      <small className="text-chat-l">{chat.chat}</small>
                    </div>
                  </div>
                ) : (
                  <div key={chat.chat}>
                    <div className="chat-div-r">
                      <small className="text-chat-r">{chat.chat}</small>
                      <Avatar size="large" icon={<UserOutlined />} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </Content>
          <Footer className="footer">
            <Form className="form" onFinish={handleFormSubmit}>
              <div className="div-chatinput">
                <Form.Item className="div-chatinput"  name="chat_text">
                  <Input
                    className="text-input"
                    onChange={handleInputChange}
                    placeholder="Text some message ..."
                  />
                </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="button-send"
                >
                  Send
                </Button>
              </Form.Item>
              </div>
            </Form>
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Chatpage;
