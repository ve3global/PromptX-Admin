import React, { useState, useEffect } from "react";
import { Table, Card } from "antd";

function AccountListing() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await fetch("http://localhost:8000/account/");
        const data = await response.json();
        console.log("API Response:", data);

        if (data.success && Array.isArray(data.data)) {
          setAccounts(data.data);
        } else {
          console.error("Invalid API response format:", data);
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  return (
    <div style={{ marginLeft: "250px", marginTop: "20px" }}>
      <Card title="Account List" bordered={false}>
        <Table
          columns={columns}
          dataSource={accounts}
          loading={loading}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      </Card>
    </div>
  );
}

export default AccountListing;
