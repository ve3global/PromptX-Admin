import React, { useState } from "react";
import {
  Table,
  Button,
  Switch,
  Space,
  Card,
  Typography,
  Row,
  Col,
  Layout,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Content } = Layout;

const SubscriptionPage = () => {
  const navigate = useNavigate();

  const [subscriptions, setSubscriptions] = useState("");
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Switch checked={status} onChange={() => toggleStatus(record.key)} />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link">Edit</Button>
          <Button
            type="link"
            danger
            onClick={() => deleteSubscription(record.key)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout
      style={{ padding: "24px", minHeight: "100vh", background: "#f0f2f5" }}
    >
      <Content style={{ marginLeft: "220px", padding: "24px" }}>
        <Card
          style={{
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            background: "#fff",
          }}
        >
          {/* Header with Title & Button */}
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: "16px" }}
          >
            <Col>
              <Title level={3} style={{ margin: 0, color: "#333" }}>
                Subscription Management
              </Title>
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => navigate("/create")}
              >
                Create Subscription
              </Button>
            </Col>
          </Row>

          {/* Subscription Table */}
          <Table
            columns={columns}
            dataSource={subscriptions}
            pagination={{ pageSize: 5 }}
            bordered
          />
        </Card>
      </Content>
    </Layout>
  );
};

export default SubscriptionPage;
