"use client"
import { Form, Input, Card, Button, message } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "../api/axios";


const app = () => {
  const router = useRouter();
  const [loading, setIsLoading] = useState(false)

  const onFinish = async (value: any) => {
    try {
      setIsLoading(true);
      await api.post("/auth/register",value);
      message.success("Register Succefully!. Prease Login!")
      router.push("/login")
      
    } catch (error :any) {
      message.error(error.response?.data?.message || "Registeration Fail")
      
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-96 shadow-xl">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item label="email" name="email" rules={[{ required: true }]}>
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item
            label="password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input placeholder="Enter your password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Register
          </Button>
          <div className="text-center mt-3">
            <p>
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => router.push("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default app;
