"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import "./chat.css";
import { Layout, Menu, Button, Form, Input, Avatar, Popover } from "antd";
import { getAnswer } from "../../components/fetch";

const { Header, Content, Sider, Footer } = Layout;

const Chatpage: React.FC = () => {
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

  const pathname = usePathname();
  const router = useRouter();
  const [firstLoading, setFirstLoading] = useState<boolean>(true);
  const [completeChat, setCompleteChat] = useState<Array<Chats>>([]);

  const splitted = pathname.split("/", 2);
  // const pathName:string = router.query
  // console.log(router.);
  const userNameFromParam = splitted.filter((value) => value !== "");
  const userName = userNameFromParam.toString();

  const text = <span>Logout</span>;

  useEffect(() => {
    const nameLocalStorage:string = `CHATS_${userName}`;
    const oldChat = localStorage.getItem(nameLocalStorage);
    console.log(oldChat);

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
  }, [completeChat]);

  function addChat(chat: string) {
    const newChat: Chats = {
      id: Math.random(),
      user_name: userName,
      chat,
    };
    setCompleteChat([...completeChat, newChat]);
  }

  function handleFormSubmit(data: chatForm) {
    const newChat = data.chat_text;
    addChat(newChat);
  }

  function handleLogout(){
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
            <Form className="form" onFinish={handleFormSubmit}>
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

export default Chatpage;
