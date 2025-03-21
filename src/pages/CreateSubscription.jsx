import React, { useState } from "react";
import {
  Input,
  InputNumber,
  Select,
  Checkbox,
  Button,
  message,
  Card,
} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const { TextArea } = Input;

function CreateSubscription() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    Name: "",
    Description: "",
    TenancyModel: "",
    TargetAudience: "",
    Price: null,
    disabled: false,
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!form.Name || !form.Description || !form.TenancyModel || !form.Price) {
      message.error("Please fill in all required fields!");
      return;
    }

    setLoading(true);
    try {
      console.log(JSON.stringify(form));
      const response = await axios.post(
        "http://localhost:8000/subscription/create",
        form
      );

      if (response.data.success) {
        message.success("Subscription Created Successfully!");
        navigate("/subscriptions");
      } else {
        message.error(
          response.data.message || "Failed to create subscription."
        );
      }
    } catch (error) {
      console.error("Error creating subscription:", error);
      message.error("An error occurred while creating the subscription.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        padding: "25px",
        marginLeft: "175px",
      }}
    >
      <Card
        style={{
          maxWidth: "450px",
          width: "100%",
          padding: "10px",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Create Subscription
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Input
            placeholder="Name"
            value={form.Name}
            onChange={(e) => handleChange("Name", e.target.value)}
          />

          <TextArea
            showCount
            maxLength={100}
            placeholder="Description"
            value={form.Description}
            onChange={(e) => handleChange("Description", e.target.value)}
          />

          <Select
            placeholder="Select Tenancy Model"
            value={form.TenancyModel}
            onChange={(value) => handleChange("TenancyModel", value)}
            style={{ width: "100%" }}
          >
            <Select.Option value="Shared (Schema)">
              Shared (Schema)
            </Select.Option>
            <Select.Option value="Shared (Schema) (Add-on: Isolated Schema)">
              Shared (Schema) (Add-on: Isolated Schema)
            </Select.Option>
            <Select.Option value="Isolated (Schema)">
              Isolated (Schema)
            </Select.Option>
            <Select.Option value="Isolated (Database/Cloud)">
              Isolated (Database/Cloud)
            </Select.Option>
          </Select>

          <Input
            placeholder="Target Audience"
            value={form.TargetAudience}
            onChange={(e) => handleChange("TargetAudience", e.target.value)}
          />

          <InputNumber
            placeholder="Enter Price"
            prefix="$"
            style={{ width: "100%" }}
            value={form.Price}
            onChange={(value) => handleChange("Price", value)}
          />

          <Checkbox
            checked={form.disabled}
            onChange={(e) => handleChange("disabled", e.target.checked)}
          >
            Disabled
          </Checkbox>

          <Button type="primary" block onClick={handleSubmit} loading={loading}>
            {loading ? "Creating..." : "Create Subscription"}
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default CreateSubscription;
