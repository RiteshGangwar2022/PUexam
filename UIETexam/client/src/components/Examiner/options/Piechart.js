import React,{useState,useEffect} from "react";
import { PieChart, Pie, Cell, Label } from "recharts";
import { useAuth } from "../../../Context/AuthContext";
import axios from "axios";

const Piechart = (props) => {
  // Destructure the data prop from props
  const { data } = props;


  // const { globalResponseData, setGlobalResponseData } = useAuth();
  // const [loading, setLoading] = useState(true);
  // const [ass, setAss] = useState([]);

  // async function getAssignments() {
  //   const id = globalResponseData?._id;
  //   if (!globalResponseData) return;
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:5000/api/r2/assignments/${id}`
  //     );

  //     if (response.statusText === "OK") {
  //       console.log(response);
  //       //  console.log(response.data);
  //       const data = await response.data;
  //       setAss(data);
  //       setLoading(false);
  //     } else {
  //       alert("Not able to fetch");
  //     }
  //   } catch (error) {
  //     console.error("Error: ", error);
  //     alert("Some error is coming");
  //   }
  // }
  // useEffect(() => {
  //   const fetchData = async () => {
  //     // Retrieve data from local storage when the component mounts
  //     try {
  //       const data = JSON.parse(localStorage.getItem("globalData"));
  //       if (data) {
  //         setGlobalResponseData(data);
  //         // Load assignments asynchronously
  //       }
  //       // Further processing with parsedData
  //     } catch (error) {
  //       console.error("Error parsing JSON:", error);
  //     }
  //   };

  //   // Call the fetchData function
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   if (globalResponseData) getAssignments();
  // }, [globalResponseData]);






  return (
    <div>
      <PieChart width={145} height={145}>
        <Pie
          data={data}
          dataKey="students"
          outerRadius={73}
          innerRadius={34}
          fill="#8884d8"
          label={({
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            percent,
            index,
          }) => {
            const RADIAN = Math.PI / 180;
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <text
                x={x}
                y={y}
                fontSize="14px"
                fontWeight="bold"
                fill="#fff"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {`${(percent * 100).toFixed(2)}%`}
              </text>
            );
          }}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default Piechart;
