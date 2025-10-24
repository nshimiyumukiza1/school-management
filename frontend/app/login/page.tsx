"use client"

import { Form, Input, Button, Card, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "../api/axios";

const app = () => {
  const [loading, setIsLoading] = useState(false)
  const router =  useRouter()

  const onFinish = async (value :any) => {
    try {
      setIsLoading(true);
      const res = await api.post("/auth/login",value);
      localStorage.setItem("token",res.data.token);
      message.success("Login succefuly!")
      router.push("dashboard")
      
    } catch (error :any) {
      message.error(error.response?.data?.message || "Login failed!")
      
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <div className="flex justify-center items-center shadow-xl h-screen">
      <Card className="w-96">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
          <div className="text-center mt-3">
            <p>
              Don’t have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => router.push("/register")}
              >
                Register
              </span>
            </p>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default app