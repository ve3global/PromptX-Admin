import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Switch,
  Space,
  Card,
  Typography,
  Layout,
  message,
  Input,
  Form,
  Select,
  Popconfirm,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Row, Col } from "antd";

const { Title } = Typography;
const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/subscription/fetch"
      );
      if (response.data.success && response.data.fetchSubscriptions) {
        setSubscriptions(
          response.data.fetchSubscriptions.map((sub) => ({
            ...sub,
            key: sub._id,
            status: !sub.disabled,
          }))
        );
      } else {
        message.warning("Failed to fetch subscriptions");
      }
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      message.error("Failed to fetch subscriptions");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const url = `http://localhost:8000/subscription/${
        currentStatus ? "disable" : "enable"
      }/${id}`;
      const response = await axios.put(url);

      if (response.data.success) {
        message.success(response.data.message);
        setSubscriptions((prev) =>
          prev.map((sub) =>
            sub.key === id ? { ...sub, status: !currentStatus } : sub
          )
        );
      } else {
        message.error("Status update failed");
        fetchSubscriptions();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Failed to update status");
      fetchSubscriptions();
    }
  };

  const deleteSubscription = async (id) => {
    try {
      const response = await axios.delete(
        "http://localhost:8000/subscription/delete",
        {
          data: { id },
        }
      );
      if (response.data.success) {
        message.success(response.data.message);
        fetchSubscriptions();
      } else {
        message.error("Deletion failed");
      }
    } catch (error) {
      console.error("Error deleting subscription:", error);
      message.error("Failed to delete subscription");
    }
  };

  const createSubscription = async (values) => {
    console.log("Submitting values:", values);

    try {
      const response = await axios.post(
        "http://localhost:8000/subscription/create",
        values
      );

      console.log("Server response:", response.data);

      if (response.data.success) {
        message.success("Subscription created successfully");
        setIsCreating(false);
        fetchSubscriptions();
        form.resetFields();
      } else {
        message.error(response.data.message || "Failed to create subscription");
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
      message.error(
        error.response?.data?.message || "Failed to create subscription"
      );
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "Description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Switch
          checked={status}
          onChange={() => toggleStatus(record.key, status)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => navigate(`/update/${record.key}`)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure you want to delete this task?"
            onConfirm={() => deleteSubscription(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Content className="content-container">
      <div className="myData-container">
        <div
          className="myData-header"
          style={{ marginLeft: "250px", display: "flex", gap: "16px" }}
        >
          <Button type="primary" onClick={() => setIsCreating(true)}>
            Create Subscription
          </Button>
        </div>

        {isCreating && (
          <Card
            style={{
              marginTop: "16px",
              marginLeft: "250px",
              padding: "16px",
              background: "white",
            }}
          >
            <Form form={form} layout="vertical" onFinish={createSubscription}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Subscription Name"
                    name="Name"
                    rules={[{ required: true, message: "Please enter a name" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Price ($)"
                    name="Price"
                    rules={[
                      { required: true, message: "Please enter a price" },
                      {
                        pattern: /^[0-9]+$/,
                        message: "Price must be a number",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Description"
                name="Description"
                rules={[
                  { required: true, message: "Please enter a description" },
                ]}
              >
                <Input.TextArea />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Tenancy Modal"
                    name="TenancyModal"
                    rules={[
                      {
                        required: true,
                        message: "Please select a tenancy modal",
                      },
                    ]}
                  >
                    <Select placeholder="Select tenancy modal">
                      <Option value="Shared (Schema)">Shared (Schema)</Option>
                      <Option value="Shared (Schema) (Add-on: Isolated Schema)">
                        Shared (Schema) (Add-on: Isolated Schema)
                      </Option>
                      <Option value="Isolated (Schema)">
                        Isolated (Schema)
                      </Option>
                      <Option value="Isolated (Database/Cloud)">
                        Isolated (Database/Cloud)
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Target Audience"
                    name="TargetAudience"
                    rules={[
                      {
                        required: true,
                        message: "Please select a target audience",
                      },
                    ]}
                  >
                    <Select mode="single" placeholder="Select target audience">
                      <Option value="students">Students</Option>
                      <Option value="professionals">Professionals</Option>
                      <Option value="enterprises">Enterprises</Option>
                      <Option value="freelancers">Freelancers</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button onClick={() => setIsCreating(false)}>Cancel</Button>
              </Space>
            </Form>
          </Card>
        )}

        <Card style={{ marginTop: "16px", marginLeft: "250px" }}>
          <Table columns={columns} dataSource={subscriptions} rowKey="_id" />
        </Card>
      </div>
    </Content>
  );
};

export default SubscriptionPage;
