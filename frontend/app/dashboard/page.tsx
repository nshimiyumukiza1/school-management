"use client"
import { Card, Row, Col, message } from "antd";
import { useEffect, useState } from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaSchool } from "react-icons/fa";
import api from "../api/axios";
const page = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeacher: 0,
    totalClasses: 0,
    
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard");
        setStats(res.data);
      } catch (error) {
        message.error("Failed to load Dasboard Data");
      }
    };
    fetchStats();
  }, []);
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card className="shadow-lg">
            <div className="flex items-center gap-4">
              <FaUserGraduate size={30} className="text-blue-600" />
              <div>
                <h3 className="text-gray-700">Students</h3>
                <p className="text-xl font-bold">{stats.totalStudents}</p>
              </div>
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card className="shadow-lg">
            <div className="flex items-center gap-4">
              <FaChalkboardTeacher size={30} className="text-green-600" />
              <div>
                <h3 className="text-gray-700">Teachers</h3>
                <p className="text-xl font-bold">{stats.totalTeacher}</p>
              </div>
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card className="shadow-lg">
            <div className="flex items-center gap-4">
              <FaSchool size={30} className="text-orange-600" />
              <div>
                <h3 className="text-gray-700">Classes</h3>
                <p className="text-xl font-bold">{stats.totalClasses}</p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default page;
