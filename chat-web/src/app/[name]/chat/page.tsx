"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import "./chat.css";
import { Layout, Menu, Button, Form, Input, Avatar, Popover } from "antd";
import { getAnswer } from "../../components/fetch";
import type { MenuProps } from "antd";

const { Header, Content, Sider, Footer } = Layout;

export default function Chatpage({ params }: { params: { name: string } }) {
  type Chats = {
    id: number;
    chatroom_id?: number;
    user_name: string;
    time?: string;
    chat: string;
  };
  type chatForm = {
    chat_text: string;
  };
  type Params = {
    name: string;
  };
  type MenuItem = Required<MenuProps>["items"][number];

  const pathname = usePathname();
  const router = useRouter();
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const [completeChat, setCompleteChat] = useState<Array<Chats>>([]);

  const userName:string = params.name;

  const text = <span>Logout</span>;

  const [form] = Form.useForm();

  const items: MenuItem[] = [
    getItem("Room 1", "room_1"),
    getItem("Room 2", "room_2"),
    getItem("Room 3", "room_3"),
  ];

  useEffect(() => {
    const nameLocalStorage: string = `CHATS_${userName}`;
    const oldChat = localStorage.getItem(nameLocalStorage);
    if (oldChat) {
      setCompleteChat(JSON.parse(oldChat));
    } else {
      setCompleteChat([]);
    }
    setFirstLoading(false);
  }, []);

  useEffect(() => {
    if (firstLoading === false) {
      const nameLocalStorage: string = `CHATS_${userName}`;
      localStorage.setItem(nameLocalStorage, JSON.stringify(completeChat));
      const lastChat = completeChat[completeChat.length - 1];
      // console.log(lastChat);
      if (lastChat?.user_name === userName) {
        getAnswer().then((ans) => {
          const chatFromAPI: string = ans.word;
          // console.log(`chatFromAPI : ${chatFromAPI}`);
          const newChatGPT: Chats = {
            id: Math.random(),
            user_name: "GPT",
            chat: chatFromAPI,
          };
          setCompleteChat([...completeChat, newChatGPT]);
        });
      }
    }
    return () => {
      setComponentDisabled(false);
    };
  }, [completeChat]);

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  function addChat(chat: string) {
    const newChat: Chats = {
      id: Math.random(),
      user_name: userName,
      chat,
    };
    setCompleteChat([...completeChat, newChat]);
  }

  function handleFormSubmit(data: chatForm) {
    setComponentDisabled(true);
    const newChat = data.chat_text;
    addChat(newChat);
    form.resetFields();
  }

  function handleLogout() {
    router.push(`/login`);
  }

  return (
    <Layout className="layout">
      <Header className="header">
        <div>
          <Popover
            placement="bottomRight"
            title={
              <Button type="link" danger onClick={handleLogout}>
                Logout
              </Button>
            }
            trigger="click"
          >
            <Button className="button-name">
              Hello {userName}
              <Avatar className="profile-button">{userName}</Avatar>
            </Button>
          </Popover>
        </div>
      </Header>
      <Layout>
        <Sider theme="light" className="slider">
          <Menu
            defaultSelectedKeys={["room_1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
        </Sider>
        <Layout>
          <Content className="content">
            <div className="chat-div-l">
              <Avatar size="large">GPT</Avatar>
              <small className="text-chat-l">Hi, {userName}</small>
            </div>
            <div className="chat-div-r">
              <small className="text-chat-r">Hi, GPT</small>
              <Avatar size="large">{userName}</Avatar>
            </div>
            {completeChat.map((chat) => (
              <div>
                {chat.user_name === "GPT" ? (
                  <div key={chat.id}>
                    <div className="chat-div-l">
                      <Avatar size="large">GPT</Avatar>
                      <small className="text-chat-l">{chat.chat}</small>
                    </div>
                  </div>
                ) : (
                  <div key={chat.id}>
                    <div className="chat-div-r">
                      <small className="text-chat-r">{chat.chat}</small>
                      <Avatar size="large">{userName}</Avatar>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </Content>
          <Footer className="footer">
            <Form
              className="form"
              onFinish={handleFormSubmit}
              disabled={componentDisabled}
              form={form}
            >
              <div className="div-chatinput">
                <Form.Item className="div-chatinput" name="chat_text">
                  <Input
                    className="text-input"
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

// export default Chatpage;
