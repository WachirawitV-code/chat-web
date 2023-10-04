"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./chat.css";
import { Layout, Menu, Button, Form, Input, Avatar, Popover } from "antd";
import {
  addChatAPI,
  getAllChatByRoomId,
  getAllRoom,
  getAnswer,
} from "../components/fetch";
import type { MenuProps } from "antd";

const { Header, Content, Sider, Footer } = Layout;

export default function Chatpage() {
  type Chats = {
    chat_id: string;
    room_id?: string;
    created_by: string;
    created_at?: string;
    chat: string;
  };
  type chatForm = {
    chat_text: string;
  };
  type chatObject = {
    room_id: string;
    create_by: string;
    chat: string;
  };
  type MenuItem = Required<MenuProps>["items"][number];

  const router = useRouter();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const [chatByRoom, setChatByRoom] = useState<Array<Chats>>([]);
  const [rooms, setRooms] = useState<string>("");
  const [items, setItems] = useState<Array<MenuItem>>();

  const Datauser: any = sessionStorage.getItem("USERS");
  const DatauserObject = JSON.parse(Datauser);
  const userName: string = DatauserObject.user_name;
  const userID: string = DatauserObject.user_id;
  const [form] = Form.useForm();

  useEffect(() => {
    getAllRoom(userID).then((userRoom) => {
      const items: MenuItem[] = userRoom.map((room: any, index: any) => {
        const roomName = room.room_name;
        const roomId = room.room_id;
        const item = getItem(roomName, roomId);
        return item;
      });
      setItems(items);
    });
  }, []);

  useEffect(() => {
    readChatByRoom();
  }, [rooms]);

  function readChatByRoom() {
    getAllChatByRoomId(rooms).then((chat) => {
      setChatByRoom(chat);
    });
  }

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

  async function handleFormSubmit(data: chatForm) {
    await setComponentDisabled(true);
    const newChat = data.chat_text;
    const chatNewObject: chatObject = {
      room_id: rooms,
      create_by: userName,
      chat: newChat,
    };
    await addChatAPI(chatNewObject);
    readChatByRoom();
    form.resetFields();
    setComponentDisabled(false);
  }
  function handleChangeMenu(items?: any) {
    const roomKey = items.key;
    setRooms(roomKey);
  }
  function handleLogout() {
    sessionStorage.clear();
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
            defaultSelectedKeys={["JoinRoomID"]}
            mode="inline"
            items={items}
            onClick={handleChangeMenu}
          />
        </Sider>
        <Layout>
          <Content className="content">
            {chatByRoom.map((chat: any) => (
              <div key={chat.chat_id}>
                {chat.created_by === userName ? (
                  <div className="chat-div-r">
                    <small className="text-chat-r">{chat.chat}</small>
                    <Avatar size="large">{userName}</Avatar>
                  </div>
                ) : (
                  <div className="chat-div-l">
                    <Avatar size="large">{chat.created_by}</Avatar>
                    <small className="text-chat-l">{chat.chat}</small>
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
