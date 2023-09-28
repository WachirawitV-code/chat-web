"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import "./chat.css";
import { Layout, Menu, Button, Form, Input, Avatar, Popover } from "antd";
import { getAnswer } from "../../components/fetch";
import type { MenuProps } from "antd";

const { Header, Content, Sider, Footer } = Layout;

export default function Chatpage({ params }: { params: { name: string } }) {
  type Members = {
    user_id: number;
    user_name: string;
    chatroom_id?: number;
  };
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
  type MenuItem = Required<MenuProps>["items"][number];

  const pathname = usePathname();
  const router = useRouter();
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const [completeChat, setCompleteChat] = useState<Array<Chats>>([]);

  // const [allUsers, setAllUsers] = useState<Array<Members>>([]);

  const userID: string = params.name;
  const dataUsersFromStorage: any = localStorage.getItem("USERS");
  const dataUsers = JSON.parse(dataUsersFromStorage);
  dataUsers.map((item: Members) => {
    console.log(item["user_id"].toString());
    if (item["user_id"].toString() == userID) {
      console.log(`Username : ${item["user_name"]}`);
    }
    return item["user_name"];
  });
  const userName = "Test";

  const text = <span>Logout</span>;

  const [form] = Form.useForm();

  const [rooms, setRooms] = useState<string>("room_1");

  useEffect(() => {
    const nameLocalStorage: string = `CHATS_${userID}_${rooms}`;
    const oldChat = localStorage.getItem(nameLocalStorage);
    if (oldChat) {
      setCompleteChat(JSON.parse(oldChat));
    } else {
      setCompleteChat([]);
    }
    setFirstLoading(false);
  }, []);

  useEffect(() => {
    const nameLocalStorage: string = `CHATS_${userID}_${rooms}`;
    const oldChat = localStorage.getItem(nameLocalStorage);
    if (oldChat) {
      setCompleteChat(JSON.parse(oldChat));
    } else {
      setCompleteChat([]);
    }
  }, [rooms]);

  useEffect(() => {
    if (firstLoading === false) {
      const nameLocalStorage: string = `CHATS_${userID}_${rooms}`;
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
    setComponentDisabled(false);
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

  function handleChangeMenu(items?: any) {
    setRooms(items.key);
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
          <Menu mode="inline" defaultSelectedKeys={["room_1"]}>
            <Menu.Item key="room_1" onClick={handleChangeMenu}>
              <span>Room 1</span>
            </Menu.Item>
            <Menu.Item key="room_2" onClick={handleChangeMenu}>
              <span>Room 2</span>
            </Menu.Item>
            <Menu.Item key="room_3" onClick={handleChangeMenu}>
              <span>Room 3</span>
            </Menu.Item>
            <Menu.Item key="room_4" onClick={handleChangeMenu}>
              <span>Friends</span>
            </Menu.Item>
          </Menu>
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
                {chat.user_name === userName ? (
                  <div key={chat.id}>
                    <div className="chat-div-r">
                      <small className="text-chat-r">{chat.chat}</small>
                      <Avatar size="large">{userName}</Avatar>
                    </div>
                  </div>
                ) : (
                  <div key={chat.id}>
                    <div className="chat-div-l">
                      <Avatar size="large">GPT</Avatar>
                      <small className="text-chat-l">{chat.chat}</small>
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
}

// export default Chatpage;
