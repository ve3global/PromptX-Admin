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
  Modal,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;
const { Content } = Layout;
const { Option } = Select;

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingSubscription, setEditingSubscription] = useState(null);

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

  const handleFormSubmit = async (values) => {
    try {
      const url = editingSubscription
        ? `http://localhost:8000/subscription/update/${editingSubscription._id}`
        : "http://localhost:8000/subscription/create";
      const method = editingSubscription ? axios.put : axios.post;
      const response = await method(url, values);

      if (response.data.success) {
        message.success(
          editingSubscription
            ? "Subscription updated successfully"
            : "Subscription created successfully"
        );
        setIsModalOpen(false);
        fetchSubscriptions();
        form.resetFields();
        setEditingSubscription(null);
      } else {
        message.error(response.data.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error saving subscription:", error);
      message.error("Failed to save subscription");
    }
  };

  const openEditModal = (record) => {
    setEditingSubscription(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
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
      render: (price) => `$${price}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Switch
          checked={status}
          onChange={() => toggleStatus(record.key, status)}
          checkedChildren="Active"
          unCheckedChildren="Deactivated"
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete Subscription"
            description="Are you sure you want to delete this subscription?"
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
      <div
        style={{
          marginBottom: "16px",
          textAlign: "left",
          marginLeft: "250px",
        }}
      >
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          <PlusOutlined /> Create Subscription
        </Button>
      </div>

      <Card style={{ marginLeft: "250px", marginRight: "25px" }}>
        <Table columns={columns} dataSource={subscriptions} rowKey="_id" />
      </Card>

      <Modal
        title={
          editingSubscription ? "Edit Subscription" : "Create Subscription"
        }
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingSubscription(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            label="Subscription Name"
            name="Name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price ($)"
            name="Price"
            rules={[{ required: true, message: "Please enter a price" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Target Audience"
            name="TargetAudience"
            rules={[{ required: true, message: "Select target audience" }]}
          >
            <Select>
              <Option value="students">Students</Option>
              <Option value="professionals">Professionals</Option>
              <Option value="enterprises">Enterprises</Option>
            </Select>
          </Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
          </Space>
        </Form>
      </Modal>
    </Content>
  );
};

export default SubscriptionPage;
