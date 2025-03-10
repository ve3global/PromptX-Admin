import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Switch,
  Space,
  Card,
  Layout,
  message,
  Input,
  Form,
  Select,
  Modal,
  Popconfirm,
} from "antd";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Option } = Select;

const FeatureGetting = () => {
  const [features, setFeatures] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [form] = Form.useForm();
  const [editingFeature, setEditingFeature] = useState(null);

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const response = await axios.get("http://localhost:8000/path/fetch");
      if (response.data.success && response.data.data) {
        setFeatures(
          response.data.data.map((feature) => ({
            ...feature,
            key: feature._id,
            status: !feature.disabled,
          }))
        );
      } else {
        message.warning("Failed to fetch features");
      }
    } catch (error) {
      console.error("Error fetching features:", error);
      message.error("Failed to fetch features");
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const url = `http://localhost:8000/path/${
        currentStatus ? "disable" : "enable"
      }/${id}`;
      const response = await axios.put(url);
      if (response.data.success) {
        message.success(response.data.message);
        setFeatures((prev) =>
          prev.map((feature) =>
            feature.key === id
              ? { ...feature, status: !currentStatus }
              : feature
          )
        );
      } else {
        message.error("Status update failed");
        fetchFeatures();
      }
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Failed to update status");
      fetchFeatures();
    }
  };

  const deleteFeature = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/path/delete/${id}`
      );
      if (response.data.success) {
        message.success(response.data.message);
        fetchFeatures();
      } else {
        message.error("Deletion failed");
      }
    } catch (error) {
      console.error("Error deleting feature:", error);
      message.error("Failed to delete feature");
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      const url = editingFeature
        ? `http://localhost:8000/path/update/${editingFeature._id}`
        : "http://localhost:8000/path/create";
      const method = editingFeature ? axios.put : axios.post;
      const response = await method(url, values);

      if (response.data.success) {
        message.success(
          editingFeature
            ? "Feature updated successfully"
            : "Feature created successfully"
        );
        setIsModalOpen(false);
        fetchFeatures();
        form.resetFields();
        setEditingFeature(null);
      } else {
        message.error(response.data.message || "Operation failed");
      }
    } catch (error) {
      console.error("Error saving feature:", error);
      message.error("Failed to save feature");
    }
  };

  const openEditModal = (record) => {
    setEditingFeature(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  // Filtering logic
  const filteredFeatures = features.filter((feature) => {
    const matchesSearchText = feature.Value.toLowerCase().includes(searchText);
    const matchesSubscription =
      !selectedSubscription ||
      feature.SubscriptionType.includes(selectedSubscription);

    return matchesSearchText && matchesSubscription;
  });

  const columns = [
    {
      title: "Feature Value",
      dataIndex: "Value",
      key: "Value",
    },
    {
      title: "Feature Type",
      dataIndex: "SubscriptionType",
      key: "SubscriptionType",
      render: (subscriptionType) => subscriptionType.join(", "),
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
            title="Delete Feature"
            description="Are you sure you want to delete this feature?"
            onConfirm={() => deleteFeature(record.key)}
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
        style={{ marginBottom: "16px", textAlign: "left", marginLeft: "250px" }}
      >
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          <PlusOutlined /> Create Feature
        </Button>
        <Input.Search
          placeholder="Search by feature value"
          allowClear
          onChange={(e) => setSearchText(e.target.value.toLowerCase())}
          style={{ width: 300, marginLeft: 16 }}
        />
        <Select
          placeholder="Filter by Subscription Type"
          allowClear
          onChange={setSelectedSubscription}
          style={{ width: 300, marginLeft: 16 }}
        >
          <Option value="Freemium">Freemium</Option>
          <Option value="Basic">Basic</Option>
          <Option value="Teams">Teams</Option>
          <Option value="Enterprise">Enterprise</Option>
          <Option value="Premium Enterprise">Premium Enterprise</Option>
        </Select>
      </div>

      <Card style={{ marginLeft: "250px", marginRight: "20px" }}>
        <Table columns={columns} dataSource={filteredFeatures} rowKey="_id" />
      </Card>

      <Modal
        title={editingFeature ? "Edit Feature" : "Create Feature"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingFeature(null);
          form.resetFields();
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            label="Feature Path"
            name="PathName"
            rules={[{ required: true, message: "Please enter a Path" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Value"
            name="Value"
            rules={[{ required: true, message: "Please enter a value" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Feature Type"
            name="SubscriptionType"
            rules={[{ required: true, message: "Select feature type" }]}
          >
            <Select mode="multiple" placeholder="Select feature type">
              <Option value="Freemium">Freemium</Option>
              <Option value="Basic">Basic</Option>
              <Option value="Teams">Teams</Option>
              <Option value="Enterprise">Enterprise</Option>
              <Option value="Premium Enterprise">Premium Enterprise</Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </Content>
  );
};

export default FeatureGetting;
