import React from "react";
import { Tabs, Card, Upload, Button, Input, Typography, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const SettingsPage = () => {
  const handleUpload = (info) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="General" key="1">
          <Card title="Account Info">
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Upload
                name="companyLogo"
                listType="picture-circle"
                showUploadList={false}
                action="/upload" // Change this to your backend endpoint
                onChange={handleUpload}
              >
                <Button icon={<UploadOutlined />}>Upload Company Icon</Button>
              </Upload>
              <Text>You can upload images up to 256x256.</Text>
            </div>

            <div style={{ marginTop: "20px" }}>
              <label>Company Name</label>
              <Input
                placeholder="Enter company name"
                defaultValue="NeuraByte"
              />
            </div>

            <div style={{ marginTop: "10px" }}>
              <label>Company Website</label>
              <Input
                placeholder="Enter website URL"
                defaultValue="www.neurabyte.com"
              />
            </div>
          </Card>

          <Card style={{ marginTop: "20px", backgroundColor: "#f3f6fc" }}>
            <Title level={5}>Active plan</Title>
            <Text>
              You’re currently on a basic plan. Upgrade your plan to collaborate
              with teammates and more exciting features.
            </Text>
            <Button type="primary" style={{ marginTop: "10px" }}>
              Upgrade Now
            </Button>
          </Card>
        </TabPane>

        <TabPane tab="Manage" key="2">
          <Text>Manage settings content here...</Text>
        </TabPane>

        <TabPane tab="Analytics" key="3">
          <Text>Analytics settings content here...</Text>
        </TabPane>

        <TabPane tab="Billing" key="4">
          <Text>Billing settings content here...</Text>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
