import React, { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { api } from "../../API/api";
import { useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const SalesReportPage = () => {
  const userSelector = useSelector((state) => state.auth);
  const [dataset, setDataset] = useState([]);
  const [dateAxis, setDateAxis] = useState([]);

  const handleQueryDate = () => {
    const datefrom = document.getElementById("datefrom-report-graphic").value;
    const dateto = document.getElementById("dateto-report-graphic").value;
    fetchReport(datefrom, dateto);
  };

  const fetchReport = async (datefrom = "", dateto = "") => {
    try {
      const { data } = await api.get("/report/p1", {
        params: {
          datefrom,
          dateto,
        },
      });
      setDataset(Object.values(data));
      setDateAxis(Object.keys(data));
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const data = {
    labels: dateAxis,
    datasets: [
      {
        label: "Dine In",
        data: dataset.map((val) => val[1]),
        borderColor: `rgb(255, 243, 205)`,
        backgroundColor: `rgb(255, 243, 205)`,
      },
      {
        label: "Take Away",
        data: dataset.map((val) => val[2]),
        borderColor: `#F8D7DA`,
        backgroundColor: `#F8D7DA`,
      },
      {
        label: "Catering",
        data: dataset.map((val) => val[3]),
        borderColor: `#FFC107`,
        backgroundColor: `#FFC107`,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Revenue Dashboard",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return (
    <>
      <Header />
      <Row style={{ margin: "0", minHeight: "94vh", height: "100%" }}>
        <Col xl={2} lg={2} className="bg-[#D3A774] hidden-md">
          <Sidebar />
        </Col>
        <Col lg={10} className="mt-3">
          <div className="align-items-center justify-content-center d-flex flex-column gap-2">
            <h1 className="font-sans font-bold text-center text-2xl">
              Graph Sales Data
            </h1>
            <div className="flex-grow d-flex">
              <div>
                <label className="font-sans font-semibold px-3">
                  Date from:
                </label>
                <input
                  id="datefrom-report-graphic"
                  type="date"
                  onChange={handleQueryDate}
                  className="px-2 py-1 border rounded-md border-gray-300"
                />
              </div>
              <div>
                <label className="font-sans font-semibold px-3">Date to:</label>
                <span className="ml-5"></span>
                <input
                  id="dateto-report-graphic"
                  type="date"
                  onChange={handleQueryDate}
                  className="px-2 py-1 border rounded-md border-gray-300"
                />
              </div>
            </div>
            <Bar options={options} data={data} />
          </div>
        </Col>
      </Row>
    </>
  );
};
