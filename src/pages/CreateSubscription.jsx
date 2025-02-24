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
import { useNavigate } from "react-router-dom"; // Import useNavigate

const { TextArea } = Input;

function CreateSubscription() {
  const navigate = useNavigate(); // Initialize navigation
  const [form, setForm] = useState({
    name: "",
    description: "",
    tenancyModel: "",
    targetAudience: "",
    price: null,
    disabled: false,
  });

  // Function to handle form field changes
  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    // Validation: Check if required fields are filled
    if (!form.name || !form.description || !form.tenancyModel || !form.price) {
      message.error("Please fill in all required fields!");
      return;
    }

    // Simulate API request (Replace this with actual API call)
    setTimeout(() => {
      message.success("Subscription Created Successfully!");
      navigate("/subscriptions"); // Redirect after success
    }, 1000);
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
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />

          <TextArea
            showCount
            maxLength={100}
            placeholder="Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          <Select
            placeholder="Select Tenancy Model"
            value={form.tenancyModel}
            onChange={(value) => handleChange("tenancyModel", value)}
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
            value={form.targetAudience}
            onChange={(e) => handleChange("targetAudience", e.target.value)}
          />

          <InputNumber
            placeholder="Enter Price"
            prefix="$"
            style={{ width: "100%" }}
            value={form.price}
            onChange={(value) => handleChange("price", value)}
          />

          <Checkbox
            checked={form.disabled}
            onChange={(e) => handleChange("disabled", e.target.checked)}
          >
            Disabled
          </Checkbox>

          {/* Submit Button */}
          <Button type="primary" block onClick={handleSubmit}>
            Create Subscription
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default CreateSubscription;
