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
  Row,
  Col,
  Popconfirm,
} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { Content } = Layout;
const { Option } = Select;

const FeatureGetting = () => {
  const navigate = useNavigate();
  const [features, setFeatures] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();

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
    console.log("Working delete function", id);

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

  const createFeature = async (values) => {
    try {
      const requestData = {
        Path: values.Path,
        Value: values.Value,
        SubscriptionType: values.SubscriptionType || [],
        disabled: values.disabled || false,
      };

      const response = await axios.post(
        "http://localhost:8000/path/create",
        requestData
      );

      if (response.data.success) {
        message.success("Feature created successfully");
        setIsCreating(false);
        fetchFeatures();
        form.resetFields();
      } else {
        message.error(response.data.message || "Failed to create feature");
      }
    } catch (error) {
      console.error("Error creating feature:", error);
      message.error(
        error.response?.data?.message || "Failed to create feature"
      );
    }
  };

  const filteredFeatures = features.filter((feature) =>
    feature.Path.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    // {
    //   title: "Feature Path",
    //   dataIndex: "Path",
    //   key: "Path",
    // },
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
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            onClick={() => navigate(`/updateFeatures/${record.key}`)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete the task"
            description="Are you sure you want to delete this task?"
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
      <div className="myData-container">
        <div
          className="myData-header"
          style={{ marginLeft: "250px", display: "flex", gap: "16px" }}
        >
          <Button type="primary" onClick={() => setIsCreating(true)}>
            Create Feature
          </Button>
          {/* Search Input */}
          <Input.Search
            placeholder="Search by feature name"
            allowClear
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 300 }}
          />
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
            <Form form={form} layout="vertical" onFinish={createFeature}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Feature Path"
                    name="Path"
                    rules={[{ required: true, message: "Please enter a Path" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Value"
                    name="Value"
                    rules={[
                      { required: true, message: "Please enter a value" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Feature Type"
                    name="SubscriptionType"
                    rules={[
                      {
                        required: true,
                        message: "Please select a feature type",
                      },
                    ]}
                  >
                    <Select mode="multiple" placeholder="Select feature type">
                      <Option value="Freemium">Freemium</Option>
                      <Option value="Basic">Basic</Option>
                      <Option value="Teams">Teams</Option>
                      <Option value="Enterprise">Enterprise</Option>
                      <Option value="Premium Enterprise">
                        Premium Enterprise
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Disabled"
                name="disabled"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

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
          <Table columns={columns} dataSource={filteredFeatures} rowKey="_id" />
        </Card>
      </div>
    </Content>
  );
};

export default FeatureGetting;
