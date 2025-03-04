import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Select, Switch, Button, Card, message } from "antd";
import axios from "axios";

const { Option } = Select;

const EditFeature = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFeatureDetails();
  }, []);

  const fetchFeatureDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/path/${id}`);
      if (response.data.success) {
        form.setFieldsValue(response.data.data);
      } else {
        message.error("Failed to fetch feature details");
      }
    } catch (error) {
      console.error("Error fetching feature details:", error);
      message.error("Failed to fetch feature details");
    }
  };

  const handleUpdate = async (values) => {
    try {
      values.SubscriptionType = Array.isArray(values.SubscriptionType)
        ? values.SubscriptionType
        : [values.SubscriptionType];

      values.disabled = values.disabled ?? false;

      console.log("🛠️ Sending Data:", JSON.stringify(values, null, 2));

      setLoading(true);
      const response = await axios.put(
        `http://localhost:8000/path/update/${id}`,
        values
      );

      if (response.data.success) {
        message.success("Feature updated successfully");
        navigate("/features");
      } else {
        message.error(response.data.message || "Update failed");
      }
    } catch (error) {
      console.error("❌ Error updating feature:", error);
      message.error(
        error.response?.data?.message || "Failed to update feature"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title="Edit Feature"
      style={{ width: "50%", margin: "0 auto", marginTop: 20 }}
    >
      <Form form={form} layout="vertical" onFinish={handleUpdate}>
        <Form.Item
          label="Feature Path"
          name="Path"
          rules={[{ required: true, message: "Please enter a feature path" }]}
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
          rules={[{ required: true, message: "Please select a feature type" }]}
        >
          <Select mode="multiple">
            <Option value="Freemium">Freemium</Option>
            <Option value="Basic">Basic</Option>
            <Option value="Teams">Teams</Option>
            <Option value="Enterprise">Enterprise</Option>
            <Option value="Premium Enterprise">Premium Enterprise</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Disabled" name="disabled" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Update
          </Button>
          <Button onClick={() => navigate(-1)} style={{ marginLeft: 10 }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EditFeature;
